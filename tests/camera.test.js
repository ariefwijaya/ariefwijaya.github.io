import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createCameraRig } from '../world/src/camera.js';

const state = { position: { x: 0, z: 0 }, heading: 0, colliders: [] };
const close = (actual, expected, tolerance = 1e-5) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} ≠ ${expected}`);
function settle(rig, options = {}) { for (let i = 0; i < 240; i++) rig.update(1 / 60, { ...state, ...options }); }
function finite(camera) {
  for (const matrix of [camera.matrixWorld, camera.matrixWorldInverse, camera.projectionMatrix, camera.projectionMatrixInverse]) assert.ok(matrix.elements.every(Number.isFinite));
}

test('diorama retains the original framing and screen-relative movement', () => {
  const rig = createCameraRig();
  rig.resize(1200, 800, 'paper');
  rig.update(0, { ...state, snap: true });
  const distance = rig.camera.position.length();
  close(2 * distance * Math.tan(THREE.MathUtils.degToRad(rig.camera.fov / 2)) * rig.camera.aspect, 23);
  assert.ok(distance > 75, 'long lens minimizes perspective distortion');
  const right = rig.movement(1, 0), forward = rig.movement(0, -1);
  close(right.x, .8858315, 1e-5); close(right.z, -.46400699, 1e-5);
  close(forward.x, -.46400699, 1e-5); close(forward.z, -.8858315, 1e-5);
  rig.resize(1200, 800, 'islands'); rig.update(0, { ...state, snap: true });
  close(2 * distance * Math.tan(THREE.MathUtils.degToRad(rig.camera.fov / 2)) * rig.camera.aspect, 28);
});

test('first person uses the player eye and shares third person look direction', () => {
  const rig = createCameraRig(), position = Object.freeze({ x: 3, y: .25, z: -2 });
  rig.setMode('third'); rig.update(0, { ...state, position, snap: true });
  const thirdDirection = rig.camera.getWorldDirection(new THREE.Vector3());
  assert.ok(thirdDirection.z < -.9);
  rig.setMode('first'); rig.update(0, { ...state, position, snap: true });
  close(rig.camera.position.x, 3); close(rig.camera.position.y, 1.7); close(rig.camera.position.z, -2);
  close(rig.camera.getWorldDirection(new THREE.Vector3()).dot(thirdDirection), 1);
  assert.equal(rig.isFirstPerson, true);
  rig.look(450, -100000); settle(rig, { position });
  const direction = rig.camera.getWorldDirection(new THREE.Vector3());
  assert.ok(direction.x > 0); assert.ok(Math.abs(direction.y) < .99, 'vertical look stays away from poles');
  finite(rig.camera);
});

test('movement tracks the displayed camera throughout interruptible transitions', () => {
  const rig = createCameraRig(), original = rig.camera;
  for (const mode of ['third', 'top', 'first', 'diorama', 'first']) {
    const before = rig.camera.position.clone();
    rig.setMode(mode);
    assert.ok(before.equals(rig.camera.position), 'requesting a view does not jump the camera');
    for (let i = 0; i < 8; i++) {
      rig.update(1 / 60, state);
      const movement = rig.movement(1, 0);
      const screenRight = new THREE.Vector3(1, 0, 0).applyQuaternion(rig.camera.quaternion); screenRight.y = 0; screenRight.normalize();
      close(movement.x, screenRight.x); close(movement.z, screenRight.z);
      finite(rig.camera);
      assert.equal(rig.camera, original);
    }
  }
  settle(rig); assert.equal(rig.transitioning, false);
});

test('rapid look and view changes keep the horizon level and refresh projection inverses', () => {
  const rig = createCameraRig();
  for (const mode of ['first', 'top', 'third', 'diorama']) {
    rig.setMode(mode); rig.look(200, -120);
    for (let i = 0; i < 20; i++) {
      rig.update(1 / 60, state);
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(rig.camera.quaternion);
      close(right.y, 0);
      const identity = rig.camera.projectionMatrix.clone().multiply(rig.camera.projectionMatrixInverse);
      identity.elements.forEach((value, index) => close(value, index % 5 === 0 ? 1 : 0));
    }
  }
});

test('top view is north-up and portrait resize follows the player without singular matrices', () => {
  const rig = createCameraRig();
  rig.setMode('top'); rig.resize(390, 844, 'islands');
  rig.update(0, { ...state, position: { x: 4, z: 2 }, snap: true });
  const origin = new THREE.Vector3(4, 0, 2).project(rig.camera);
  const north = new THREE.Vector3(4, 0, 1).project(rig.camera);
  close(origin.x, 0); close(origin.y, 0);
  assert.ok(north.y > origin.y); close(north.x, origin.x);
  close(rig.movement(0, -1).z, -1);
  for (const size of [[0, 0], [390, 844], [1600, 700]]) { rig.resize(...size, 'paper'); rig.update(1 / 60, state); finite(rig.camera); }
  rig.setMode('diorama'); rig.resize(390, 844, 'paper');
  rig.update(0, { ...state, position: { x: 4, z: 2 }, snap: true });
  const focus = new THREE.Vector3(4, 0, 2).project(rig.camera);
  close(focus.x, 0); close(focus.y, 0);
});

test('portrait third-person framing keeps the avatar feet above the bottom toolbar', () => {
  const rig = createCameraRig(), position = { x: -3, z: 2.7 };
  rig.resize(390, 844, 'paper'); rig.setMode('third'); settle(rig, { position });
  const feet = new THREE.Vector3(position.x, 0, position.z).project(rig.camera);
  const head = new THREE.Vector3(position.x, 1.7, position.z).project(rig.camera);
  assert.ok(feet.y > -.6, `feet project into bottom toolbar at ${feet.y}`);
  assert.ok(head.y < .7, 'head remains inside the visible portrait frame');
  assert.ok(head.y - feet.y > .65, 'avatar remains legible rather than excessively zoomed out');
});

test('third person pulls in before a wall and recovers smoothly after clearance', () => {
  const rig = createCameraRig(); rig.setMode('third'); rig.update(0, { ...state, snap: true });
  const followTarget = new THREE.Vector3(0, 1.05, 0);
  const openDistance = rig.camera.position.distanceTo(followTarget);
  const wall = new THREE.Mesh(new THREE.BoxGeometry(10, 10, .2), new THREE.MeshBasicMaterial());
  wall.position.set(0, 2, 1.5); wall.updateMatrixWorld(true);
  rig.update(1 / 60, { ...state, colliders: [wall] });
  assert.ok(rig.camera.position.z < 1.35, 'camera stays on the player side of the wall');
  const blocked = rig.camera.position.distanceTo(followTarget);
  rig.update(1 / 60, state);
  const recovering = rig.camera.position.distanceTo(followTarget);
  assert.ok(recovering > blocked); assert.ok(recovering < openDistance - .1);
  settle(rig); close(rig.camera.position.distanceTo(followTarget), openDistance);
  wall.geometry.dispose(); wall.material.dispose();
});

test('third person stays above every world floor after maximum upward look and rapid view changes', () => {
  for (const [kind, x] of [['paper', -3], ['islands', -7], ['night', -3]]) {
    for (const calm of [false, true]) {
      const rig = createCameraRig(), options = { ...state, position: { x, z: 2.7 }, calm };
      rig.resize(1200, 800, kind);
      rig.setMode('first'); rig.look(0, -1000); rig.update(0, { ...options, snap: true });
      assert.ok(rig.camera.getWorldDirection(new THREE.Vector3()).y > .9, 'first person retains full upward look');
      for (const mode of ['third', 'first', 'third']) {
        rig.setMode(mode, { calm });
        for (let i = 0; i < 8; i++) {
          rig.update(1 / 60, options);
          assert.ok(rig.camera.position.y >= .25, `${kind} ${mode} calm=${calm}: camera below floor clearance`);
          finite(rig.camera);
        }
      }
      settle(rig, options);
      assert.ok(rig.camera.position.y >= .25, `${kind}: settled third-person camera above floor`);
      rig.setMode('first'); settle(rig, options);
      rig.look(0, -1000); rig.update(0, { ...options, snap: true });
      assert.ok(rig.camera.getWorldDirection(new THREE.Vector3()).y > .9, 'first person still supports full upward look');
    }
  }
});

test('third-person maximum upward look responds immediately to a small downward reversal', () => {
  for (const previousMode of ['third', 'first']) {
    const rig = createCameraRig();
    rig.setMode(previousMode); rig.look(0, -1000); rig.update(0, { ...state, snap: true });
    rig.setMode('third'); rig.update(0, { ...state, snap: true });
    const upBefore = rig.camera.getWorldDirection(new THREE.Vector3()).y;
    rig.look(0, 2); rig.update(0, { ...state, snap: true });
    const upAfter = rig.camera.getWorldDirection(new THREE.Vector3()).y;
    assert.ok(upAfter < upBefore - .005, `${previousMode}: reversing drag must change view immediately`);
  }
});

test('calm switching settles immediately and subsequent user motion remains responsive', () => {
  const rig = createCameraRig(); rig.setMode('first', { calm: true }); rig.update(1 / 60, state);
  assert.equal(rig.transitioning, false);
  rig.update(1 / 60, { ...state, position: { x: 2, z: 3 }, calm: true });
  close(rig.camera.position.x, 2); close(rig.camera.position.z, 3);
  const before = rig.camera.quaternion.clone(); rig.look(100, 0); rig.update(1 / 60, { ...state, calm: true });
  assert.ok(before.angleTo(rig.camera.quaternion) > .1);
});

test('camera easing is independent of frame rate and invalid modes do not change view', () => {
  function run(fps) { const rig = createCameraRig(); rig.setMode('third'); for (let i = 0; i < fps / 2; i++) rig.update(1 / fps, state); return rig; }
  const slow = run(30), fast = run(120);
  close(slow.camera.position.distanceTo(fast.camera.position), 0);
  close(slow.camera.quaternion.angleTo(fast.camera.quaternion), 0);
  close(slow.camera.fov, fast.camera.fov);
  slow.setMode('invalid'); assert.equal(slow.mode, 'third');
});

test('workstation focus arrives exactly, frames portrait screens, and resumes the previous view',()=>{
 const rig=createCameraRig();rig.resize(390,844,'paper');rig.update(0,{snap:true});
 const destination=new THREE.Vector3(-4.78,2.08,1),target=new THREE.Vector3(-4.78,1.75,-1.98);
 rig.focusOn({position:destination,target,span:1.6});
 for(let i=0;i<100;i++)rig.update(1/60);
 assert.ok(rig.camera.position.distanceTo(destination)<.00001);assert.equal(rig.transitioning,false);assert.equal(rig.mode,'diorama');
 const visibleWidth=2*destination.distanceTo(target)*Math.tan(THREE.MathUtils.degToRad(rig.camera.fov/2))*rig.camera.aspect;assert.ok(visibleWidth>=1.599);
 rig.releaseFocus();for(let i=0;i<180;i++)rig.update(1/60);assert.equal(rig.focused,false);assert.ok(rig.camera.position.y>50);
});
test('calm focus snaps and interrupted focus can return without invalid camera coordinates',()=>{
 const rig=createCameraRig();rig.focusOn({position:new THREE.Vector3(0,2,1),target:new THREE.Vector3(0,1,-2),span:1.6});rig.update(.016,{calm:true});assert.equal(rig.transitioning,false);
 rig.releaseFocus();rig.update(.016);for(const value of [...rig.camera.position.toArray(),...rig.camera.quaternion.toArray(),rig.camera.fov])assert.ok(Number.isFinite(value));
});

test('distant diorama keeps enough 24-bit depth precision to separate a 2mm display bezel',()=>{
 const rig=createCameraRig();rig.update(0,{snap:true});
 const d=rig.camera.position.length(),{near,far}=rig.camera;
 const quantization=d*d*(far-near)/(far*near*(2**24-1));
 assert.ok(quantization<.00025,`depth step ${quantization} exceeds the thin surface safety margin`);
 rig.setMode('first');rig.update(0,{snap:true});assert.ok(rig.camera.near<=.06,'nearby objects remain visible');
 rig.focusOn({position:new THREE.Vector3(0,2,1),target:new THREE.Vector3(0,1,-2),span:1.35});
 for(let i=0;i<100;i++)rig.update(1/60);assert.ok(rig.camera.near<=.06,'focused display keeps its close range');
});

test('the laptop stays inside the frame throughout its cinematic approach',()=>{
 const rig=createCameraRig();rig.resize(884,758);rig.update(0,{snap:true});
 const target=new THREE.Vector3(-4.78,1.75,-1.98);rig.focusOn({position:new THREE.Vector3(-4.78,2.08,1),target,span:1.35});
 for(let i=0;i<100;i++){
  rig.update(1/60);const projected=target.clone().project(rig.camera);
  assert.ok(Math.abs(projected.x)<.98&&Math.abs(projected.y)<.98,`target left the frame at ${i}: ${projected.x}, ${projected.y}`);
 }
});

test('wide spatial boards fit vertically on ultrawide displays',()=>{
 const rig=createCameraRig();rig.resize(2560,1080);rig.update(0,{snap:true});
 const target=new THREE.Vector3(5.2,1.6,-3.1),height=3.25*.625;
 rig.focusOn({position:target.clone().add(new THREE.Vector3(0,.1,3.6)),target,span:3.55,height:height+.6});
 for(let i=0;i<100;i++)rig.update(1/60);
 for(const y of [-height/2,height/2]){const p=target.clone().add(new THREE.Vector3(0,y,.04)).project(rig.camera);assert.ok(Math.abs(p.y)<.85,'board has vertical margin');}
});
