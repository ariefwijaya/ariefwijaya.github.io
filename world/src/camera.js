import * as THREE from 'three';

const MODES = new Set(['diorama', 'third', 'first', 'top']);
const UP = new THREE.Vector3(0, 1, 0);
const DIORAMA_OFFSET = new THREE.Vector3(44, 60, 84);
const EYE_HEIGHT = 1.45;
const THIRD_TARGET_HEIGHT = 1.05;
const THIRD_MAX_PITCH = .22;
const FOLLOW_DISTANCE = 3.5;
const finite = (value, fallback = 0) => Number.isFinite(value) ? value : fallback;

/** One camera keeps renderer passes and projection consumers valid across views.
 * `vertical` is screen-down positive; look arguments are pointer pixel deltas.
 * The look yaw is shared by first/third person and independent of avatar heading,
 * so turning toward camera-relative movement cannot create a feedback loop.
 */
export function createCameraRig() {
  const camera = new THREE.PerspectiveCamera(8, 1.5, .06, 350);
  const targetPosition = new THREE.Vector3(), anchor = new THREE.Vector3(), viewFrom = new THREE.Vector3();
  const direction = new THREE.Vector3(), right = new THREE.Vector3(), aim = new THREE.Vector3();
  const rotation = new THREE.Matrix4(), targetEuler = new THREE.Euler(0, 0, 0, 'YXZ');
  const targetQuaternion = new THREE.Quaternion();
  const ray = new THREE.Raycaster(), rayOrigin = new THREE.Vector3();
  const obstructionDirection = new THREE.Vector3(), probeRight = new THREE.Vector3(), probeUp = new THREE.Vector3();
  const hits = [], probes = [[0, 0], [.16, 0], [-.16, 0], [0, .16], [0, -.16]];
  let mode = 'diorama', width = 1200, height = 800, kind = 'paper';
  let lookYaw = 0, lookPitch = -.2, pitch = 0, yaw = 0;
  let transitioning = false, changingView = false, lookActiveFor = 0, snapRequested = true, initialized = false;
  let targetFov = 8, viewElapsed = 0, focus = null;

  function overviewFov(distance) {
    const viewWidth = width < 800 ? 12.5 : kind === 'islands' ? 28 : 23;
    const viewHeight = width < 800 ? Math.min(viewWidth / camera.aspect, 20) : viewWidth / camera.aspect;
    return THREE.MathUtils.radToDeg(2 * Math.atan(viewHeight / (2 * distance)));
  }

  function fovForMode() {
    return mode === 'diorama' ? overviewFov(DIORAMA_OFFSET.length()) : mode === 'top' ? overviewFov(90) : mode === 'first' ? 68 : width < 800 ? 62 : 55;
  }

  // Five parallel probes protect the near-plane corners as well as its center.
  // Colliders are the world's static mesh list, already updated by its builder.
  function clearDistance(from, to, colliders) {
    obstructionDirection.subVectors(to, from);
    const distance = obstructionDirection.length();
    if (distance < .001 || !colliders.length) return distance;
    obstructionDirection.divideScalar(distance);
    probeRight.crossVectors(obstructionDirection, UP);
    if (probeRight.lengthSq() < .00001) probeRight.set(1, 0, 0); else probeRight.normalize();
    probeUp.crossVectors(probeRight, obstructionDirection).normalize();
    let clearance = distance;
    ray.near = 0; ray.far = distance + .16;
    for (const [x, y] of probes) {
      rayOrigin.copy(from).addScaledVector(probeRight, x).addScaledVector(probeUp, y);
      ray.set(rayOrigin, obstructionDirection); hits.length = 0;
      ray.intersectObjects(colliders, false, hits);
      if (hits.length) clearance = Math.min(clearance, Math.max(.04, hits[0].distance - .2));
    }
    return clearance;
  }

  function update(dt, { position = { x: 0, z: 0 }, calm = false, colliders = [], snap = false } = {}) {
    const seconds = Math.max(0, finite(dt));
    if(focus){
      focus.time=Math.min(1,focus.time+(calm?1:seconds/1.35));
      const t=focus.time,e=t*t*t*(t*(t*6-15)+10);
      const offset=focus.from.clone().sub(focus.target),end=focus.position.clone().sub(focus.target);
      const distance=Math.exp(THREE.MathUtils.lerp(Math.log(offset.length()),Math.log(end.length()),e));
      offset.normalize().lerp(end.normalize(),e).normalize().multiplyScalar(distance);
      camera.position.copy(focus.target).add(offset);
      rotation.lookAt(focus.position,focus.target,UP);targetQuaternion.setFromRotationMatrix(rotation);
      camera.quaternion.copy(focus.rotation).slerp(targetQuaternion,e);
      const framing=Math.max(focus.span/camera.aspect,focus.height||1.65);
      const fov=THREE.MathUtils.radToDeg(2*Math.atan(framing/(2*focus.position.distanceTo(focus.target))));
      camera.fov=THREE.MathUtils.lerp(focus.fov,fov,e);
      camera.near=Math.max(.06,(distance-8)*.1);camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
      transitioning=t<1;return;
    }
    const immediate = snap || snapRequested || calm || !initialized;
    const alpha = immediate ? 1 : -Math.expm1(-8 * seconds);
    const x = finite(position.x), y = finite(position.y), z = finite(position.z);
    if (mode === 'diorama' || mode === 'top') {
      const follow = width < 800 ? 1 : calm ? 0 : .13;
      anchor.set(x * follow, 0, z * follow);
      targetPosition.copy(anchor);
      if (mode === 'diorama') targetPosition.add(DIORAMA_OFFSET);
      else { targetPosition.y += 90; targetPosition.z += .001; }
      aim.copy(anchor);
    } else {
      anchor.set(x, y + (mode === 'third' ? THIRD_TARGET_HEIGHT : EYE_HEIGHT), z);
      direction.set(Math.sin(lookYaw) * Math.cos(lookPitch), Math.sin(lookPitch), -Math.cos(lookYaw) * Math.cos(lookPitch));
      targetPosition.copy(anchor);
      if (mode === 'third') {
        targetPosition.addScaledVector(direction, -FOLLOW_DISTANCE);
        const clearance = clearDistance(anchor, targetPosition, colliders);
        targetPosition.copy(anchor).addScaledVector(direction, -clearance);
      }
      aim.copy(targetPosition).add(direction);
    }
    rotation.lookAt(targetPosition, aim, UP);
    targetQuaternion.setFromRotationMatrix(rotation);
    targetEuler.setFromRotationMatrix(rotation, 'YXZ');
    // YXZ yaw/pitch interpolation keeps roll at zero, including interrupted
    // transitions to top view. Unconstrained quaternion slerp tilts the horizon.
    const lookAlpha = immediate ? 1 : -Math.expm1(-(lookActiveFor > 0 ? 18 : 8) * seconds);
    pitch += (targetEuler.x - pitch) * lookAlpha;
    yaw += Math.atan2(Math.sin(targetEuler.y - yaw), Math.cos(targetEuler.y - yaw)) * lookAlpha;
    camera.quaternion.setFromEuler(targetEuler.set(pitch, yaw, 0, 'YXZ'));
    if (immediate) {
      camera.position.copy(targetPosition); changingView = false;
    } else if (changingView) {
      // Finish against elapsed time, not distance to a walking target. A fixed
      // origin also lets an interrupted transition restart without a jump.
      viewElapsed += seconds;
      const progress = Math.min(1, viewElapsed / .9);
      const eased = progress * progress * (3 - 2 * progress);
      camera.position.lerpVectors(viewFrom, targetPosition, eased);
      changingView = progress < 1;
    } else if (mode === 'first') camera.position.copy(targetPosition);
    else camera.position.lerp(targetPosition, alpha);
    if (mode === 'third') {
      const clearance = clearDistance(anchor, camera.position, colliders);
      const actualDistance = camera.position.distanceTo(anchor);
      // Pull in immediately on obstruction; normal damping eases recovery.
      if (clearance < actualDistance) camera.position.sub(anchor).setLength(clearance).add(anchor);
      camera.position.y = Math.max(.25, camera.position.y);
    }
    targetFov = fovForMode();
    camera.fov += (targetFov - camera.fov) * alpha;
    // The long-lens overview is ~112 units from millimetre-scale details.
    // Keeping the first-person near plane here wastes almost all depth precision.
    camera.near=mode==='diorama'||mode==='top'?Math.max(.06,(camera.position.distanceTo(aim)-8)*.1):.06;
    camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
    transitioning = !immediate && (camera.position.distanceToSquared(targetPosition) > .0001 || Math.abs(camera.fov - targetFov) > .01 || camera.quaternion.angleTo(targetQuaternion) > .001);
    lookActiveFor = Math.max(0, lookActiveFor - seconds);
    snapRequested = false; initialized = true;
  }

  const rig = {
    camera,
    get focused(){return !!focus;},
    focusOn(view){focus={...view,from:camera.position.clone(),rotation:camera.quaternion.clone(),fov:camera.fov,time:0};transitioning=true;},
    releaseFocus(){
      if(!focus)return;focus=null;viewFrom.copy(camera.position);viewElapsed=0;changingView=true;transitioning=true;
      targetEuler.setFromQuaternion(camera.quaternion,'YXZ');pitch=targetEuler.x;yaw=targetEuler.y;
    },
    get mode() { return mode; },
    get isFirstPerson() { return mode === 'first'; },
    get transitioning() { return transitioning; },
    resize(w, h, worldKind = kind) {
      width = Math.max(1, finite(w, 1)); height = Math.max(1, finite(h, 1)); kind = worldKind;
      camera.aspect = width / height;
      if (!transitioning && !focus) camera.fov = fovForMode();
      camera.updateProjectionMatrix();
    },
    setMode(next, { calm = false } = {}) {
      if (!MODES.has(next)) return false;
      if (next === mode) return true;
      mode = next; transitioning = true; changingView = true; snapRequested = calm;
      viewFrom.copy(camera.position); viewElapsed = 0;
      // Clamp the accumulator as well as the view, so reversing a drag responds
      // immediately after either a large input or leaving first-person view.
      if (mode === 'third') lookPitch = Math.min(lookPitch, THIRD_MAX_PITCH);
      return true;
    },
    look(dx, dy) {
      if (mode !== 'first' && mode !== 'third') return;
      if(finite(dx)||finite(dy))lookActiveFor=.18;
      lookYaw = (lookYaw + finite(dx) * .0035) % (Math.PI * 2);
      // A third-person upward look lowers its orbit camera toward the floor.
      lookPitch = THREE.MathUtils.clamp(lookPitch - finite(dy) * .0035, -1.35, mode === 'third' ? THIRD_MAX_PITCH : 1.35);
    },
    movement(horizontal, vertical) {
      right.set(1, 0, 0).applyQuaternion(camera.quaternion); right.y = 0; right.normalize();
      return { x: right.x * finite(horizontal) - right.z * finite(vertical), z: right.z * finite(horizontal) + right.x * finite(vertical) };
    },
    update,
  };
  update(0, { snap: true });
  return rig;
}
