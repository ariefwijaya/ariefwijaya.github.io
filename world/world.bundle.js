function sg(s,e){let t=Math.min(Math.floor(e.sampleRate*.45),Math.floor(e.length/4)),n=e.length-t,i=s.createBuffer(e.numberOfChannels,n,e.sampleRate);for(let r=0;r<e.numberOfChannels;r++){let o=e.getChannelData(r),a=i.getChannelData(r),l=e.length-2*t;a.set(o.subarray(t,e.length-t));for(let c=0;c<t;c++){let h=c/(t-1);a[l+c]=o[e.length-t+c]*(1-h)+o[c]*h}}return i}var ru={door:["door.mp3"],book:["book.mp3"],paper:["page-1.mp3","page-2.mp3"],lamp:["switch.mp3"],note:["switch.mp3"],chair:["chair.mp3"],machine:["machine.mp3"],bird:["bird.mp3"],wave:["wave.mp3"],city:["night-city.mp3"]};for(let s of["wood","carpet","concrete"])ru[s]=[0,1,2].map(e=>`step-${s}-${e}.mp3`);function Nd(){let s,e,t=!1,n="paper",i=null,r=null,o=new Map,a=new Set,l=new Map,c=new Map;async function h(){await Promise.all(Object.values(ru).flat().map(async d=>{let m=await fetch(`/world/audio/${d}`);if(!m.ok)throw new Error(`Audio ${m.status}: ${d}`);let x=await s.decodeAudioData(await m.arrayBuffer());(d==="wave.mp3"||d==="night-city.mp3")&&(x=sg(s,x)),o.set(d,x)}))}function u(d,{volume:m=1,loop:x=!1}={}){if(!t||s?.state!=="running")return;let g=ru[d];if(!g)return;let p=s.currentTime;if(!x&&p-(l.get(d)??-100)<.075)return;l.set(d,p);let v=c.get(d)||0;c.set(d,v+1);let y=o.get(g[v%g.length]);if(!y)return;if(a.size>=8){let A=[...a].find(C=>C!==i);A&&(A.source.stop(),a.delete(A))}let _=s.createBufferSource(),b=s.createGain();_.buffer=y,_.loop=x,b.gain.value=m,_.connect(b),b.connect(e);let w={source:_,gain:b};return a.add(w),_.onended=()=>{a.delete(w),_.disconnect(),b.disconnect()},_.start(),w}function f(){if(i){let d=i;d.gain.gain.setTargetAtTime(0,s.currentTime,.25),d.source.stop(s.currentTime+1),i=null}t&&n==="islands"&&(i=u("wave",{volume:.12,loop:!0})),t&&n==="night"&&(i=u("city",{volume:.17,loop:!0}))}return{get context(){return s},async enable(d){if(d)s||(s=new(window.AudioContext||window.webkitAudioContext),e=s.createGain(),e.gain.value=.55,e.connect(s.destination)),await s.resume(),r||(r=h().catch(m=>{throw r=null,m})),await r,t=!0,e.gain.setTargetAtTime(.55,s.currentTime,.12),f();else if(t=!1,s){e.gain.setTargetAtTime(0,s.currentTime,.08);for(let m of a)m.source.stop(s.currentTime+.3);i=null}},setWorld(d){if(n=d,s){for(let m of a)m!==i&&m.source.stop();f()}},cue(d="note",m){if(d==="step"){let x=n==="islands"&&Math.abs(m?.x??0)>2.7&&Math.abs(m?.x??0)<5,p=n!=="islands"&&(m?.z??10)>-2&&(m?.z??10)<.7?"carpet":x||n==="night"?"wood":"concrete";u(p,{volume:.2})}else u(d,{volume:d==="bird"?.18:d==="machine"?.2:d==="lamp"||d==="note"?.22:.36})}}}var wf=0,$u=1,Af=2;var Ju=1,Al=2,yi=3,Qn=0,Xt=1,St=2,$t=0,ws=1,ju=2,Qu=3,eh=4,Rl=5,ei=100,Rf=101,Cf=102,If=103,Pf=104,jo=200,Lf=201,Df=202,Nf=203,tl=204,nl=205,Cl=206,Uf=207,Il=208,Ff=209,Of=210,Bf=211,zf=212,kf=213,Hf=214,Pl=0,Ll=1,Dl=2,As=3,Nl=4,Ul=5,Fl=6,Ol=7,th=0,Vf=1,Gf=2,Gi=0,Bl=1,zl=2,kl=3,Ur=4,Hl=5,Vl=6,Gl=7,Ou="attached",Wf="detached",nh=300,Vs=301,Gs=302,Wl=303,Xl=304,Qo=306,un=1e3,zn=1001,Hn=1002,Vt=1003,ql=1004;var Ws=1005;var It=1006,Fr=1007;var Pn=1008;var ni=1009,ih=1010,sh=1011,Or=1012,Yl=1013,ls=1014,yn=1015,ii=1016,Zl=1017,Kl=1018,cs=1020,rh=35902,oh=35899,ah=1021,lh=1022,fn=1023,br=1026,us=1027,Br=1028,$l=1029,ea=1030,Jl=1031;var jl=1033,ta=33776,na=33777,ia=33778,sa=33779,Ql=35840,ec=35841,tc=35842,nc=35843,ic=36196,sc=37492,rc=37496,oc=37808,ac=37809,lc=37810,cc=37811,uc=37812,hc=37813,dc=37814,fc=37815,pc=37816,mc=37817,gc=37818,xc=37819,_c=37820,vc=37821,yc=36492,Mc=36494,Sc=36495,bc=36283,Ec=36284,Tc=36285,wc=36286,Ac=2200,Rc=2201,Xf=2202,Rs=2300,Cs=2301,el=2302,Es=2400,Ts=2401,yo=2402,Cc=2500,qf=2501,ch=0,ra=1,zr=2,Yf=3200,Zf=3201;var Ic=0,Kf=1,si="",Qe="srgb",Qt="srgb-linear",Mo="linear",ut="srgb";var bs=7680;var Bu=519,$f=512,Jf=513,jf=514,uh=515,Qf=516,ep=517,tp=518,np=519,il=35044;var hh="300 es",jn=2e3,So=2001;var fi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ud=1234567,go=Math.PI/180,Is=180/Math.PI;function kn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[s&255]+tn[s>>8&255]+tn[s>>16&255]+tn[s>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function tt(s,e,t){return Math.max(e,Math.min(t,s))}function dh(s,e){return(s%e+e)%e}function rg(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function og(s,e,t){return s!==e?(t-s)/(e-s):0}function xo(s,e,t){return(1-t)*s+t*e}function ag(s,e,t,n){return xo(s,e,1-Math.exp(-t*n))}function lg(s,e=1){return e-Math.abs(dh(s,e*2)-e)}function cg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function ug(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function hg(s,e){return s+Math.floor(Math.random()*(e-s+1))}function dg(s,e){return s+Math.random()*(e-s)}function fg(s){return s*(.5-Math.random())}function pg(s){s!==void 0&&(Ud=s);let e=Ud+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function mg(s){return s*go}function gg(s){return s*Is}function xg(s){return(s&s-1)===0&&s!==0}function _g(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function vg(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function yg(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),m=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*f,a*c);break;case"YZY":s.set(l*f,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*f,a*h,a*c);break;case"XZX":s.set(a*h,l*m,l*d,a*c);break;case"YXY":s.set(l*d,a*h,l*m,a*c);break;case"ZYZ":s.set(l*m,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Jn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function dt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Pt={DEG2RAD:go,RAD2DEG:Is,generateUUID:kn,clamp:tt,euclideanModulo:dh,mapLinear:rg,inverseLerp:og,lerp:xo,damp:ag,pingpong:lg,smoothstep:cg,smootherstep:ug,randInt:hg,randFloat:dg,randFloatSpread:fg,seededRandom:pg,degToRad:mg,radToDeg:gg,isPowerOfTwo:xg,ceilPowerOfTwo:_g,floorPowerOfTwo:vg,setQuaternionFromProperEuler:yg,normalize:dt,denormalize:Jn},ge=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ct=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],f=r[o+0],d=r[o+1],m=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=m,e[t+3]=x;return}if(u!==x||l!==f||c!==d||h!==m){let g=1-a,p=l*f+c*d+h*m+u*x,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let b=Math.sqrt(y),w=Math.atan2(b,p*v);g=Math.sin(g*w)/b,a=Math.sin(a*w)/b}let _=a*v;if(l=l*g+f*_,c=c*g+d*_,h=h*g+m*_,u=u*g+x*_,g===1-a){let b=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=b,c*=b,h*=b,u*=b}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return e[t]=a*m+h*u+l*d-c*f,e[t+1]=l*m+h*f+c*u-a*d,e[t+2]=c*m+h*d+a*f-l*u,e[t+3]=h*m-a*u-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),f=l(n/2),d=l(i/2),m=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"YZX":this._x=f*h*u+c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u-f*d*m;break;case"XZY":this._x=f*h*u-c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-i)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+c)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ou.copy(this).projectOnVector(e),this.sub(ou)}reflect(e){return this.sub(ou.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ou=new L,Fd=new Ct,je=class s{constructor(e,t,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],x=i[0],g=i[3],p=i[6],v=i[1],y=i[4],_=i[7],b=i[2],w=i[5],A=i[8];return r[0]=o*x+a*v+l*b,r[3]=o*g+a*y+l*w,r[6]=o*p+a*_+l*A,r[1]=c*x+h*v+u*b,r[4]=c*g+h*y+u*w,r[7]=c*p+h*_+u*A,r[2]=f*x+d*v+m*b,r[5]=f*g+d*y+m*w,r[8]=f*p+d*_+m*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,m=t*u+n*f+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(a*n-i*o)*x,e[3]=f*x,e[4]=(h*t-i*l)*x,e[5]=(i*r-a*t)*x,e[6]=d*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(au.makeScale(e,t)),this}rotate(e){return this.premultiply(au.makeRotation(-e)),this}translate(e,t){return this.premultiply(au.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},au=new je;function fh(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Er(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function ip(){let s=Er("canvas");return s.style.display="block",s}var Od={};function Tr(s){s in Od||(Od[s]=!0,console.warn(s))}function sp(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Bd=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zd=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mg(){let s={enabled:!0,workingColorSpace:Qt,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ut&&(i.r=Di(i.r),i.g=Di(i.g),i.b=Di(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ut&&(i.r=Sr(i.r),i.g=Sr(i.g),i.b=Sr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===si?Mo:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Tr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Tr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Qt]:{primaries:e,whitePoint:n,transfer:Mo,toXYZ:Bd,fromXYZ:zd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:e,whitePoint:n,transfer:ut,toXYZ:Bd,fromXYZ:zd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}}),s}var nt=Mg();function Di(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Sr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var sr,sl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{sr===void 0&&(sr=Er("canvas")),sr.width=e.width,sr.height=e.height;let i=sr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=sr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Er("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Di(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Di(t[n]/255)*255):t[n]=Di(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Sg=0,wr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sg++}),this.uuid=kn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(lu(i[o].image)):r.push(lu(i[o]))}else r=lu(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function lu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?sl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var bg=0,cu=new L,Tt=class s extends fi{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=zn,i=zn,r=It,o=Pn,a=fn,l=ni,c=s.DEFAULT_ANISOTROPY,h=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bg++}),this.uuid=kn(),this.name="",this.source=new wr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(cu).x}get height(){return this.source.getSize(cu).y}get depth(){return this.source.getSize(cu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case un:e.x=e.x-Math.floor(e.x);break;case zn:e.x=e.x<0?0:1;break;case Hn:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case un:e.y=e.y-Math.floor(e.y);break;case zn:e.y=e.y<0?0:1;break;case Hn:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=nh;Tt.DEFAULT_ANISOTROPY=1;var ct=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(c+1)/2,_=(d+1)/2,b=(p+1)/2,w=(h+f)/4,A=(u+x)/4,C=(m+g)/4;return y>_&&y>b?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=w/n,r=A/n):_>b?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=w/i,r=C/i):b<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(b),n=A/r,i=C/r),this.set(n,i,r,t),this}let v=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(u-x)/v,this.z=(f-h)/v,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this.w=tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this.w=tt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},rl=class extends fi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);let i={width:e,height:t,depth:n.depth},r=new Tt(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:It,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new wr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},hn=class extends rl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},bo=class extends Tt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ol=class extends Tt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var en=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Zn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Zn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Zn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Zn):Zn.fromBufferAttribute(r,o),Zn.applyMatrix4(e.matrixWorld),this.expandByPoint(Zn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ea.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ea.copy(n.boundingBox)),Ea.applyMatrix4(e.matrixWorld),this.union(Ea)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zn),Zn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(io),Ta.subVectors(this.max,io),rr.subVectors(e.a,io),or.subVectors(e.b,io),ar.subVectors(e.c,io),$i.subVectors(or,rr),Ji.subVectors(ar,or),vs.subVectors(rr,ar);let t=[0,-$i.z,$i.y,0,-Ji.z,Ji.y,0,-vs.z,vs.y,$i.z,0,-$i.x,Ji.z,0,-Ji.x,vs.z,0,-vs.x,-$i.y,$i.x,0,-Ji.y,Ji.x,0,-vs.y,vs.x,0];return!uu(t,rr,or,ar,Ta)||(t=[1,0,0,0,1,0,0,0,1],!uu(t,rr,or,ar,Ta))?!1:(wa.crossVectors($i,Ji),t=[wa.x,wa.y,wa.z],uu(t,rr,or,ar,Ta))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(wi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},wi=[new L,new L,new L,new L,new L,new L,new L,new L],Zn=new L,Ea=new en,rr=new L,or=new L,ar=new L,$i=new L,Ji=new L,vs=new L,io=new L,Ta=new L,wa=new L,ys=new L;function uu(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ys.fromArray(s,r);let a=i.x*Math.abs(ys.x)+i.y*Math.abs(ys.y)+i.z*Math.abs(ys.z),l=e.dot(ys),c=t.dot(ys),h=n.dot(ys);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Eg=new en,so=new L,hu=new L,mn=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Eg.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;so.subVectors(e,this.center);let t=so.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(so,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(so.copy(e.center).add(hu)),this.expandByPoint(so.copy(e.center).sub(hu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ai=new L,du=new L,Aa=new L,ji=new L,fu=new L,Ra=new L,pu=new L,ns=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,t),Ai.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){du.copy(e).add(t).multiplyScalar(.5),Aa.copy(t).sub(e).normalize(),ji.copy(this.origin).sub(du);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Aa),a=ji.dot(this.direction),l=-ji.dot(Aa),c=ji.lengthSq(),h=Math.abs(1-o*o),u,f,d,m;if(h>0)if(u=o*l-a,f=o*a-l,m=r*h,u>=0)if(f>=-m)if(f<=m){let x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=m?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(du).addScaledVector(Aa,f),d}intersectSphere(e,t){Ai.subVectors(e.center,this.origin);let n=Ai.dot(this.direction),i=Ai.dot(Ai)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,t,n,i,r){fu.subVectors(t,e),Ra.subVectors(n,e),pu.crossVectors(fu,Ra);let o=this.direction.dot(pu),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ji.subVectors(this.origin,e);let l=a*this.direction.dot(Ra.crossVectors(ji,Ra));if(l<0)return null;let c=a*this.direction.dot(fu.cross(ji));if(c<0||l+c>o)return null;let h=-a*ji.dot(pu);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ye=class s{constructor(e,t,n,i,r,o,a,l,c,h,u,f,d,m,x,g){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,f,d,m,x,g)}set(e,t,n,i,r,o,a,l,c,h,u,f,d,m,x,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/lr.setFromMatrixColumn(e,0).length(),r=1/lr.setFromMatrixColumn(e,1).length(),o=1/lr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,d=o*u,m=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=d+m*c,t[5]=f-x*c,t[9]=-a*l,t[2]=x-f*c,t[6]=m+d*c,t[10]=o*l}else if(e.order==="YXZ"){let f=l*h,d=l*u,m=c*h,x=c*u;t[0]=f+x*a,t[4]=m*a-d,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-m,t[6]=x+f*a,t[10]=o*l}else if(e.order==="ZXY"){let f=l*h,d=l*u,m=c*h,x=c*u;t[0]=f-x*a,t[4]=-o*u,t[8]=m+d*a,t[1]=d+m*a,t[5]=o*h,t[9]=x-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let f=o*h,d=o*u,m=a*h,x=a*u;t[0]=l*h,t[4]=m*c-d,t[8]=f*c+x,t[1]=l*u,t[5]=x*c+f,t[9]=d*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let f=o*l,d=o*c,m=a*l,x=a*c;t[0]=l*h,t[4]=x-f*u,t[8]=m*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=d*u+m,t[10]=f-x*u}else if(e.order==="XZY"){let f=o*l,d=o*c,m=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+x,t[5]=o*h,t[9]=d*u-m,t[2]=m*u-d,t[6]=a*h,t[10]=x*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tg,e,wg)}lookAt(e,t,n){let i=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),Qi.crossVectors(n,An),Qi.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Qi.crossVectors(n,An)),Qi.normalize(),Ca.crossVectors(An,Qi),i[0]=Qi.x,i[4]=Ca.x,i[8]=An.x,i[1]=Qi.y,i[5]=Ca.y,i[9]=An.y,i[2]=Qi.z,i[6]=Ca.z,i[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],x=n[6],g=n[10],p=n[14],v=n[3],y=n[7],_=n[11],b=n[15],w=i[0],A=i[4],C=i[8],E=i[12],M=i[1],P=i[5],N=i[9],B=i[13],k=i[2],U=i[6],D=i[10],H=i[14],z=i[3],Y=i[7],$=i[11],fe=i[15];return r[0]=o*w+a*M+l*k+c*z,r[4]=o*A+a*P+l*U+c*Y,r[8]=o*C+a*N+l*D+c*$,r[12]=o*E+a*B+l*H+c*fe,r[1]=h*w+u*M+f*k+d*z,r[5]=h*A+u*P+f*U+d*Y,r[9]=h*C+u*N+f*D+d*$,r[13]=h*E+u*B+f*H+d*fe,r[2]=m*w+x*M+g*k+p*z,r[6]=m*A+x*P+g*U+p*Y,r[10]=m*C+x*N+g*D+p*$,r[14]=m*E+x*B+g*H+p*fe,r[3]=v*w+y*M+_*k+b*z,r[7]=v*A+y*P+_*U+b*Y,r[11]=v*C+y*N+_*D+b*$,r[15]=v*E+y*B+_*H+b*fe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],d=e[14],m=e[3],x=e[7],g=e[11],p=e[15];return m*(+r*l*u-i*c*u-r*a*f+n*c*f+i*a*d-n*l*d)+x*(+t*l*d-t*c*f+r*o*f-i*o*d+i*c*h-r*l*h)+g*(+t*c*u-t*a*d-r*o*u+n*o*d+r*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*f+i*o*u-n*o*f+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],d=e[11],m=e[12],x=e[13],g=e[14],p=e[15],v=u*g*c-x*f*c+x*l*d-a*g*d-u*l*p+a*f*p,y=m*f*c-h*g*c-m*l*d+o*g*d+h*l*p-o*f*p,_=h*x*c-m*u*c+m*a*d-o*x*d-h*a*p+o*u*p,b=m*u*l-h*x*l-m*a*f+o*x*f+h*a*g-o*u*g,w=t*v+n*y+i*_+r*b;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/w;return e[0]=v*A,e[1]=(x*f*r-u*g*r-x*i*d+n*g*d+u*i*p-n*f*p)*A,e[2]=(a*g*r-x*l*r+x*i*c-n*g*c-a*i*p+n*l*p)*A,e[3]=(u*l*r-a*f*r-u*i*c+n*f*c+a*i*d-n*l*d)*A,e[4]=y*A,e[5]=(h*g*r-m*f*r+m*i*d-t*g*d-h*i*p+t*f*p)*A,e[6]=(m*l*r-o*g*r-m*i*c+t*g*c+o*i*p-t*l*p)*A,e[7]=(o*f*r-h*l*r+h*i*c-t*f*c-o*i*d+t*l*d)*A,e[8]=_*A,e[9]=(m*u*r-h*x*r-m*n*d+t*x*d+h*n*p-t*u*p)*A,e[10]=(o*x*r-m*a*r+m*n*c-t*x*c-o*n*p+t*a*p)*A,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*d-t*a*d)*A,e[12]=b*A,e[13]=(h*x*i-m*u*i+m*n*f-t*x*f-h*n*g+t*u*g)*A,e[14]=(m*a*i-o*x*i-m*n*l+t*x*l+o*n*g-t*a*g)*A,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*f+t*a*f)*A,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,m=r*u,x=o*h,g=o*u,p=a*u,v=l*c,y=l*h,_=l*u,b=n.x,w=n.y,A=n.z;return i[0]=(1-(x+p))*b,i[1]=(d+_)*b,i[2]=(m-y)*b,i[3]=0,i[4]=(d-_)*w,i[5]=(1-(f+p))*w,i[6]=(g+v)*w,i[7]=0,i[8]=(m+y)*A,i[9]=(g-v)*A,i[10]=(1-(f+x))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=lr.set(i[0],i[1],i[2]).length(),o=lr.set(i[4],i[5],i[6]).length(),a=lr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Kn.copy(this);let c=1/r,h=1/o,u=1/a;return Kn.elements[0]*=c,Kn.elements[1]*=c,Kn.elements[2]*=c,Kn.elements[4]*=h,Kn.elements[5]*=h,Kn.elements[6]*=h,Kn.elements[8]*=u,Kn.elements[9]*=u,Kn.elements[10]*=u,t.setFromRotationMatrix(Kn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=jn,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-i),f=(t+e)/(t-e),d=(n+i)/(n-i),m,x;if(l)m=r/(o-r),x=o*r/(o-r);else if(a===jn)m=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===So)m=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=jn,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),f=-(t+e)/(t-e),d=-(n+i)/(n-i),m,x;if(l)m=1/(o-r),x=o/(o-r);else if(a===jn)m=-2/(o-r),x=-(o+r)/(o-r);else if(a===So)m=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},lr=new L,Kn=new Ye,Tg=new L(0,0,0),wg=new L(1,1,1),Qi=new L,Ca=new L,An=new L,kd=new Ye,Hd=new Ct,Cn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(tt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-tt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(tt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return kd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hd.setFromEuler(this),this.setFromQuaternion(Hd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Cn.DEFAULT_ORDER="XYZ";var Ar=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ag=0,Vd=new L,cr=new Ct,Ri=new Ye,Ia=new L,ro=new L,Rg=new L,Cg=new Ct,Gd=new L(1,0,0),Wd=new L(0,1,0),Xd=new L(0,0,1),qd={type:"added"},Ig={type:"removed"},ur={type:"childadded",child:null},mu={type:"childremoved",child:null},pt=class s extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ag++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new L,t=new Cn,n=new Ct,i=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ye},normalMatrix:{value:new je}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ar,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.multiply(cr),this}rotateOnWorldAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.premultiply(cr),this}rotateX(e){return this.rotateOnAxis(Gd,e)}rotateY(e){return this.rotateOnAxis(Wd,e)}rotateZ(e){return this.rotateOnAxis(Xd,e)}translateOnAxis(e,t){return Vd.copy(e).applyQuaternion(this.quaternion),this.position.add(Vd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gd,e)}translateY(e){return this.translateOnAxis(Wd,e)}translateZ(e){return this.translateOnAxis(Xd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ia.copy(e):Ia.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ro.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(ro,Ia,this.up):Ri.lookAt(Ia,ro,this.up),this.quaternion.setFromRotationMatrix(Ri),i&&(Ri.extractRotation(i.matrixWorld),cr.setFromRotationMatrix(Ri),this.quaternion.premultiply(cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qd),ur.child=e,this.dispatchEvent(ur),ur.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ig),mu.child=e,this.dispatchEvent(mu),mu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qd),ur.child=e,this.dispatchEvent(ur),ur.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ro,e,Rg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ro,Cg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};pt.DEFAULT_UP=new L(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var $n=new L,Ci=new L,gu=new L,Ii=new L,hr=new L,dr=new L,Yd=new L,xu=new L,_u=new L,vu=new L,yu=new ct,Mu=new ct,Su=new ct,Li=class s{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),$n.subVectors(e,t),i.cross($n);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){$n.subVectors(i,t),Ci.subVectors(n,t),gu.subVectors(e,t);let o=$n.dot($n),a=$n.dot(Ci),l=$n.dot(gu),c=Ci.dot(Ci),h=Ci.dot(gu),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-a*h)*f,m=(o*h-a*l)*f;return r.set(1-d-m,m,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ii.x),l.addScaledVector(o,Ii.y),l.addScaledVector(a,Ii.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return yu.setScalar(0),Mu.setScalar(0),Su.setScalar(0),yu.fromBufferAttribute(e,t),Mu.fromBufferAttribute(e,n),Su.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(yu,r.x),o.addScaledVector(Mu,r.y),o.addScaledVector(Su,r.z),o}static isFrontFacing(e,t,n,i){return $n.subVectors(n,t),Ci.subVectors(e,t),$n.cross(Ci).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $n.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),$n.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;hr.subVectors(i,n),dr.subVectors(r,n),xu.subVectors(e,n);let l=hr.dot(xu),c=dr.dot(xu);if(l<=0&&c<=0)return t.copy(n);_u.subVectors(e,i);let h=hr.dot(_u),u=dr.dot(_u);if(h>=0&&u<=h)return t.copy(i);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(hr,o);vu.subVectors(e,r);let d=hr.dot(vu),m=dr.dot(vu);if(m>=0&&d<=m)return t.copy(r);let x=d*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(dr,a);let g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return Yd.subVectors(r,i),a=(u-h)/(u-h+(d-m)),t.copy(i).addScaledVector(Yd,a);let p=1/(g+x+f);return o=x*p,a=f*p,t.copy(n).addScaledVector(hr,o).addScaledVector(dr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},rp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},es={h:0,s:0,l:0},Pa={h:0,s:0,l:0};function bu(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Ve=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=nt.workingColorSpace){if(e=dh(e,1),t=tt(t,0,1),n=tt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=bu(o,r,e+1/3),this.g=bu(o,r,e),this.b=bu(o,r,e-1/3)}return nt.colorSpaceToWorking(this,i),this}setStyle(e,t=Qe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qe){let n=rp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=Sr(e.r),this.g=Sr(e.g),this.b=Sr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qe){return nt.workingToColorSpace(nn.copy(this),e),Math.round(tt(nn.r*255,0,255))*65536+Math.round(tt(nn.g*255,0,255))*256+Math.round(tt(nn.b*255,0,255))}getHexString(e=Qe){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(nn.copy(this),t);let n=nn.r,i=nn.g,r=nn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=Qe){nt.workingToColorSpace(nn.copy(this),e);let t=nn.r,n=nn.g,i=nn.b;return e!==Qe?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(es),this.setHSL(es.h+e,es.s+t,es.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(es),e.getHSL(Pa);let n=xo(es.h,Pa.h,t),i=xo(es.s,Pa.s,t),r=xo(es.l,Pa.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},nn=new Ve;Ve.NAMES=rp;var Pg=0,sn=class extends fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pg++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=ws,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tl,this.blendDst=nl,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ws&&(n.blending=this.blending),this.side!==Qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==tl&&(n.blendSrc=this.blendSrc),this.blendDst!==nl&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==bs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==bs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},mt=class extends sn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=th,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var kt=new L,La=new ge,Lg=0,ft=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=il,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)La.fromBufferAttribute(this,t),La.applyMatrix3(e),this.setXY(t,La.x,La.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array),r=dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==il&&(e.usage=this.usage),e}};var Eo=class extends ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var To=class extends ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ot=class extends ft{constructor(e,t,n){super(new Float32Array(e),t,n)}},Dg=0,On=new Ye,Eu=new pt,fr=new L,Rn=new en,oo=new en,Zt=new L,ht=class s extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dg++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fh(e)?To:Eo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return On.makeRotationFromQuaternion(e),this.applyMatrix4(On),this}rotateX(e){return On.makeRotationX(e),this.applyMatrix4(On),this}rotateY(e){return On.makeRotationY(e),this.applyMatrix4(On),this}rotateZ(e){return On.makeRotationZ(e),this.applyMatrix4(On),this}translate(e,t,n){return On.makeTranslation(e,t,n),this.applyMatrix4(On),this}scale(e,t,n){return On.makeScale(e,t,n),this.applyMatrix4(On),this}lookAt(e){return Eu.lookAt(e),Eu.updateMatrix(),this.applyMatrix4(Eu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fr).negate(),this.translate(fr.x,fr.y,fr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ot(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new en);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(Rn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];oo.setFromBufferAttribute(a),this.morphTargetsRelative?(Zt.addVectors(Rn.min,oo.min),Rn.expandByPoint(Zt),Zt.addVectors(Rn.max,oo.max),Rn.expandByPoint(Zt)):(Rn.expandByPoint(oo.min),Rn.expandByPoint(oo.max))}Rn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Zt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Zt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Zt.fromBufferAttribute(a,c),l&&(fr.fromBufferAttribute(e,c),Zt.add(fr)),i=Math.max(i,n.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ft(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new L,l[C]=new L;let c=new L,h=new L,u=new L,f=new ge,d=new ge,m=new ge,x=new L,g=new L;function p(C,E,M){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,C),d.fromBufferAttribute(r,E),m.fromBufferAttribute(r,M),h.sub(c),u.sub(c),d.sub(f),m.sub(f);let P=1/(d.x*m.y-m.x*d.y);isFinite(P)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(P),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(P),a[C].add(x),a[E].add(x),a[M].add(x),l[C].add(g),l[E].add(g),l[M].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let C=0,E=v.length;C<E;++C){let M=v[C],P=M.start,N=M.count;for(let B=P,k=P+N;B<k;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let y=new L,_=new L,b=new L,w=new L;function A(C){b.fromBufferAttribute(i,C),w.copy(b);let E=a[C];y.copy(E),y.sub(b.multiplyScalar(b.dot(E))).normalize(),_.crossVectors(w,E);let P=_.dot(l[C])<0?-1:1;o.setXYZW(C,y.x,y.y,y.z,P)}for(let C=0,E=v.length;C<E;++C){let M=v[C],P=M.start,N=M.count;for(let B=P,k=P+N;B<k;B+=3)A(e.getX(B+0)),A(e.getX(B+1)),A(e.getX(B+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(e)for(let f=0,d=e.count;f<d;f+=3){let m=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),d=0,m=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?d=l[x]*a.data.stride+a.offset:d=l[x]*h;for(let p=0;p<h;p++)f[m++]=c[d++]}return new ft(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zd=new Ye,Ms=new ns,Da=new mn,Kd=new L,Na=new L,Ua=new L,Fa=new L,Tu=new L,Oa=new L,$d=new L,Ba=new L,Je=class extends pt{constructor(e=new ht,t=new mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Oa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Tu.fromBufferAttribute(u,e),o?Oa.addScaledVector(Tu,h):Oa.addScaledVector(Tu.sub(t),h))}t.add(Oa)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Da.copy(n.boundingSphere),Da.applyMatrix4(r),Ms.copy(e.ray).recast(e.near),!(Da.containsPoint(Ms.origin)===!1&&(Ms.intersectSphere(Da,Kd)===null||Ms.origin.distanceToSquared(Kd)>(e.far-e.near)**2))&&(Zd.copy(r).invert(),Ms.copy(e.ray).applyMatrix4(Zd),!(n.boundingBox!==null&&Ms.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ms)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){let g=f[m],p=o[g.materialIndex],v=Math.max(g.start,d.start),y=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let _=v,b=y;_<b;_+=3){let w=a.getX(_),A=a.getX(_+1),C=a.getX(_+2);i=za(this,p,e,n,c,h,u,w,A,C),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){let v=a.getX(g),y=a.getX(g+1),_=a.getX(g+2);i=za(this,o,e,n,c,h,u,v,y,_),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){let g=f[m],p=o[g.materialIndex],v=Math.max(g.start,d.start),y=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let _=v,b=y;_<b;_+=3){let w=_,A=_+1,C=_+2;i=za(this,p,e,n,c,h,u,w,A,C),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){let v=g,y=g+1,_=g+2;i=za(this,o,e,n,c,h,u,v,y,_),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function Ng(s,e,t,n,i,r,o,a){let l;if(e.side===Xt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Qn,a),l===null)return null;Ba.copy(a),Ba.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Ba);return c<t.near||c>t.far?null:{distance:c,point:Ba.clone(),object:s}}function za(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Na),s.getVertexPosition(l,Ua),s.getVertexPosition(c,Fa);let h=Ng(s,e,t,n,Na,Ua,Fa,$d);if(h){let u=new L;Li.getBarycoord($d,Na,Ua,Fa,u),i&&(h.uv=Li.getInterpolatedAttribute(i,a,l,c,u,new ge)),r&&(h.uv1=Li.getInterpolatedAttribute(r,a,l,c,u,new ge)),o&&(h.normal=Li.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new L,materialIndex:0};Li.getNormal(Na,Ua,Fa,f.normal),h.face=f,h.barycoord=u}return h}var Kt=class s extends ht{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],f=0,d=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,i,o,2),m("x","z","y",1,-1,e,n,-t,i,o,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ot(c,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(u,2));function m(x,g,p,v,y,_,b,w,A,C,E){let M=_/A,P=b/C,N=_/2,B=b/2,k=w/2,U=A+1,D=C+1,H=0,z=0,Y=new L;for(let $=0;$<D;$++){let fe=$*P-B;for(let ve=0;ve<U;ve++){let we=ve*M-N;Y[x]=we*v,Y[g]=fe*y,Y[p]=k,c.push(Y.x,Y.y,Y.z),Y[x]=0,Y[g]=0,Y[p]=w>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(ve/A),u.push(1-$/C),H+=1}}for(let $=0;$<C;$++)for(let fe=0;fe<A;fe++){let ve=f+fe+U*$,we=f+fe+U*($+1),Ce=f+(fe+1)+U*($+1),Me=f+(fe+1)+U*$;l.push(ve,we,Me),l.push(we,Ce,Me),z+=6}a.addGroup(d,z,E),d+=z,f+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Xs(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function rn(s){let e={};for(let t=0;t<s.length;t++){let n=Xs(s[t]);for(let i in n)e[i]=n[i]}return e}function Ug(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function ph(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}var ri={clone:Xs,merge:rn},Fg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Og=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Gt=class extends sn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fg,this.fragmentShader=Og,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xs(e.uniforms),this.uniformsGroups=Ug(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},wo=class extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ts=new L,Jd=new ge,jd=new ge,Ht=class extends wo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Is*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(go*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Is*2*Math.atan(Math.tan(go*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ts.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ts.x,ts.y).multiplyScalar(-e/ts.z),ts.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ts.x,ts.y).multiplyScalar(-e/ts.z)}getViewSize(e,t){return this.getViewBounds(e,Jd,jd),t.subVectors(jd,Jd)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(go*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},pr=-90,mr=1,al=class extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ht(pr,mr,e,t);i.layers=this.layers,this.add(i);let r=new Ht(pr,mr,e,t);r.layers=this.layers,this.add(r);let o=new Ht(pr,mr,e,t);o.layers=this.layers,this.add(o);let a=new Ht(pr,mr,e,t);a.layers=this.layers,this.add(a);let l=new Ht(pr,mr,e,t);l.layers=this.layers,this.add(l);let c=new Ht(pr,mr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===jn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===So)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Ao=class extends Tt{constructor(e=[],t=Vs,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ll=class extends hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ao(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Kt(5,5,5),r=new Gt({name:"CubemapFromEquirect",uniforms:Xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:$t});r.uniforms.tEquirect.value=t;let o=new Je(i,r),a=t.minFilter;return t.minFilter===Pn&&(t.minFilter=It),new al(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},Ze=class extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Bg={type:"move"},Rr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;c.inputState.pinching&&f>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Bg)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ze;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Ro=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ve(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Co=class extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ps=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=il,this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},cn=new L,is=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix4(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyNormalMatrix(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.transformDirection(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Jn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Jn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Jn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Jn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array),r=dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ni=class extends sn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},gr,ao=new L,xr=new L,_r=new L,vr=new ge,lo=new ge,op=new Ye,ka=new L,co=new L,Ha=new L,Qd=new ge,wu=new ge,ef=new ge,ss=class extends pt{constructor(e=new Ni){if(super(),this.isSprite=!0,this.type="Sprite",gr===void 0){gr=new ht;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ps(t,5);gr.setIndex([0,1,2,0,2,3]),gr.setAttribute("position",new is(n,3,0,!1)),gr.setAttribute("uv",new is(n,2,3,!1))}this.geometry=gr,this.material=e,this.center=new ge(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),xr.setFromMatrixScale(this.matrixWorld),op.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),_r.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&xr.multiplyScalar(-_r.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;Va(ka.set(-.5,-.5,0),_r,o,xr,i,r),Va(co.set(.5,-.5,0),_r,o,xr,i,r),Va(Ha.set(.5,.5,0),_r,o,xr,i,r),Qd.set(0,0),wu.set(1,0),ef.set(1,1);let a=e.ray.intersectTriangle(ka,co,Ha,!1,ao);if(a===null&&(Va(co.set(-.5,.5,0),_r,o,xr,i,r),wu.set(0,1),a=e.ray.intersectTriangle(ka,Ha,co,!1,ao),a===null))return;let l=e.ray.origin.distanceTo(ao);l<e.near||l>e.far||t.push({distance:l,point:ao.clone(),uv:Li.getInterpolation(ao,ka,co,Ha,Qd,wu,ef,new ge),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Va(s,e,t,n,i,r){vr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(lo.x=r*vr.x-i*vr.y,lo.y=i*vr.x+r*vr.y):lo.copy(vr),s.copy(e),s.x+=lo.x,s.y+=lo.y,s.applyMatrix4(op)}var tf=new L,nf=new ct,sf=new ct,zg=new L,rf=new Ye,Ga=new L,Au=new mn,of=new Ye,Ru=new ns,Io=class extends Je{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ou,this.bindMatrix=new Ye,this.bindMatrixInverse=new Ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new en),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ga),this.boundingBox.expandByPoint(Ga)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new mn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ga),this.boundingSphere.expandByPoint(Ga)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Au.copy(this.boundingSphere),Au.applyMatrix4(i),e.ray.intersectsSphere(Au)!==!1&&(of.copy(i).invert(),Ru.copy(e.ray).applyMatrix4(of),!(this.boundingBox!==null&&Ru.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ru)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ct,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ou?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Wf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;nf.fromBufferAttribute(i.attributes.skinIndex,e),sf.fromBufferAttribute(i.attributes.skinWeight,e),tf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=sf.getComponent(r);if(o!==0){let a=nf.getComponent(r);rf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(zg.copy(tf).applyMatrix4(rf),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Cr=class extends pt{constructor(){super(),this.isBone=!0,this.type="Bone"}},dn=class extends Tt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Vt,h=Vt,u,f){super(null,o,a,l,c,h,i,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},af=new Ye,kg=new Ye,Po=class s{constructor(e=[],t=[]){this.uuid=kn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ye)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ye;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:kg;af.multiplyMatrices(a,t[r]),af.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new dn(t,e,e,fn,yn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Cr),this.bones.push(o),this.boneInverses.push(new Ye().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},rs=class extends ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},yr=new Ye,lf=new Ye,Wa=[],cf=new en,Hg=new Ye,uo=new Je,ho=new mn,pi=class extends Je{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new rs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Hg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new en),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yr),cf.copy(e.boundingBox).applyMatrix4(yr),this.boundingBox.union(cf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yr),ho.copy(e.boundingSphere).applyMatrix4(yr),this.boundingSphere.union(ho)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(uo.geometry=this.geometry,uo.material=this.material,uo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ho.copy(this.boundingSphere),ho.applyMatrix4(n),e.ray.intersectsSphere(ho)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,yr),lf.multiplyMatrices(n,yr),uo.matrixWorld=lf,uo.raycast(e,Wa);for(let o=0,a=Wa.length;o<a;o++){let l=Wa[o];l.instanceId=r,l.object=this,t.push(l)}Wa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new rs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new dn(new Float32Array(i*this.count),i,this.count,Br,yn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Cu=new L,Vg=new L,Gg=new je,Bn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Cu.subVectors(n,t).cross(Vg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Cu),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Gg.getNormalMatrix(e),i=this.coplanarPoint(Cu).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ss=new mn,Wg=new ge(.5,.5),Xa=new L,Ir=class{constructor(e=new Bn,t=new Bn,n=new Bn,i=new Bn,r=new Bn,o=new Bn){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=jn,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],m=r[8],x=r[9],g=r[10],p=r[11],v=r[12],y=r[13],_=r[14],b=r[15];if(i[0].setComponents(c-o,d-h,p-m,b-v).normalize(),i[1].setComponents(c+o,d+h,p+m,b+v).normalize(),i[2].setComponents(c+a,d+u,p+x,b+y).normalize(),i[3].setComponents(c-a,d-u,p-x,b-y).normalize(),n)i[4].setComponents(l,f,g,_).normalize(),i[5].setComponents(c-l,d-f,p-g,b-_).normalize();else if(i[4].setComponents(c-l,d-f,p-g,b-_).normalize(),t===jn)i[5].setComponents(c+l,d+f,p+g,b+_).normalize();else if(t===So)i[5].setComponents(l,f,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ss.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ss.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ss)}intersectsSprite(e){Ss.center.set(0,0,0);let t=Wg.distanceTo(e.center);return Ss.radius=.7071067811865476+t,Ss.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ss)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Xa.x=i.normal.x>0?e.max.x:e.min.x,Xa.y=i.normal.y>0?e.max.y:e.min.y,Xa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Xa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var os=class extends sn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},cl=new L,ul=new L,uf=new Ye,fo=new ns,qa=new mn,Iu=new L,hf=new L,Ls=class extends pt{constructor(e=new ht,t=new os){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)cl.fromBufferAttribute(t,i-1),ul.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=cl.distanceTo(ul);e.setAttribute("lineDistance",new ot(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qa.copy(n.boundingSphere),qa.applyMatrix4(i),qa.radius+=r,e.ray.intersectsSphere(qa)===!1)return;uf.copy(i).invert(),fo.copy(e.ray).applyMatrix4(uf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let x=d,g=m-1;x<g;x+=c){let p=h.getX(x),v=h.getX(x+1),y=Ya(this,e,fo,l,p,v,x);y&&t.push(y)}if(this.isLineLoop){let x=h.getX(m-1),g=h.getX(d),p=Ya(this,e,fo,l,x,g,m-1);p&&t.push(p)}}else{let d=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let x=d,g=m-1;x<g;x+=c){let p=Ya(this,e,fo,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){let x=Ya(this,e,fo,l,m-1,d,m-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ya(s,e,t,n,i,r,o){let a=s.geometry.attributes.position;if(cl.fromBufferAttribute(a,i),ul.fromBufferAttribute(a,r),t.distanceSqToSegment(cl,ul,Iu,hf)>n)return;Iu.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Iu);if(!(c<e.near||c>e.far))return{distance:c,point:hf.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var df=new L,ff=new L,Ds=class extends Ls{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)df.fromBufferAttribute(t,i),ff.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+df.distanceTo(ff);e.setAttribute("lineDistance",new ot(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Lo=class extends Ls{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},mi=class extends sn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},pf=new Ye,zu=new ns,Za=new mn,Ka=new L,Ui=class extends pt{constructor(e=new ht,t=new mi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Za.copy(n.boundingSphere),Za.applyMatrix4(i),Za.radius+=r,e.ray.intersectsSphere(Za)===!1)return;pf.copy(i).invert(),zu.copy(e.ray).applyMatrix4(pf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let m=f,x=d;m<x;m++){let g=c.getX(m);Ka.fromBufferAttribute(u,g),mf(Ka,g,l,i,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let m=f,x=d;m<x;m++)Ka.fromBufferAttribute(u,m),mf(Ka,m,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function mf(s,e,t,n,i,r,o){let a=zu.distanceSqToPoint(s);if(a<t){let l=new L;zu.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var gn=class extends Tt{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ns=class extends Tt{constructor(e,t,n=ls,i,r,o,a=Vt,l=Vt,c,h=br,u=1){if(h!==br&&h!==us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Do=class extends Tt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Ut=class s extends ht{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],f=[],d=[],m=0,x=[],g=n/2,p=0;v(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ot(u,3)),this.setAttribute("normal",new ot(f,3)),this.setAttribute("uv",new ot(d,2));function v(){let _=new L,b=new L,w=0,A=(t-e)/n;for(let C=0;C<=r;C++){let E=[],M=C/r,P=M*(t-e)+e;for(let N=0;N<=i;N++){let B=N/i,k=B*l+a,U=Math.sin(k),D=Math.cos(k);b.x=P*U,b.y=-M*n+g,b.z=P*D,u.push(b.x,b.y,b.z),_.set(U,A,D).normalize(),f.push(_.x,_.y,_.z),d.push(B,1-M),E.push(m++)}x.push(E)}for(let C=0;C<i;C++)for(let E=0;E<r;E++){let M=x[E][C],P=x[E+1][C],N=x[E+1][C+1],B=x[E][C+1];(e>0||E!==0)&&(h.push(M,P,B),w+=3),(t>0||E!==r-1)&&(h.push(P,N,B),w+=3)}c.addGroup(p,w,0),p+=w}function y(_){let b=m,w=new ge,A=new L,C=0,E=_===!0?e:t,M=_===!0?1:-1;for(let N=1;N<=i;N++)u.push(0,g*M,0),f.push(0,M,0),d.push(.5,.5),m++;let P=m;for(let N=0;N<=i;N++){let k=N/i*l+a,U=Math.cos(k),D=Math.sin(k);A.x=E*D,A.y=g*M,A.z=E*U,u.push(A.x,A.y,A.z),f.push(0,M,0),w.x=U*.5+.5,w.y=D*.5*M+.5,d.push(w.x,w.y),m++}for(let N=0;N<i;N++){let B=b+N,k=P+N;_===!0?h.push(k,k+1,B):h.push(k+1,k,B),C+=3}c.addGroup(p,C,_===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},as=class s extends Ut{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var In=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],f=n[i+1]-h,d=(o-h)/f;return(i+d)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new ge:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new L,i=[],r=[],o=[],a=new L,l=new Ye;for(let d=0;d<=e;d++){let m=d/e;i[d]=this.getTangentAt(m,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(tt(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,m))}o[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos(tt(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],d*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Pr=class extends In{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ge){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},hl=class extends Pr{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function mh(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let f=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,i(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var $a=new L,Pu=new mh,Lu=new mh,Du=new mh,dl=class extends In{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new L){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:($a.subVectors(i[0],i[1]).add(i[0]),c=$a);let u=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:($a.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=$a),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Pu.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,m,x,g),Lu.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,m,x,g),Du.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(Pu.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Lu.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Du.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Pu.calc(l),Lu.calc(l),Du.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new L().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function gf(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function Xg(s,e){let t=1-s;return t*t*e}function qg(s,e){return 2*(1-s)*s*e}function Yg(s,e){return s*s*e}function _o(s,e,t,n){return Xg(s,e)+qg(s,t)+Yg(s,n)}function Zg(s,e){let t=1-s;return t*t*t*e}function Kg(s,e){let t=1-s;return 3*t*t*s*e}function $g(s,e){return 3*(1-s)*s*s*e}function Jg(s,e){return s*s*s*e}function vo(s,e,t,n,i){return Zg(s,e)+Kg(s,t)+$g(s,n)+Jg(s,i)}var No=class extends In{constructor(e=new ge,t=new ge,n=new ge,i=new ge){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ge){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(vo(e,i.x,r.x,o.x,a.x),vo(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},fl=class extends In{constructor(e=new L,t=new L,n=new L,i=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new L){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(vo(e,i.x,r.x,o.x,a.x),vo(e,i.y,r.y,o.y,a.y),vo(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Uo=class extends In{constructor(e=new ge,t=new ge){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ge){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ge){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},pl=class extends In{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fo=class extends In{constructor(e=new ge,t=new ge,n=new ge){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ge){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(_o(e,i.x,r.x,o.x),_o(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ml=class extends In{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(_o(e,i.x,r.x,o.x),_o(e,i.y,r.y,o.y),_o(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Oo=class extends In{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ge){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(gf(a,l.x,c.x,h.x,u.x),gf(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ge().fromArray(i))}return this}},ku=Object.freeze({__proto__:null,ArcCurve:hl,CatmullRomCurve3:dl,CubicBezierCurve:No,CubicBezierCurve3:fl,EllipseCurve:Pr,LineCurve:Uo,LineCurve3:pl,QuadraticBezierCurve:Fo,QuadraticBezierCurve3:ml,SplineCurve:Oo}),gl=class extends In{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ku[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new ku[i.type]().fromJSON(i))}return this}},Bo=class extends gl{constructor(e){super(),this.type="Path",this.currentPoint=new ge,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Uo(this.currentPoint.clone(),new ge(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new Fo(this.currentPoint.clone(),new ge(e,t),new ge(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new No(this.currentPoint.clone(),new ge(e,t),new ge(n,i),new ge(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Oo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new Pr(e,t,n,i,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ti=class extends Bo{constructor(e){super(e),this.uuid=kn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Bo().fromJSON(i))}return this}};function jg(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=ap(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=i0(s,e,r,t)),s.length>80*t){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let f=t;f<i;f+=t){let d=s[f],m=s[f+1];d<a&&(a=d),m<l&&(l=m),d>h&&(h=d),m>u&&(u=m)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return zo(r,o,t,a,l,c,0),o}function ap(s,e,t,n,i){let r;if(i===p0(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=xf(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=xf(o/n|0,s[o],s[o+1],r);return r&&Lr(r,r.next)&&(Ho(r),r=r.next),r}function Us(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(Lr(t,t.next)||Rt(t.prev,t,t.next)===0)){if(Ho(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function zo(s,e,t,n,i,r,o){if(!s)return;!o&&r&&l0(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?e0(s,n,i,r):Qg(s)){e.push(l.i,s.i,c.i),Ho(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=t0(Us(s),e),zo(s,e,t,n,i,r,2)):o===2&&n0(s,e,t,n,i,r):zo(Us(s),e,t,n,i,r,1);break}}}function Qg(s){let e=s.prev,t=s,n=s.next;if(Rt(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(i,r,o),u=Math.min(a,l,c),f=Math.max(i,r,o),d=Math.max(a,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=f&&m.y>=u&&m.y<=d&&mo(i,a,r,l,o,c,m.x,m.y)&&Rt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function e0(s,e,t,n){let i=s.prev,r=s,o=s.next;if(Rt(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,f=o.y,d=Math.min(a,l,c),m=Math.min(h,u,f),x=Math.max(a,l,c),g=Math.max(h,u,f),p=Hu(d,m,e,t,n),v=Hu(x,g,e,t,n),y=s.prevZ,_=s.nextZ;for(;y&&y.z>=p&&_&&_.z<=v;){if(y.x>=d&&y.x<=x&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&mo(a,h,l,u,c,f,y.x,y.y)&&Rt(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=d&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==o&&mo(a,h,l,u,c,f,_.x,_.y)&&Rt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=x&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&mo(a,h,l,u,c,f,y.x,y.y)&&Rt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=v;){if(_.x>=d&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==o&&mo(a,h,l,u,c,f,_.x,_.y)&&Rt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function t0(s,e){let t=s;do{let n=t.prev,i=t.next.next;!Lr(n,i)&&cp(n,t,t.next,i)&&ko(n,i)&&ko(i,n)&&(e.push(n.i,t.i,i.i),Ho(t),Ho(t.next),t=s=i),t=t.next}while(t!==s);return Us(t)}function n0(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&h0(o,a)){let l=up(o,a);o=Us(o,o.next),l=Us(l,l.next),zo(o,e,t,n,i,r,0),zo(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function i0(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=ap(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(u0(c))}i.sort(s0);for(let r=0;r<i.length;r++)t=r0(i[r],t);return t}function s0(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function r0(s,e){let t=o0(s,e);if(!t)return e;let n=up(t,s);return Us(n,n.next),Us(t,t.next)}function o0(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(Lr(s,t))return t;do{if(Lr(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&lp(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let u=Math.abs(i-t.y)/(n-t.x);ko(t,s)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&a0(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function a0(s,e){return Rt(s.prev,s,e.prev)<0&&Rt(e.next,s,s.next)<0}function l0(s,e,t,n){let i=s;do i.z===0&&(i.z=Hu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,c0(i)}function c0(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function Hu(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function u0(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function lp(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function mo(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&lp(s,e,t,n,i,r,o,a)}function h0(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!d0(s,e)&&(ko(s,e)&&ko(e,s)&&f0(s,e)&&(Rt(s.prev,s,e.prev)||Rt(s,e.prev,e))||Lr(s,e)&&Rt(s.prev,s,s.next)>0&&Rt(e.prev,e,e.next)>0)}function Rt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Lr(s,e){return s.x===e.x&&s.y===e.y}function cp(s,e,t,n){let i=ja(Rt(s,e,t)),r=ja(Rt(s,e,n)),o=ja(Rt(t,n,s)),a=ja(Rt(t,n,e));return!!(i!==r&&o!==a||i===0&&Ja(s,t,e)||r===0&&Ja(s,n,e)||o===0&&Ja(t,s,n)||a===0&&Ja(t,e,n))}function Ja(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function ja(s){return s>0?1:s<0?-1:0}function d0(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&cp(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function ko(s,e){return Rt(s.prev,s,s.next)<0?Rt(s,e,s.next)>=0&&Rt(s,s.prev,e)>=0:Rt(s,e,s.prev)<0||Rt(s,s.next,e)<0}function f0(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function up(s,e){let t=Vu(s.i,s.x,s.y),n=Vu(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function xf(s,e,t,n){let i=Vu(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ho(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Vu(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function p0(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var Gu=class{static triangulate(e,t,n=2){return jg(e,t,n)}},hi=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];_f(e),vf(n,e);let o=e.length;t.forEach(_f);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,vf(n,t[l]);let a=Gu.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function _f(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function vf(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Dr=class s extends ht{constructor(e=new ti([new ge(.5,.5),new ge(-.5,.5),new ge(-.5,-.5),new ge(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new ot(i,3)),this.setAttribute("uv",new ot(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:m0,y,_=!1,b,w,A,C;p&&(y=p.getSpacedPoints(h),_=!0,f=!1,b=p.computeFrenetFrames(h,!1),w=new L,A=new L,C=new L),f||(g=0,d=0,m=0,x=0);let E=a.extractPoints(c),M=E.shape,P=E.holes;if(!hi.isClockWise(M)){M=M.reverse();for(let O=0,W=P.length;O<W;O++){let G=P[O];hi.isClockWise(G)&&(P[O]=G.reverse())}}function B(O){let G=10000000000000001e-36,J=O[0];for(let se=1;se<=O.length;se++){let ce=se%O.length,pe=O[ce],Oe=pe.x-J.x,ke=pe.y-J.y,I=Oe*Oe+ke*ke,S=Math.max(Math.abs(pe.x),Math.abs(pe.y),Math.abs(J.x),Math.abs(J.y)),V=G*S*S;if(I<=V){O.splice(ce,1),se--;continue}J=pe}}B(M),P.forEach(B);let k=P.length,U=M;for(let O=0;O<k;O++){let W=P[O];M=M.concat(W)}function D(O,W,G){return W||console.error("THREE.ExtrudeGeometry: vec does not exist"),O.clone().addScaledVector(W,G)}let H=M.length;function z(O,W,G){let J,se,ce,pe=O.x-W.x,Oe=O.y-W.y,ke=G.x-O.x,I=G.y-O.y,S=pe*pe+Oe*Oe,V=pe*I-Oe*ke;if(Math.abs(V)>Number.EPSILON){let j=Math.sqrt(S),re=Math.sqrt(ke*ke+I*I),Q=W.x-Oe/j,Pe=W.y+pe/j,be=G.x-I/re,Ne=G.y+ke/re,ze=((be-Q)*I-(Ne-Pe)*ke)/(pe*I-Oe*ke);J=Q+pe*ze-O.x,se=Pe+Oe*ze-O.y;let Se=J*J+se*se;if(Se<=2)return new ge(J,se);ce=Math.sqrt(Se/2)}else{let j=!1;pe>Number.EPSILON?ke>Number.EPSILON&&(j=!0):pe<-Number.EPSILON?ke<-Number.EPSILON&&(j=!0):Math.sign(Oe)===Math.sign(I)&&(j=!0),j?(J=-Oe,se=pe,ce=Math.sqrt(S)):(J=pe,se=Oe,ce=Math.sqrt(S/2))}return new ge(J/ce,se/ce)}let Y=[];for(let O=0,W=U.length,G=W-1,J=O+1;O<W;O++,G++,J++)G===W&&(G=0),J===W&&(J=0),Y[O]=z(U[O],U[G],U[J]);let $=[],fe,ve=Y.concat();for(let O=0,W=k;O<W;O++){let G=P[O];fe=[];for(let J=0,se=G.length,ce=se-1,pe=J+1;J<se;J++,ce++,pe++)ce===se&&(ce=0),pe===se&&(pe=0),fe[J]=z(G[J],G[ce],G[pe]);$.push(fe),ve=ve.concat(fe)}let we;if(g===0)we=hi.triangulateShape(U,P);else{let O=[],W=[];for(let G=0;G<g;G++){let J=G/g,se=d*Math.cos(J*Math.PI/2),ce=m*Math.sin(J*Math.PI/2)+x;for(let pe=0,Oe=U.length;pe<Oe;pe++){let ke=D(U[pe],Y[pe],ce);Re(ke.x,ke.y,-se),J===0&&O.push(ke)}for(let pe=0,Oe=k;pe<Oe;pe++){let ke=P[pe];fe=$[pe];let I=[];for(let S=0,V=ke.length;S<V;S++){let j=D(ke[S],fe[S],ce);Re(j.x,j.y,-se),J===0&&I.push(j)}J===0&&W.push(I)}}we=hi.triangulateShape(O,W)}let Ce=we.length,Me=m+x;for(let O=0;O<H;O++){let W=f?D(M[O],ve[O],Me):M[O];_?(A.copy(b.normals[0]).multiplyScalar(W.x),w.copy(b.binormals[0]).multiplyScalar(W.y),C.copy(y[0]).add(A).add(w),Re(C.x,C.y,C.z)):Re(W.x,W.y,0)}for(let O=1;O<=h;O++)for(let W=0;W<H;W++){let G=f?D(M[W],ve[W],Me):M[W];_?(A.copy(b.normals[O]).multiplyScalar(G.x),w.copy(b.binormals[O]).multiplyScalar(G.y),C.copy(y[O]).add(A).add(w),Re(C.x,C.y,C.z)):Re(G.x,G.y,u/h*O)}for(let O=g-1;O>=0;O--){let W=O/g,G=d*Math.cos(W*Math.PI/2),J=m*Math.sin(W*Math.PI/2)+x;for(let se=0,ce=U.length;se<ce;se++){let pe=D(U[se],Y[se],J);Re(pe.x,pe.y,u+G)}for(let se=0,ce=P.length;se<ce;se++){let pe=P[se];fe=$[se];for(let Oe=0,ke=pe.length;Oe<ke;Oe++){let I=D(pe[Oe],fe[Oe],J);_?Re(I.x,I.y+y[h-1].y,y[h-1].x+G):Re(I.x,I.y,u+G)}}}te(),ie();function te(){let O=i.length/3;if(f){let W=0,G=H*W;for(let J=0;J<Ce;J++){let se=we[J];ae(se[2]+G,se[1]+G,se[0]+G)}W=h+g*2,G=H*W;for(let J=0;J<Ce;J++){let se=we[J];ae(se[0]+G,se[1]+G,se[2]+G)}}else{for(let W=0;W<Ce;W++){let G=we[W];ae(G[2],G[1],G[0])}for(let W=0;W<Ce;W++){let G=we[W];ae(G[0]+H*h,G[1]+H*h,G[2]+H*h)}}n.addGroup(O,i.length/3-O,0)}function ie(){let O=i.length/3,W=0;Ae(U,W),W+=U.length;for(let G=0,J=P.length;G<J;G++){let se=P[G];Ae(se,W),W+=se.length}n.addGroup(O,i.length/3-O,1)}function Ae(O,W){let G=O.length;for(;--G>=0;){let J=G,se=G-1;se<0&&(se=O.length-1);for(let ce=0,pe=h+g*2;ce<pe;ce++){let Oe=H*ce,ke=H*(ce+1),I=W+J+Oe,S=W+se+Oe,V=W+se+ke,j=W+J+ke;Te(I,S,V,j)}}}function Re(O,W,G){l.push(O),l.push(W),l.push(G)}function ae(O,W,G){Z(O),Z(W),Z(G);let J=i.length/3,se=v.generateTopUV(n,i,J-3,J-2,J-1);T(se[0]),T(se[1]),T(se[2])}function Te(O,W,G,J){Z(O),Z(W),Z(J),Z(W),Z(G),Z(J);let se=i.length/3,ce=v.generateSideWallUV(n,i,se-6,se-3,se-2,se-1);T(ce[0]),T(ce[1]),T(ce[3]),T(ce[1]),T(ce[2]),T(ce[3])}function Z(O){i.push(l[O*3+0]),i.push(l[O*3+1]),i.push(l[O*3+2])}function T(O){r.push(O.x),r.push(O.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return g0(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new ku[i.type]().fromJSON(i)),new s(n,e.options)}},m0={generateTopUV:function(s,e,t,n,i){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new ge(r,o),new ge(a,l),new ge(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[i*3],d=e[i*3+1],m=e[i*3+2],x=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ge(o,1-l),new ge(c,1-u),new ge(f,1-m),new ge(x,1-p)]:[new ge(a,1-l),new ge(h,1-u),new ge(d,1-m),new ge(g,1-p)]}};function g0(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ft=class s extends ht{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,f=t/l,d=[],m=[],x=[],g=[];for(let p=0;p<h;p++){let v=p*f-o;for(let y=0;y<c;y++){let _=y*u-r;m.push(_,-v,0),x.push(0,0,1),g.push(y/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){let y=v+c*p,_=v+c*(p+1),b=v+1+c*(p+1),w=v+1+c*p;d.push(y,_,w),d.push(_,b,w)}this.setIndex(d),this.setAttribute("position",new ot(m,3)),this.setAttribute("normal",new ot(x,3)),this.setAttribute("uv",new ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Fs=class s extends ht{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],u=e,f=(t-e)/i,d=new L,m=new ge;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){let p=r+g/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),m.x=(d.x/t+1)/2,m.y=(d.y/t+1)/2,h.push(m.x,m.y)}u+=f}for(let x=0;x<i;x++){let g=x*(n+1);for(let p=0;p<n;p++){let v=p+g,y=v,_=v+n+1,b=v+n+2,w=v+1;a.push(y,_,w),a.push(_,b,w)}}this.setIndex(a),this.setAttribute("position",new ot(l,3)),this.setAttribute("normal",new ot(c,3)),this.setAttribute("uv",new ot(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Os=class s extends ht{constructor(e=new ti([new ge(0,.5),new ge(-.5,-.5),new ge(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new ot(i,3)),this.setAttribute("normal",new ot(r,3)),this.setAttribute("uv",new ot(o,2));function c(h){let u=i.length/3,f=h.extractPoints(t),d=f.shape,m=f.holes;hi.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,p=m.length;g<p;g++){let v=m[g];hi.isClockWise(v)===!0&&(m[g]=v.reverse())}let x=hi.triangulateShape(d,m);for(let g=0,p=m.length;g<p;g++){let v=m[g];d=d.concat(v)}for(let g=0,p=d.length;g<p;g++){let v=d[g];i.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let g=0,p=x.length;g<p;g++){let v=x[g],y=v[0]+u,_=v[1]+u,b=v[2]+u;n.push(y,_,b),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return x0(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};function x0(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var Nt=class s extends ht{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new L,f=new L,d=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){let v=[],y=p/n,_=0;p===0&&o===0?_=.5/t:p===n&&l===Math.PI&&(_=-.5/t);for(let b=0;b<=t;b++){let w=b/t;u.x=-e*Math.cos(i+w*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(i+w*r)*Math.sin(o+y*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),g.push(w+_,1-y),v.push(c++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){let y=h[p][v+1],_=h[p][v],b=h[p+1][v],w=h[p+1][v+1];(p!==0||o>0)&&d.push(y,_,w),(p!==n-1||l<Math.PI)&&d.push(_,b,w)}this.setIndex(d),this.setAttribute("position",new ot(m,3)),this.setAttribute("normal",new ot(x,3)),this.setAttribute("uv",new ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Fi=class s extends ht{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],l=[],c=[],h=new L,u=new L,f=new L;for(let d=0;d<=n;d++)for(let m=0;m<=i;m++){let x=m/i*r,g=d/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(x),u.y=(e+t*Math.cos(g))*Math.sin(x),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(m/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=i;m++){let x=(i+1)*d+m-1,g=(i+1)*(d-1)+m-1,p=(i+1)*(d-1)+m,v=(i+1)*d+m;o.push(x,g,v),o.push(g,p,v)}this.setIndex(o),this.setAttribute("position",new ot(a,3)),this.setAttribute("normal",new ot(l,3)),this.setAttribute("uv",new ot(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Vo=class extends Gt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ot=class extends sn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ic,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xn=class extends Ot{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ge(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return tt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Go=class extends sn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ic,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}};var xl=class extends sn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},_l=class extends sn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Qa(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function _0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function v0(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function yf(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function hp(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}var Oi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},vl=class extends Oi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Es,endingEnd:Es}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ts:r=e,a=2*t-n;break;case yo:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ts:o=e,l=2*n-t;break;case yo:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-t)/(i-t),x=m*m,g=x*m,p=-f*g+2*f*x-f*m,v=(1+f)*g+(-1.5-2*f)*x+(-.5+f)*m+1,y=(-1-d)*g+(1.5+d)*x+.5*m,_=d*g-d*x;for(let b=0;b!==a;++b)r[b]=p*o[h+b]+v*o[c+b]+y*o[l+b]+_*o[u+b];return r}},Wo=class extends Oi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*u+o[l+f]*h;return r}},yl=class extends Oi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},_n=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Qa(t,this.TimeBufferType),this.values=Qa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Qa(e.times,Array),values:Qa(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new yl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Wo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Rs:t=this.InterpolantFactoryMethodDiscrete;break;case Cs:t=this.InterpolantFactoryMethodLinear;break;case el:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Rs;case this.InterpolantFactoryMethodLinear:return Cs;case this.InterpolantFactoryMethodSmooth:return el}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&_0(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===el,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let u=a*n,f=u-n,d=u+n;for(let m=0;m!==n;++m){let x=t[u+m];if(x!==t[f+m]||x!==t[d+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};_n.prototype.ValueTypeName="";_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=Cs;var Bi=class extends _n{constructor(e,t,n){super(e,t,n)}};Bi.prototype.ValueTypeName="bool";Bi.prototype.ValueBufferType=Array;Bi.prototype.DefaultInterpolation=Rs;Bi.prototype.InterpolantFactoryMethodLinear=void 0;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Xo=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}};Xo.prototype.ValueTypeName="color";var vn=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}};vn.prototype.ValueTypeName="number";var Ml=class extends Oi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)Ct.slerpFlat(r,0,o,c-a,o,c,l);return r}},gi=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Ml(this.times,this.values,this.getValueSize(),e)}};gi.prototype.ValueTypeName="quaternion";gi.prototype.InterpolantFactoryMethodSmooth=void 0;var zi=class extends _n{constructor(e,t,n){super(e,t,n)}};zi.prototype.ValueTypeName="string";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=Rs;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var xi=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}};xi.prototype.ValueTypeName="vector";var ki=class{constructor(e="",t=-1,n=[],i=Cc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=kn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(M0(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(_n.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=v0(l);l=yf(l,1,h),c=yf(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new vn(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(r);if(h&&h.length>1){let u=h[1],f=i[u];f||(i[u]=f=[]),f.push(c)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,d,m,x){if(d.length!==0){let g=[],p=[];hp(d,g,p,m),g.length!==0&&x.push(new u(f,g,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let f=c[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},m;for(m=0;m<f.length;m++)if(f[m].morphTargets)for(let x=0;x<f[m].morphTargets.length;x++)d[f[m].morphTargets[x]]=-1;for(let x in d){let g=[],p=[];for(let v=0;v!==f[m].morphTargets.length;++v){let y=f[m];g.push(y.time),p.push(y.morphTarget===x?1:0)}i.push(new vn(".morphTargetInfluence["+x+"]",g,p))}l=d.length*o}else{let d=".bones["+t[u].name+"]";n(xi,d+".position",f,"pos",i),n(gi,d+".quaternion",f,"rot",i),n(xi,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function y0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return vn;case"vector":case"vector2":case"vector3":case"vector4":return xi;case"color":return Xo;case"quaternion":return gi;case"bool":case"boolean":return Bi;case"string":return zi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function M0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=y0(s.type);if(s.times===void 0){let t=[],n=[];hp(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var di={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},Sl=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],m=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},dp=new Sl,_i=class{constructor(e){this.manager=e!==void 0?e:dp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};_i.DEFAULT_MATERIAL_NAME="__DEFAULT";var Pi={},Wu=class extends Error{constructor(e,t){super(e),this.response=t}},Nr=class extends _i{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=di.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Pi[e]!==void 0){Pi[e].push({onLoad:t,onProgress:n,onError:i});return}Pi[e]=[],Pi[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Pi[e],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,m=d!==0,x=0,g=new ReadableStream({start(p){v();function v(){u.read().then(({done:y,value:_})=>{if(y)p.close();else{x+=_.byteLength;let b=new ProgressEvent("progress",{lengthComputable:m,loaded:x,total:d});for(let w=0,A=h.length;w<A;w++){let C=h[w];C.onProgress&&C.onProgress(b)}p.enqueue(_),v()}},y=>{p.error(y)})}}});return new Response(g)}else throw new Wu(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(m=>d.decode(m))}}}).then(c=>{di.add(`file:${e}`,c);let h=Pi[e];delete Pi[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{let h=Pi[e];if(h===void 0)throw this.manager.itemError(e),c;delete Pi[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Mr=new WeakMap,bl=class extends _i{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=di.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=Mr.get(o);u===void 0&&(u=[],Mr.set(o,u)),u.push({onLoad:t,onError:i})}return o}let a=Er("img");function l(){h(),t&&t(this);let u=Mr.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}Mr.delete(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),di.remove(`image:${e}`);let f=Mr.get(this)||[];for(let d=0;d<f.length;d++){let m=f[d];m.onError&&m.onError(u)}Mr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),di.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var Bs=class extends _i{constructor(e){super(e)}load(e,t,n,i){let r=new Tt,o=new bl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},zs=class extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},qo=class extends zs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Nu=new Ye,Mf=new L,Sf=new L,Yo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.mapType=ni,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ir,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Mf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mf),Sf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sf),t.updateMatrixWorld(),Nu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nu,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Nu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Xu=class extends Yo{constructor(){super(new Ht(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Is*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Zo=class extends zs{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Xu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},bf=new Ye,po=new L,Uu=new L,qu=class extends Yo{constructor(){super(new Ht(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ge(4,2),this._viewportCount=6,this._viewports=[new ct(2,1,1,1),new ct(0,1,1,1),new ct(3,1,1,1),new ct(1,1,1,1),new ct(3,0,1,1),new ct(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),po.setFromMatrixPosition(e.matrixWorld),n.position.copy(po),Uu.copy(n.position),Uu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Uu),n.updateMatrixWorld(),i.makeTranslation(-po.x,-po.y,-po.z),bf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bf,n.coordinateSystem,n.reversedDepth)}},vi=class extends zs{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new qu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Hi=class extends wo{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Yu=class extends Yo{constructor(){super(new Hi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ks=class extends zs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new Yu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Vi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Fu=new WeakMap,Ko=class extends _i{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=di.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{if(Fu.has(o)===!0)i&&i(Fu.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return di.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Fu.set(l,c),di.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});di.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var El=class extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},$o=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var Tl=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Ct.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let o=this._workIndex*r;Ct.multiplyQuaternionsFlat(e,o,e,t,e,n),Ct.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){let o=1-i;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*i}}},gh="\\[\\]\\.:\\/",S0=new RegExp("["+gh+"]","g"),xh="[^"+gh+"]",b0="[^"+gh.replace("\\.","")+"]",E0=/((?:WC+[\/:])*)/.source.replace("WC",xh),T0=/(WCOD+)?/.source.replace("WCOD",b0),w0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xh),A0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xh),R0=new RegExp("^"+E0+T0+w0+A0+"$"),C0=["material","materials","bones","map"],Zu=class{constructor(e,t,n){let i=n||_t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},_t=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(S0,"")}static parseTrackName(e){let t=R0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);C0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_t.Composite=Zu;_t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_t.prototype.GetterByBindingType=[_t.prototype._getValue_direct,_t.prototype._getValue_array,_t.prototype._getValue_arrayElement,_t.prototype._getValue_toArray];_t.prototype.SetterByBindingTypeAndVersioning=[[_t.prototype._setValue_direct,_t.prototype._setValue_direct_setNeedsUpdate,_t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_array,_t.prototype._setValue_array_setNeedsUpdate,_t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_arrayElement,_t.prototype._setValue_arrayElement_setNeedsUpdate,_t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_fromArray,_t.prototype._setValue_fromArray_setNeedsUpdate,_t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var wl=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Es,endingEnd:Es};for(let c=0;c!==o;++c){let h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Rc,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case qf:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Cc:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,o=n===Xf;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===Ac){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){let a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=Ts,i.endingEnd=Ts):(e?i.endingStart=this.zeroSlopeAtStart?Ts:Es:i.endingStart=yo,t?i.endingEnd=this.zeroSlopeAtEnd?Ts:Es:i.endingEnd=yo)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},I0=new Float32Array(1),Jo=class extends fi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){let f=i[u],d=f.name,m=h[d];if(m!==void 0)++m.referenceCount,o[u]=m;else{if(m=o[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,d));continue}let x=t&&t._propertyBindings[u].binding.parsedPath;m=new Tl(_t.create(n,d,x),f.ValueTypeName,f.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,d),o[u]=m}a[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Wo(new Float32Array(2),new Float32Array(2),1,I0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,o=typeof e=="string"?ki.findByName(i,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Cc),l!==void 0){let u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new wl(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?ki.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var Ef=new Ye,Hs=class{constructor(e,t,n=0,i=1/0){this.ray=new ns(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ar,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ef.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ef),this}intersectObject(e,t=!0,n=[]){return Ku(e,this,n,t),n.sort(Tf),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Ku(e[i],this,n,t);return n.sort(Tf),n}};function Tf(s,e){return s.distance-e.distance}function Ku(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Ku(r[o],e,t,!0)}}function _h(s,e,t,n){let i=P0(n);switch(t){case ah:return s*e;case Br:return s*e/i.components*i.byteLength;case $l:return s*e/i.components*i.byteLength;case ea:return s*e*2/i.components*i.byteLength;case Jl:return s*e*2/i.components*i.byteLength;case lh:return s*e*3/i.components*i.byteLength;case fn:return s*e*4/i.components*i.byteLength;case jl:return s*e*4/i.components*i.byteLength;case ta:case na:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ia:case sa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ec:case nc:return Math.max(s,16)*Math.max(e,8)/4;case Ql:case tc:return Math.max(s,8)*Math.max(e,8)/2;case ic:case sc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case rc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case oc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ac:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case lc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case cc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case uc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case hc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case dc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case fc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case pc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case mc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case gc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case xc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case _c:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case vc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case yc:case Mc:case Sc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case bc:case Ec:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Tc:case wc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function P0(s){switch(s){case ni:case ih:return{byteLength:1,components:1};case Or:case sh:case ii:return{byteLength:2,components:1};case Zl:case Kl:return{byteLength:2,components:4};case ls:case Yl:case yn:return{byteLength:4,components:1};case rh:case oh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Fp(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function D0(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){let m=u[f],x=u[d];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){let x=u[d];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var N0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,U0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,F0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,O0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,z0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,k0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,H0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,V0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,G0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,W0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,X0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,q0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Y0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Z0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,j0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Q0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ex=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ix=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,sx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ox=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ax=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ux="gl_FragColor = linearToOutputTexel( gl_FragColor );",hx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,fx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,px=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,xx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_x=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Sx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ex=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ax=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ix=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Px=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Lx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Dx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Nx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ux=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ox=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$x=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,jx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,n_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,i_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,s_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,r_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,o_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,a_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,l_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,c_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,u_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,h_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,d_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,f_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,p_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,m_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,g_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,x_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,__=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,v_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,y_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,M_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,S_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,b_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,E_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,T_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,w_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,A_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,R_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,C_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,I_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,P_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,L_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,D_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,N_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,k_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,H_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,V_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,G_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,W_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,q_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Y_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Z_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,j_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ev=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ov=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,av=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,hv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:N0,alphahash_pars_fragment:U0,alphamap_fragment:F0,alphamap_pars_fragment:O0,alphatest_fragment:B0,alphatest_pars_fragment:z0,aomap_fragment:k0,aomap_pars_fragment:H0,batching_pars_vertex:V0,batching_vertex:G0,begin_vertex:W0,beginnormal_vertex:X0,bsdfs:q0,iridescence_fragment:Y0,bumpmap_pars_fragment:Z0,clipping_planes_fragment:K0,clipping_planes_pars_fragment:$0,clipping_planes_pars_vertex:J0,clipping_planes_vertex:j0,color_fragment:Q0,color_pars_fragment:ex,color_pars_vertex:tx,color_vertex:nx,common:ix,cube_uv_reflection_fragment:sx,defaultnormal_vertex:rx,displacementmap_pars_vertex:ox,displacementmap_vertex:ax,emissivemap_fragment:lx,emissivemap_pars_fragment:cx,colorspace_fragment:ux,colorspace_pars_fragment:hx,envmap_fragment:dx,envmap_common_pars_fragment:fx,envmap_pars_fragment:px,envmap_pars_vertex:mx,envmap_physical_pars_fragment:wx,envmap_vertex:gx,fog_vertex:xx,fog_pars_vertex:_x,fog_fragment:vx,fog_pars_fragment:yx,gradientmap_pars_fragment:Mx,lightmap_pars_fragment:Sx,lights_lambert_fragment:bx,lights_lambert_pars_fragment:Ex,lights_pars_begin:Tx,lights_toon_fragment:Ax,lights_toon_pars_fragment:Rx,lights_phong_fragment:Cx,lights_phong_pars_fragment:Ix,lights_physical_fragment:Px,lights_physical_pars_fragment:Lx,lights_fragment_begin:Dx,lights_fragment_maps:Nx,lights_fragment_end:Ux,logdepthbuf_fragment:Fx,logdepthbuf_pars_fragment:Ox,logdepthbuf_pars_vertex:Bx,logdepthbuf_vertex:zx,map_fragment:kx,map_pars_fragment:Hx,map_particle_fragment:Vx,map_particle_pars_fragment:Gx,metalnessmap_fragment:Wx,metalnessmap_pars_fragment:Xx,morphinstance_vertex:qx,morphcolor_vertex:Yx,morphnormal_vertex:Zx,morphtarget_pars_vertex:Kx,morphtarget_vertex:$x,normal_fragment_begin:Jx,normal_fragment_maps:jx,normal_pars_fragment:Qx,normal_pars_vertex:e_,normal_vertex:t_,normalmap_pars_fragment:n_,clearcoat_normal_fragment_begin:i_,clearcoat_normal_fragment_maps:s_,clearcoat_pars_fragment:r_,iridescence_pars_fragment:o_,opaque_fragment:a_,packing:l_,premultiplied_alpha_fragment:c_,project_vertex:u_,dithering_fragment:h_,dithering_pars_fragment:d_,roughnessmap_fragment:f_,roughnessmap_pars_fragment:p_,shadowmap_pars_fragment:m_,shadowmap_pars_vertex:g_,shadowmap_vertex:x_,shadowmask_pars_fragment:__,skinbase_vertex:v_,skinning_pars_vertex:y_,skinning_vertex:M_,skinnormal_vertex:S_,specularmap_fragment:b_,specularmap_pars_fragment:E_,tonemapping_fragment:T_,tonemapping_pars_fragment:w_,transmission_fragment:A_,transmission_pars_fragment:R_,uv_pars_fragment:C_,uv_pars_vertex:I_,uv_vertex:P_,worldpos_vertex:L_,background_vert:D_,background_frag:N_,backgroundCube_vert:U_,backgroundCube_frag:F_,cube_vert:O_,cube_frag:B_,depth_vert:z_,depth_frag:k_,distanceRGBA_vert:H_,distanceRGBA_frag:V_,equirect_vert:G_,equirect_frag:W_,linedashed_vert:X_,linedashed_frag:q_,meshbasic_vert:Y_,meshbasic_frag:Z_,meshlambert_vert:K_,meshlambert_frag:$_,meshmatcap_vert:J_,meshmatcap_frag:j_,meshnormal_vert:Q_,meshnormal_frag:ev,meshphong_vert:tv,meshphong_frag:nv,meshphysical_vert:iv,meshphysical_frag:sv,meshtoon_vert:rv,meshtoon_frag:ov,points_vert:av,points_frag:lv,shadow_vert:cv,shadow_frag:uv,sprite_vert:hv,sprite_frag:dv},Ie={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Mi={basic:{uniforms:rn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:rn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Ve(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:rn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:rn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:rn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new Ve(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:rn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:rn([Ie.points,Ie.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:rn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:rn([Ie.common,Ie.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:rn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:rn([Ie.sprite,Ie.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:rn([Ie.common,Ie.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:rn([Ie.lights,Ie.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};Mi.physical={uniforms:rn([Mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};var Pc={r:0,b:0,g:0},qs=new Cn,fv=new Ye;function pv(s,e,t,n,i,r,o){let a=new Ve(0),l=r===!0?0:1,c,h,u=null,f=0,d=null;function m(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?t:e).get(_)),_}function x(y){let _=!1,b=m(y);b===null?p(a,l):b&&b.isColor&&(p(b,1),_=!0);let w=s.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(y,_){let b=m(_);b&&(b.isCubeTexture||b.mapping===Qo)?(h===void 0&&(h=new Je(new Kt(1,1,1),new Gt({name:"BackgroundCubeMaterial",uniforms:Xs(Mi.backgroundCube.uniforms),vertexShader:Mi.backgroundCube.vertexShader,fragmentShader:Mi.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),qs.copy(_.backgroundRotation),qs.x*=-1,qs.y*=-1,qs.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(qs.y*=-1,qs.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(fv.makeRotationFromEuler(qs)),h.material.toneMapped=nt.getTransfer(b.colorSpace)!==ut,(u!==b||f!==b.version||d!==s.toneMapping)&&(h.material.needsUpdate=!0,u=b,f=b.version,d=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Je(new Ft(2,2),new Gt({name:"BackgroundMaterial",uniforms:Xs(Mi.background.uniforms),vertexShader:Mi.background.vertexShader,fragmentShader:Mi.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=nt.getTransfer(b.colorSpace)!==ut,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,d=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,_){y.getRGB(Pc,ph(s)),n.buffers.color.setClear(Pc.r,Pc.g,Pc.b,_,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:x,addToRenderList:g,dispose:v}}function mv(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null),r=i,o=!1;function a(M,P,N,B,k){let U=!1,D=u(B,N,P);r!==D&&(r=D,c(r.object)),U=d(M,B,N,k),U&&m(M,B,N,k),k!==null&&e.update(k,s.ELEMENT_ARRAY_BUFFER),(U||o)&&(o=!1,_(M,P,N,B),k!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,P,N){let B=N.wireframe===!0,k=n[M.id];k===void 0&&(k={},n[M.id]=k);let U=k[P.id];U===void 0&&(U={},k[P.id]=U);let D=U[B];return D===void 0&&(D=f(l()),U[B]=D),D}function f(M){let P=[],N=[],B=[];for(let k=0;k<t;k++)P[k]=0,N[k]=0,B[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:N,attributeDivisors:B,object:M,attributes:{},index:null}}function d(M,P,N,B){let k=r.attributes,U=P.attributes,D=0,H=N.getAttributes();for(let z in H)if(H[z].location>=0){let $=k[z],fe=U[z];if(fe===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(fe=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(fe=M.instanceColor)),$===void 0||$.attribute!==fe||fe&&$.data!==fe.data)return!0;D++}return r.attributesNum!==D||r.index!==B}function m(M,P,N,B){let k={},U=P.attributes,D=0,H=N.getAttributes();for(let z in H)if(H[z].location>=0){let $=U[z];$===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&($=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&($=M.instanceColor));let fe={};fe.attribute=$,$&&$.data&&(fe.data=$.data),k[z]=fe,D++}r.attributes=k,r.attributesNum=D,r.index=B}function x(){let M=r.newAttributes;for(let P=0,N=M.length;P<N;P++)M[P]=0}function g(M){p(M,0)}function p(M,P){let N=r.newAttributes,B=r.enabledAttributes,k=r.attributeDivisors;N[M]=1,B[M]===0&&(s.enableVertexAttribArray(M),B[M]=1),k[M]!==P&&(s.vertexAttribDivisor(M,P),k[M]=P)}function v(){let M=r.newAttributes,P=r.enabledAttributes;for(let N=0,B=P.length;N<B;N++)P[N]!==M[N]&&(s.disableVertexAttribArray(N),P[N]=0)}function y(M,P,N,B,k,U,D){D===!0?s.vertexAttribIPointer(M,P,N,k,U):s.vertexAttribPointer(M,P,N,B,k,U)}function _(M,P,N,B){x();let k=B.attributes,U=N.getAttributes(),D=P.defaultAttributeValues;for(let H in U){let z=U[H];if(z.location>=0){let Y=k[H];if(Y===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(Y=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(Y=M.instanceColor)),Y!==void 0){let $=Y.normalized,fe=Y.itemSize,ve=e.get(Y);if(ve===void 0)continue;let we=ve.buffer,Ce=ve.type,Me=ve.bytesPerElement,te=Ce===s.INT||Ce===s.UNSIGNED_INT||Y.gpuType===Yl;if(Y.isInterleavedBufferAttribute){let ie=Y.data,Ae=ie.stride,Re=Y.offset;if(ie.isInstancedInterleavedBuffer){for(let ae=0;ae<z.locationSize;ae++)p(z.location+ae,ie.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ae=0;ae<z.locationSize;ae++)g(z.location+ae);s.bindBuffer(s.ARRAY_BUFFER,we);for(let ae=0;ae<z.locationSize;ae++)y(z.location+ae,fe/z.locationSize,Ce,$,Ae*Me,(Re+fe/z.locationSize*ae)*Me,te)}else{if(Y.isInstancedBufferAttribute){for(let ie=0;ie<z.locationSize;ie++)p(z.location+ie,Y.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ie=0;ie<z.locationSize;ie++)g(z.location+ie);s.bindBuffer(s.ARRAY_BUFFER,we);for(let ie=0;ie<z.locationSize;ie++)y(z.location+ie,fe/z.locationSize,Ce,$,fe*Me,fe/z.locationSize*ie*Me,te)}}else if(D!==void 0){let $=D[H];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(z.location,$);break;case 3:s.vertexAttrib3fv(z.location,$);break;case 4:s.vertexAttrib4fv(z.location,$);break;default:s.vertexAttrib1fv(z.location,$)}}}}v()}function b(){C();for(let M in n){let P=n[M];for(let N in P){let B=P[N];for(let k in B)h(B[k].object),delete B[k];delete P[N]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;let P=n[M.id];for(let N in P){let B=P[N];for(let k in B)h(B[k].object),delete B[k];delete P[N]}delete n[M.id]}function A(M){for(let P in n){let N=n[P];if(N[M.id]===void 0)continue;let B=N[M.id];for(let k in B)h(B[k].object),delete B[k];delete N[M.id]}}function C(){E(),o=!0,r!==i&&(r=i,c(r.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:E,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function gv(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];t.update(d,n,1)}function l(c,h,u,f){if(u===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<c.length;m++)o(c[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*f[x];t.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function xv(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==fn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let C=A===ii&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==ni&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==yn&&!C)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),b=m>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:b,maxSamples:w}}function _v(s){let e=this,t=null,n=0,i=!1,r=!1,o=new Bn,a=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?h(null):c();else{let v=r?0:n,y=v*4,_=p.clippingState||null;l.value=_,_=h(m,f,y,d);for(let b=0;b!==y;++b)_[b]=t[b];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,m){let x=u!==null?u.length:0,g=null;if(x!==0){if(g=l.value,m!==!0||g===null){let p=d+x*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,_=d;y!==x;++y,_+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(g,_),g[_+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function vv(s){let e=new WeakMap;function t(o,a){return a===Wl?o.mapping=Vs:a===Xl&&(o.mapping=Gs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Wl||a===Xl)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new ll(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Hr=4,fp=[.125,.215,.35,.446,.526,.582],Ks=20,vh=new Hi,pp=new Ve,yh=null,Mh=0,Sh=0,bh=!1,Zs=(1+Math.sqrt(5))/2,kr=1/Zs,mp=[new L(-Zs,kr,0),new L(Zs,kr,0),new L(-kr,0,Zs),new L(kr,0,Zs),new L(0,Zs,-kr),new L(0,Zs,kr),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],yv=new L,Nc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=yv}=r;yh=this._renderer.getRenderTarget(),Mh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_p(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(yh,Mh,Sh),this._renderer.xr.enabled=bh,e.scissorTest=!1,Lc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vs||e.mapping===Gs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yh=this._renderer.getRenderTarget(),Mh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:ii,format:fn,colorSpace:Qt,depthBuffer:!1},i=gp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gp(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Mv(r)),this._blurMaterial=Sv(r,e,t)}return i}_compileMaterial(e){let t=new Je(this._lodPlanes[0],e);this._renderer.compile(t,vh)}_sceneToCubeUV(e,t,n,i,r){let l=new Ht(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(pp),u.toneMapping=Gi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));let x=new mt({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),g=new Je(new Kt,x),p=!1,v=e.background;v?v.isColor&&(x.color.copy(v),e.background=null,p=!0):(x.color.copy(pp),p=!0);for(let y=0;y<6;y++){let _=y%3;_===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):_===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));let b=this._cubeSize;Lc(i,_*b,y>2?b:0,b,b),u.setRenderTarget(i),p&&u.render(g,l),u.render(e,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=f,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Vs||e.mapping===Gs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=_p()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xp());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Je(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Lc(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,vh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=mp[(i-r-1)%mp.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Je(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ks-1),x=r/m,g=isFinite(r)?1+Math.floor(h*x):Ks;g>Ks&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ks}`);let p=[],v=0;for(let A=0;A<Ks;++A){let C=A/x,E=Math.exp(-C*C/2);p.push(E),A===0?v+=E:A<g&&(v+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:y}=this;f.dTheta.value=m,f.mipInt.value=y-n;let _=this._sizeLods[i],b=3*_*(i>y-Hr?i-y+Hr:0),w=4*(this._cubeSize-_);Lc(t,b,w,3*_,2*_),l.setRenderTarget(t),l.render(u,vh)}};function Mv(s){let e=[],t=[],n=[],i=s,r=s-Hr+1+fp.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let l=1/a;o>s-Hr?l=fp[o-s+Hr-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,x=3,g=2,p=1,v=new Float32Array(x*m*d),y=new Float32Array(g*m*d),_=new Float32Array(p*m*d);for(let w=0;w<d;w++){let A=w%3*2/3-1,C=w>2?0:-1,E=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];v.set(E,x*m*w),y.set(f,g*m*w);let M=[w,w,w,w,w,w];_.set(M,p*m*w)}let b=new ht;b.setAttribute("position",new ft(v,x)),b.setAttribute("uv",new ft(y,g)),b.setAttribute("faceIndex",new ft(_,p)),e.push(b),i>Hr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function gp(s,e,t){let n=new hn(s,e,t);return n.texture.mapping=Qo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Lc(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Sv(s,e,t){let n=new Float32Array(Ks),i=new L(0,1,0);return new Gt({name:"SphericalGaussianBlur",defines:{n:Ks,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Dh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$t,depthTest:!1,depthWrite:!1})}function xp(){return new Gt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$t,depthTest:!1,depthWrite:!1})}function _p(){return new Gt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$t,depthTest:!1,depthWrite:!1})}function Dh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bv(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Wl||l===Xl,h=l===Vs||l===Gs;if(c||h){let u=e.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Nc(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return c&&d&&d.height>0||h&&d&&i(d)?(t===null&&(t=new Nc(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Ev(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Tr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Tv(s,e,t,n){let i={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete i[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(u){let f=u.attributes;for(let d in f)e.update(f[d],s.ARRAY_BUFFER)}function c(u){let f=[],d=u.index,m=u.attributes.position,x=0;if(d!==null){let v=d.array;x=d.version;for(let y=0,_=v.length;y<_;y+=3){let b=v[y+0],w=v[y+1],A=v[y+2];f.push(b,w,w,A,A,b)}}else if(m!==void 0){let v=m.array;x=m.version;for(let y=0,_=v.length/3-1;y<_;y+=3){let b=y+0,w=y+1,A=y+2;f.push(b,w,w,A,A,b)}}else return;let g=new(fh(f)?To:Eo)(f,1);g.version=x;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function wv(s,e,t){let n;function i(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*o),t.update(d,n,1)}function c(f,d,m){m!==0&&(s.drawElementsInstanced(n,d,r,f*o,m),t.update(d,n,m))}function h(f,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];t.update(g,n,1)}function u(f,d,m,x){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,m);let p=0;for(let v=0;v<m;v++)p+=d[v]*x[v];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Av(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Rv(s,e,t){let n=new WeakMap,i=new ct;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let E=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],y=0;d===!0&&(y=1),m===!0&&(y=2),x===!0&&(y=3);let _=a.attributes.position.count*y,b=1;_>e.maxTextureSize&&(b=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let w=new Float32Array(_*b*4*u),A=new bo(w,_,b,u);A.type=yn,A.needsUpdate=!0;let C=y*4;for(let M=0;M<u;M++){let P=g[M],N=p[M],B=v[M],k=_*b*4*M;for(let U=0;U<P.count;U++){let D=U*C;d===!0&&(i.fromBufferAttribute(P,U),w[k+D+0]=i.x,w[k+D+1]=i.y,w[k+D+2]=i.z,w[k+D+3]=0),m===!0&&(i.fromBufferAttribute(N,U),w[k+D+4]=i.x,w[k+D+5]=i.y,w[k+D+6]=i.z,w[k+D+7]=0),x===!0&&(i.fromBufferAttribute(B,U),w[k+D+8]=i.x,w[k+D+9]=i.y,w[k+D+10]=i.z,w[k+D+11]=B.itemSize===4?i.w:1)}}f={count:u,texture:A,size:new ge(_,b)},n.set(a,f),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let d=0;for(let x=0;x<c.length;x++)d+=c[x];let m=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Cv(s,e,t,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var Op=new Tt,vp=new Ns(1,1),Bp=new bo,zp=new ol,kp=new Ao,yp=[],Mp=[],Sp=new Float32Array(16),bp=new Float32Array(9),Ep=new Float32Array(4);function Gr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=yp[i];if(r===void 0&&(r=new Float32Array(i),yp[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function qt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Yt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Fc(s,e){let t=Mp[e];t===void 0&&(t=new Int32Array(e),Mp[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Iv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Pv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2fv(this.addr,e),Yt(t,e)}}function Lv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(qt(t,e))return;s.uniform3fv(this.addr,e),Yt(t,e)}}function Dv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4fv(this.addr,e),Yt(t,e)}}function Nv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;Ep.set(n),s.uniformMatrix2fv(this.addr,!1,Ep),Yt(t,n)}}function Uv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;bp.set(n),s.uniformMatrix3fv(this.addr,!1,bp),Yt(t,n)}}function Fv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,n))return;Sp.set(n),s.uniformMatrix4fv(this.addr,!1,Sp),Yt(t,n)}}function Ov(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Bv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2iv(this.addr,e),Yt(t,e)}}function zv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;s.uniform3iv(this.addr,e),Yt(t,e)}}function kv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4iv(this.addr,e),Yt(t,e)}}function Hv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Vv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2uiv(this.addr,e),Yt(t,e)}}function Gv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;s.uniform3uiv(this.addr,e),Yt(t,e)}}function Wv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4uiv(this.addr,e),Yt(t,e)}}function Xv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(vp.compareFunction=uh,r=vp):r=Op,t.setTexture2D(e||r,i)}function qv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||zp,i)}function Yv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||kp,i)}function Zv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Bp,i)}function Kv(s){switch(s){case 5126:return Iv;case 35664:return Pv;case 35665:return Lv;case 35666:return Dv;case 35674:return Nv;case 35675:return Uv;case 35676:return Fv;case 5124:case 35670:return Ov;case 35667:case 35671:return Bv;case 35668:case 35672:return zv;case 35669:case 35673:return kv;case 5125:return Hv;case 36294:return Vv;case 36295:return Gv;case 36296:return Wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Xv;case 35679:case 36299:case 36307:return qv;case 35680:case 36300:case 36308:case 36293:return Yv;case 36289:case 36303:case 36311:case 36292:return Zv}}function $v(s,e){s.uniform1fv(this.addr,e)}function Jv(s,e){let t=Gr(e,this.size,2);s.uniform2fv(this.addr,t)}function jv(s,e){let t=Gr(e,this.size,3);s.uniform3fv(this.addr,t)}function Qv(s,e){let t=Gr(e,this.size,4);s.uniform4fv(this.addr,t)}function ey(s,e){let t=Gr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function ty(s,e){let t=Gr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function ny(s,e){let t=Gr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function iy(s,e){s.uniform1iv(this.addr,e)}function sy(s,e){s.uniform2iv(this.addr,e)}function ry(s,e){s.uniform3iv(this.addr,e)}function oy(s,e){s.uniform4iv(this.addr,e)}function ay(s,e){s.uniform1uiv(this.addr,e)}function ly(s,e){s.uniform2uiv(this.addr,e)}function cy(s,e){s.uniform3uiv(this.addr,e)}function uy(s,e){s.uniform4uiv(this.addr,e)}function hy(s,e,t){let n=this.cache,i=e.length,r=Fc(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Yt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Op,r[o])}function dy(s,e,t){let n=this.cache,i=e.length,r=Fc(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Yt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||zp,r[o])}function fy(s,e,t){let n=this.cache,i=e.length,r=Fc(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Yt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||kp,r[o])}function py(s,e,t){let n=this.cache,i=e.length,r=Fc(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Yt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Bp,r[o])}function my(s){switch(s){case 5126:return $v;case 35664:return Jv;case 35665:return jv;case 35666:return Qv;case 35674:return ey;case 35675:return ty;case 35676:return ny;case 5124:case 35670:return iy;case 35667:case 35671:return sy;case 35668:case 35672:return ry;case 35669:case 35673:return oy;case 5125:return ay;case 36294:return ly;case 36295:return cy;case 36296:return uy;case 35678:case 36198:case 36298:case 36306:case 35682:return hy;case 35679:case 36299:case 36307:return dy;case 35680:case 36300:case 36308:case 36293:return fy;case 36289:case 36303:case 36311:case 36292:return py}}var Th=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Kv(t.type)}},wh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=my(t.type)}},Ah=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},Eh=/(\w+)(\])?(\[|\.)?/g;function Tp(s,e){s.seq.push(e),s.map[e.id]=e}function gy(s,e,t){let n=s.name,i=n.length;for(Eh.lastIndex=0;;){let r=Eh.exec(n),o=Eh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Tp(t,c===void 0?new Th(a,s,e):new wh(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new Ah(a),Tp(t,u)),t=u}}}var Vr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);gy(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function wp(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var xy=37297,_y=0;function vy(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Ap=new je;function yy(s){nt._getMatrix(Ap,nt.workingColorSpace,s);let e=`mat3( ${Ap.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(s)){case Mo:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Rp(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+vy(s.getShaderSource(e),a)}else return r}function My(s,e){let t=yy(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Sy(s,e){let t;switch(e){case Bl:t="Linear";break;case zl:t="Reinhard";break;case kl:t="Cineon";break;case Ur:t="ACESFilmic";break;case Vl:t="AgX";break;case Gl:t="Neutral";break;case Hl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Dc=new L;function by(){nt.getLuminanceCoefficients(Dc);let s=Dc.x.toFixed(4),e=Dc.y.toFixed(4),t=Dc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ey(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(oa).join(`
`)}function Ty(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function wy(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function oa(s){return s!==""}function Cp(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ip(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Ay=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rh(s){return s.replace(Ay,Cy)}var Ry=new Map;function Cy(s,e){let t=et[e];if(t===void 0){let n=Ry.get(e);if(n!==void 0)t=et[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Rh(t)}var Iy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pp(s){return s.replace(Iy,Py)}function Py(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Lp(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ly(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ju?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Al?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===yi&&(e="SHADOWMAP_TYPE_VSM"),e}function Dy(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Vs:case Gs:e="ENVMAP_TYPE_CUBE";break;case Qo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ny(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Gs:e="ENVMAP_MODE_REFRACTION";break}return e}function Uy(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case th:e="ENVMAP_BLENDING_MULTIPLY";break;case Vf:e="ENVMAP_BLENDING_MIX";break;case Gf:e="ENVMAP_BLENDING_ADD";break}return e}function Fy(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Oy(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Ly(t),c=Dy(t),h=Ny(t),u=Uy(t),f=Fy(t),d=Ey(t),m=Ty(r),x=i.createProgram(),g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(oa).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(oa).join(`
`),p.length>0&&(p+=`
`)):(g=[Lp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(oa).join(`
`),p=[Lp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gi?"#define TONE_MAPPING":"",t.toneMapping!==Gi?et.tonemapping_pars_fragment:"",t.toneMapping!==Gi?Sy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,My("linearToOutputTexel",t.outputColorSpace),by(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(oa).join(`
`)),o=Rh(o),o=Cp(o,t),o=Ip(o,t),a=Rh(a),a=Cp(a,t),a=Ip(a,t),o=Pp(o),a=Pp(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===hh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=v+g+o,_=v+p+a,b=wp(i,i.VERTEX_SHADER,y),w=wp(i,i.FRAGMENT_SHADER,_);i.attachShader(x,b),i.attachShader(x,w),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function A(P){if(s.debug.checkShaderErrors){let N=i.getProgramInfoLog(x)||"",B=i.getShaderInfoLog(b)||"",k=i.getShaderInfoLog(w)||"",U=N.trim(),D=B.trim(),H=k.trim(),z=!0,Y=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,b,w);else{let $=Rp(i,b,"vertex"),fe=Rp(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+$+`
`+fe)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(D===""||H==="")&&(Y=!1);Y&&(P.diagnostics={runnable:z,programLog:U,vertexShader:{log:D,prefix:g},fragmentShader:{log:H,prefix:p}})}i.deleteShader(b),i.deleteShader(w),C=new Vr(i,x),E=wy(i,x)}let C;this.getUniforms=function(){return C===void 0&&A(this),C};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,xy)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_y++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=w,this}var By=0,Ch=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ih(e),t.set(e,n)),n}},Ih=class{constructor(e){this.id=By++,this.code=e,this.usedTimes=0}};function zy(s,e,t,n,i,r,o){let a=new Ar,l=new Ch,c=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures,d=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return c.add(E),E===0?"uv":`uv${E}`}function g(E,M,P,N,B){let k=N.fog,U=B.geometry,D=E.isMeshStandardMaterial?N.environment:null,H=(E.isMeshStandardMaterial?t:e).get(E.envMap||D),z=H&&H.mapping===Qo?H.image.height:null,Y=m[E.type];E.precision!==null&&(d=i.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));let $=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,fe=$!==void 0?$.length:0,ve=0;U.morphAttributes.position!==void 0&&(ve=1),U.morphAttributes.normal!==void 0&&(ve=2),U.morphAttributes.color!==void 0&&(ve=3);let we,Ce,Me,te;if(Y){let at=Mi[Y];we=at.vertexShader,Ce=at.fragmentShader}else we=E.vertexShader,Ce=E.fragmentShader,l.update(E),Me=l.getVertexShaderID(E),te=l.getFragmentShaderID(E);let ie=s.getRenderTarget(),Ae=s.state.buffers.depth.getReversed(),Re=B.isInstancedMesh===!0,ae=B.isBatchedMesh===!0,Te=!!E.map,Z=!!E.matcap,T=!!H,O=!!E.aoMap,W=!!E.lightMap,G=!!E.bumpMap,J=!!E.normalMap,se=!!E.displacementMap,ce=!!E.emissiveMap,pe=!!E.metalnessMap,Oe=!!E.roughnessMap,ke=E.anisotropy>0,I=E.clearcoat>0,S=E.dispersion>0,V=E.iridescence>0,j=E.sheen>0,re=E.transmission>0,Q=ke&&!!E.anisotropyMap,Pe=I&&!!E.clearcoatMap,be=I&&!!E.clearcoatNormalMap,Ne=I&&!!E.clearcoatRoughnessMap,ze=V&&!!E.iridescenceMap,Se=V&&!!E.iridescenceThicknessMap,X=j&&!!E.sheenColorMap,he=j&&!!E.sheenRoughnessMap,_e=!!E.specularMap,le=!!E.specularColorMap,ye=!!E.specularIntensityMap,F=re&&!!E.transmissionMap,oe=re&&!!E.thicknessMap,me=!!E.gradientMap,Le=!!E.alphaMap,xe=E.alphaTest>0,ue=!!E.alphaHash,Fe=!!E.extensions,Ge=Gi;E.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ge=s.toneMapping);let st={shaderID:Y,shaderType:E.type,shaderName:E.name,vertexShader:we,fragmentShader:Ce,defines:E.defines,customVertexShaderID:Me,customFragmentShaderID:te,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:ae,batchingColor:ae&&B._colorsTexture!==null,instancing:Re,instancingColor:Re&&B.instanceColor!==null,instancingMorph:Re&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ie===null?s.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Qt,alphaToCoverage:!!E.alphaToCoverage,map:Te,matcap:Z,envMap:T,envMapMode:T&&H.mapping,envMapCubeUVHeight:z,aoMap:O,lightMap:W,bumpMap:G,normalMap:J,displacementMap:f&&se,emissiveMap:ce,normalMapObjectSpace:J&&E.normalMapType===Kf,normalMapTangentSpace:J&&E.normalMapType===Ic,metalnessMap:pe,roughnessMap:Oe,anisotropy:ke,anisotropyMap:Q,clearcoat:I,clearcoatMap:Pe,clearcoatNormalMap:be,clearcoatRoughnessMap:Ne,dispersion:S,iridescence:V,iridescenceMap:ze,iridescenceThicknessMap:Se,sheen:j,sheenColorMap:X,sheenRoughnessMap:he,specularMap:_e,specularColorMap:le,specularIntensityMap:ye,transmission:re,transmissionMap:F,thicknessMap:oe,gradientMap:me,opaque:E.transparent===!1&&E.blending===ws&&E.alphaToCoverage===!1,alphaMap:Le,alphaTest:xe,alphaHash:ue,combine:E.combine,mapUv:Te&&x(E.map.channel),aoMapUv:O&&x(E.aoMap.channel),lightMapUv:W&&x(E.lightMap.channel),bumpMapUv:G&&x(E.bumpMap.channel),normalMapUv:J&&x(E.normalMap.channel),displacementMapUv:se&&x(E.displacementMap.channel),emissiveMapUv:ce&&x(E.emissiveMap.channel),metalnessMapUv:pe&&x(E.metalnessMap.channel),roughnessMapUv:Oe&&x(E.roughnessMap.channel),anisotropyMapUv:Q&&x(E.anisotropyMap.channel),clearcoatMapUv:Pe&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:be&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ze&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:Se&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:X&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:he&&x(E.sheenRoughnessMap.channel),specularMapUv:_e&&x(E.specularMap.channel),specularColorMapUv:le&&x(E.specularColorMap.channel),specularIntensityMapUv:ye&&x(E.specularIntensityMap.channel),transmissionMapUv:F&&x(E.transmissionMap.channel),thicknessMapUv:oe&&x(E.thicknessMap.channel),alphaMapUv:Le&&x(E.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(J||ke),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!U.attributes.uv&&(Te||Le),fog:!!k,useFog:E.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ae,skinning:B.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:ve,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ge,decodeVideoTexture:Te&&E.map.isVideoTexture===!0&&nt.getTransfer(E.map.colorSpace)===ut,decodeVideoTextureEmissive:ce&&E.emissiveMap.isVideoTexture===!0&&nt.getTransfer(E.emissiveMap.colorSpace)===ut,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===St,flipSided:E.side===Xt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Fe&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&E.extensions.multiDraw===!0||ae)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function p(E){let M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(let P in E.defines)M.push(P),M.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(v(M,E),y(M,E),M.push(s.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function v(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function y(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),E.push(a.mask)}function _(E){let M=m[E.type],P;if(M){let N=Mi[M];P=ri.clone(N.uniforms)}else P=E.uniforms;return P}function b(E,M){let P;for(let N=0,B=h.length;N<B;N++){let k=h[N];if(k.cacheKey===M){P=k,++P.usedTimes;break}}return P===void 0&&(P=new Oy(s,M,E,r),h.push(P)),P}function w(E){if(--E.usedTimes===0){let M=h.indexOf(E);h[M]=h[h.length-1],h.pop(),E.destroy()}}function A(E){l.remove(E)}function C(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:b,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:C}}function ky(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Hy(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Dp(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Np(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,f,d,m,x,g){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},s[e]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),e++,p}function a(u,f,d,m,x,g){let p=o(u,f,d,m,x,g);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function l(u,f,d,m,x,g){let p=o(u,f,d,m,x,g);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,f){t.length>1&&t.sort(u||Hy),n.length>1&&n.sort(f||Dp),i.length>1&&i.sort(f||Dp)}function h(){for(let u=e,f=s.length;u<f;u++){let d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Vy(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new Np,s.set(n,[o])):i>=r.length?(o=new Np,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Gy(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ve};break;case"SpotLight":t={position:new L,direction:new L,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new L,halfWidth:new L,halfHeight:new L};break}return s[e.id]=t,t}}}function Wy(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Xy=0;function qy(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Yy(s){let e=new Gy,t=Wy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let i=new L,r=new Ye,o=new Ye;function a(c){let h=0,u=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let d=0,m=0,x=0,g=0,p=0,v=0,y=0,_=0,b=0,w=0,A=0;c.sort(qy);for(let E=0,M=c.length;E<M;E++){let P=c[E],N=P.color,B=P.intensity,k=P.distance,U=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=N.r*B,u+=N.g*B,f+=N.b*B;else if(P.isLightProbe){for(let D=0;D<9;D++)n.probe[D].addScaledVector(P.sh.coefficients[D],B);A++}else if(P.isDirectionalLight){let D=e.get(P);if(D.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let H=P.shadow,z=t.get(P);z.shadowIntensity=H.intensity,z.shadowBias=H.bias,z.shadowNormalBias=H.normalBias,z.shadowRadius=H.radius,z.shadowMapSize=H.mapSize,n.directionalShadow[d]=z,n.directionalShadowMap[d]=U,n.directionalShadowMatrix[d]=P.shadow.matrix,v++}n.directional[d]=D,d++}else if(P.isSpotLight){let D=e.get(P);D.position.setFromMatrixPosition(P.matrixWorld),D.color.copy(N).multiplyScalar(B),D.distance=k,D.coneCos=Math.cos(P.angle),D.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),D.decay=P.decay,n.spot[x]=D;let H=P.shadow;if(P.map&&(n.spotLightMap[b]=P.map,b++,H.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[x]=H.matrix,P.castShadow){let z=t.get(P);z.shadowIntensity=H.intensity,z.shadowBias=H.bias,z.shadowNormalBias=H.normalBias,z.shadowRadius=H.radius,z.shadowMapSize=H.mapSize,n.spotShadow[x]=z,n.spotShadowMap[x]=U,_++}x++}else if(P.isRectAreaLight){let D=e.get(P);D.color.copy(N).multiplyScalar(B),D.halfWidth.set(P.width*.5,0,0),D.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=D,g++}else if(P.isPointLight){let D=e.get(P);if(D.color.copy(P.color).multiplyScalar(P.intensity),D.distance=P.distance,D.decay=P.decay,P.castShadow){let H=P.shadow,z=t.get(P);z.shadowIntensity=H.intensity,z.shadowBias=H.bias,z.shadowNormalBias=H.normalBias,z.shadowRadius=H.radius,z.shadowMapSize=H.mapSize,z.shadowCameraNear=H.camera.near,z.shadowCameraFar=H.camera.far,n.pointShadow[m]=z,n.pointShadowMap[m]=U,n.pointShadowMatrix[m]=P.shadow.matrix,y++}n.point[m]=D,m++}else if(P.isHemisphereLight){let D=e.get(P);D.skyColor.copy(P.color).multiplyScalar(B),D.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[p]=D,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let C=n.hash;(C.directionalLength!==d||C.pointLength!==m||C.spotLength!==x||C.rectAreaLength!==g||C.hemiLength!==p||C.numDirectionalShadows!==v||C.numPointShadows!==y||C.numSpotShadows!==_||C.numSpotMaps!==b||C.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+b-w,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,C.directionalLength=d,C.pointLength=m,C.spotLength=x,C.rectAreaLength=g,C.hemiLength=p,C.numDirectionalShadows=v,C.numPointShadows=y,C.numSpotShadows=_,C.numSpotMaps=b,C.numLightProbes=A,n.version=Xy++)}function l(c,h){let u=0,f=0,d=0,m=0,x=0,g=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){let y=c[p];if(y.isDirectionalLight){let _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),u++}else if(y.isSpotLight){let _=n.spot[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),d++}else if(y.isRectAreaLight){let _=n.rectArea[m];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){let _=n.point[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),f++}else if(y.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:n}}function Up(s){let e=new Yy(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Zy(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new Up(s),e.set(i,[a])):r>=o.length?(a=new Up(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Ky=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$y=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Jy(s,e,t){let n=new Ir,i=new ge,r=new ge,o=new ct,a=new xl({depthPacking:Zf}),l=new _l,c={},h=t.maxTextureSize,u={[Qn]:Xt,[Xt]:Qn,[St]:St},f=new Gt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:Ky,fragmentShader:$y}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let m=new ht;m.setAttribute("position",new ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Je(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ju;let p=this.type;this.render=function(w,A,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;let E=s.getRenderTarget(),M=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),N=s.state;N.setBlending($t),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let B=p!==yi&&this.type===yi,k=p===yi&&this.type!==yi;for(let U=0,D=w.length;U<D;U++){let H=w[U],z=H.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);let Y=z.getFrameExtents();if(i.multiply(Y),r.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Y.x),i.x=r.x*Y.x,z.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Y.y),i.y=r.y*Y.y,z.mapSize.y=r.y)),z.map===null||B===!0||k===!0){let fe=this.type!==yi?{minFilter:Vt,magFilter:Vt}:{};z.map!==null&&z.map.dispose(),z.map=new hn(i.x,i.y,fe),z.map.texture.name=H.name+".shadowMap",z.camera.updateProjectionMatrix()}s.setRenderTarget(z.map),s.clear();let $=z.getViewportCount();for(let fe=0;fe<$;fe++){let ve=z.getViewport(fe);o.set(r.x*ve.x,r.y*ve.y,r.x*ve.z,r.y*ve.w),N.viewport(o),z.updateMatrices(H,fe),n=z.getFrustum(),_(A,C,z.camera,H,this.type)}z.isPointLightShadow!==!0&&this.type===yi&&v(z,C),z.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(E,M,P)};function v(w,A){let C=e.update(x);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new hn(i.x,i.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(A,null,C,f,x,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(A,null,C,d,x,null)}function y(w,A,C,E){let M=null,P=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)M=P;else if(M=C.isPointLight===!0?l:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let N=M.uuid,B=A.uuid,k=c[N];k===void 0&&(k={},c[N]=k);let U=k[B];U===void 0&&(U=M.clone(),k[B]=U,A.addEventListener("dispose",b)),M=U}if(M.visible=A.visible,M.wireframe=A.wireframe,E===yi?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,C.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let N=s.properties.get(M);N.light=C}return M}function _(w,A,C,E,M){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===yi)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);let B=e.update(w),k=w.material;if(Array.isArray(k)){let U=B.groups;for(let D=0,H=U.length;D<H;D++){let z=U[D],Y=k[z.materialIndex];if(Y&&Y.visible){let $=y(w,Y,E,M);w.onBeforeShadow(s,w,A,C,B,$,z),s.renderBufferDirect(C,null,B,$,w,z),w.onAfterShadow(s,w,A,C,B,$,z)}}}else if(k.visible){let U=y(w,k,E,M);w.onBeforeShadow(s,w,A,C,B,U,null),s.renderBufferDirect(C,null,B,U,w,null),w.onAfterShadow(s,w,A,C,B,U,null)}}let N=w.children;for(let B=0,k=N.length;B<k;B++)_(N[B],A,C,E,M)}function b(w){w.target.removeEventListener("dispose",b);for(let C in c){let E=c[C],M=w.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}var jy={[Pl]:Ll,[Dl]:Fl,[Nl]:Ol,[As]:Ul,[Ll]:Pl,[Fl]:Dl,[Ol]:Nl,[Ul]:As};function Qy(s,e){function t(){let F=!1,oe=new ct,me=null,Le=new ct(0,0,0,0);return{setMask:function(xe){me!==xe&&!F&&(s.colorMask(xe,xe,xe,xe),me=xe)},setLocked:function(xe){F=xe},setClear:function(xe,ue,Fe,Ge,st){st===!0&&(xe*=Ge,ue*=Ge,Fe*=Ge),oe.set(xe,ue,Fe,Ge),Le.equals(oe)===!1&&(s.clearColor(xe,ue,Fe,Ge),Le.copy(oe))},reset:function(){F=!1,me=null,Le.set(-1,0,0,0)}}}function n(){let F=!1,oe=!1,me=null,Le=null,xe=null;return{setReversed:function(ue){if(oe!==ue){let Fe=e.get("EXT_clip_control");ue?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT),oe=ue;let Ge=xe;xe=null,this.setClear(Ge)}},getReversed:function(){return oe},setTest:function(ue){ue?ie(s.DEPTH_TEST):Ae(s.DEPTH_TEST)},setMask:function(ue){me!==ue&&!F&&(s.depthMask(ue),me=ue)},setFunc:function(ue){if(oe&&(ue=jy[ue]),Le!==ue){switch(ue){case Pl:s.depthFunc(s.NEVER);break;case Ll:s.depthFunc(s.ALWAYS);break;case Dl:s.depthFunc(s.LESS);break;case As:s.depthFunc(s.LEQUAL);break;case Nl:s.depthFunc(s.EQUAL);break;case Ul:s.depthFunc(s.GEQUAL);break;case Fl:s.depthFunc(s.GREATER);break;case Ol:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Le=ue}},setLocked:function(ue){F=ue},setClear:function(ue){xe!==ue&&(oe&&(ue=1-ue),s.clearDepth(ue),xe=ue)},reset:function(){F=!1,me=null,Le=null,xe=null,oe=!1}}}function i(){let F=!1,oe=null,me=null,Le=null,xe=null,ue=null,Fe=null,Ge=null,st=null;return{setTest:function(at){F||(at?ie(s.STENCIL_TEST):Ae(s.STENCIL_TEST))},setMask:function(at){oe!==at&&!F&&(s.stencilMask(at),oe=at)},setFunc:function(at,$e,zt){(me!==at||Le!==$e||xe!==zt)&&(s.stencilFunc(at,$e,zt),me=at,Le=$e,xe=zt)},setOp:function(at,$e,zt){(ue!==at||Fe!==$e||Ge!==zt)&&(s.stencilOp(at,$e,zt),ue=at,Fe=$e,Ge=zt)},setLocked:function(at){F=at},setClear:function(at){st!==at&&(s.clearStencil(at),st=at)},reset:function(){F=!1,oe=null,me=null,Le=null,xe=null,ue=null,Fe=null,Ge=null,st=null}}}let r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},f=new WeakMap,d=[],m=null,x=!1,g=null,p=null,v=null,y=null,_=null,b=null,w=null,A=new Ve(0,0,0),C=0,E=!1,M=null,P=null,N=null,B=null,k=null,U=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),D=!1,H=0,z=s.getParameter(s.VERSION);z.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(z)[1]),D=H>=1):z.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),D=H>=2);let Y=null,$={},fe=s.getParameter(s.SCISSOR_BOX),ve=s.getParameter(s.VIEWPORT),we=new ct().fromArray(fe),Ce=new ct().fromArray(ve);function Me(F,oe,me,Le){let xe=new Uint8Array(4),ue=s.createTexture();s.bindTexture(F,ue),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Fe=0;Fe<me;Fe++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(oe,0,s.RGBA,1,1,Le,0,s.RGBA,s.UNSIGNED_BYTE,xe):s.texImage2D(oe+Fe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,xe);return ue}let te={};te[s.TEXTURE_2D]=Me(s.TEXTURE_2D,s.TEXTURE_2D,1),te[s.TEXTURE_CUBE_MAP]=Me(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[s.TEXTURE_2D_ARRAY]=Me(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),te[s.TEXTURE_3D]=Me(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ie(s.DEPTH_TEST),o.setFunc(As),G(!1),J($u),ie(s.CULL_FACE),O($t);function ie(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function Ae(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function Re(F,oe){return u[F]!==oe?(s.bindFramebuffer(F,oe),u[F]=oe,F===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=oe),F===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=oe),!0):!1}function ae(F,oe){let me=d,Le=!1;if(F){me=f.get(oe),me===void 0&&(me=[],f.set(oe,me));let xe=F.textures;if(me.length!==xe.length||me[0]!==s.COLOR_ATTACHMENT0){for(let ue=0,Fe=xe.length;ue<Fe;ue++)me[ue]=s.COLOR_ATTACHMENT0+ue;me.length=xe.length,Le=!0}}else me[0]!==s.BACK&&(me[0]=s.BACK,Le=!0);Le&&s.drawBuffers(me)}function Te(F){return m!==F?(s.useProgram(F),m=F,!0):!1}let Z={[ei]:s.FUNC_ADD,[Rf]:s.FUNC_SUBTRACT,[Cf]:s.FUNC_REVERSE_SUBTRACT};Z[If]=s.MIN,Z[Pf]=s.MAX;let T={[jo]:s.ZERO,[Lf]:s.ONE,[Df]:s.SRC_COLOR,[tl]:s.SRC_ALPHA,[Of]:s.SRC_ALPHA_SATURATE,[Il]:s.DST_COLOR,[Cl]:s.DST_ALPHA,[Nf]:s.ONE_MINUS_SRC_COLOR,[nl]:s.ONE_MINUS_SRC_ALPHA,[Ff]:s.ONE_MINUS_DST_COLOR,[Uf]:s.ONE_MINUS_DST_ALPHA,[Bf]:s.CONSTANT_COLOR,[zf]:s.ONE_MINUS_CONSTANT_COLOR,[kf]:s.CONSTANT_ALPHA,[Hf]:s.ONE_MINUS_CONSTANT_ALPHA};function O(F,oe,me,Le,xe,ue,Fe,Ge,st,at){if(F===$t){x===!0&&(Ae(s.BLEND),x=!1);return}if(x===!1&&(ie(s.BLEND),x=!0),F!==Rl){if(F!==g||at!==E){if((p!==ei||_!==ei)&&(s.blendEquation(s.FUNC_ADD),p=ei,_=ei),at)switch(F){case ws:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ju:s.blendFunc(s.ONE,s.ONE);break;case Qu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case eh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case ws:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ju:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Qu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case eh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}v=null,y=null,b=null,w=null,A.set(0,0,0),C=0,g=F,E=at}return}xe=xe||oe,ue=ue||me,Fe=Fe||Le,(oe!==p||xe!==_)&&(s.blendEquationSeparate(Z[oe],Z[xe]),p=oe,_=xe),(me!==v||Le!==y||ue!==b||Fe!==w)&&(s.blendFuncSeparate(T[me],T[Le],T[ue],T[Fe]),v=me,y=Le,b=ue,w=Fe),(Ge.equals(A)===!1||st!==C)&&(s.blendColor(Ge.r,Ge.g,Ge.b,st),A.copy(Ge),C=st),g=F,E=!1}function W(F,oe){F.side===St?Ae(s.CULL_FACE):ie(s.CULL_FACE);let me=F.side===Xt;oe&&(me=!me),G(me),F.blending===ws&&F.transparent===!1?O($t):O(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let Le=F.stencilWrite;a.setTest(Le),Le&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ce(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ie(s.SAMPLE_ALPHA_TO_COVERAGE):Ae(s.SAMPLE_ALPHA_TO_COVERAGE)}function G(F){M!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),M=F)}function J(F){F!==wf?(ie(s.CULL_FACE),F!==P&&(F===$u?s.cullFace(s.BACK):F===Af?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ae(s.CULL_FACE),P=F}function se(F){F!==N&&(D&&s.lineWidth(F),N=F)}function ce(F,oe,me){F?(ie(s.POLYGON_OFFSET_FILL),(B!==oe||k!==me)&&(s.polygonOffset(oe,me),B=oe,k=me)):Ae(s.POLYGON_OFFSET_FILL)}function pe(F){F?ie(s.SCISSOR_TEST):Ae(s.SCISSOR_TEST)}function Oe(F){F===void 0&&(F=s.TEXTURE0+U-1),Y!==F&&(s.activeTexture(F),Y=F)}function ke(F,oe,me){me===void 0&&(Y===null?me=s.TEXTURE0+U-1:me=Y);let Le=$[me];Le===void 0&&(Le={type:void 0,texture:void 0},$[me]=Le),(Le.type!==F||Le.texture!==oe)&&(Y!==me&&(s.activeTexture(me),Y=me),s.bindTexture(F,oe||te[F]),Le.type=F,Le.texture=oe)}function I(){let F=$[Y];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function S(){try{s.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function V(){try{s.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function j(){try{s.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function re(){try{s.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Q(){try{s.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pe(){try{s.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(){try{s.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ne(){try{s.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ze(){try{s.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Se(){try{s.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function X(F){we.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),we.copy(F))}function he(F){Ce.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),Ce.copy(F))}function _e(F,oe){let me=c.get(oe);me===void 0&&(me=new WeakMap,c.set(oe,me));let Le=me.get(F);Le===void 0&&(Le=s.getUniformBlockIndex(oe,F.name),me.set(F,Le))}function le(F,oe){let Le=c.get(oe).get(F);l.get(oe)!==Le&&(s.uniformBlockBinding(oe,Le,F.__bindingPointIndex),l.set(oe,Le))}function ye(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},Y=null,$={},u={},f=new WeakMap,d=[],m=null,x=!1,g=null,p=null,v=null,y=null,_=null,b=null,w=null,A=new Ve(0,0,0),C=0,E=!1,M=null,P=null,N=null,B=null,k=null,we.set(0,0,s.canvas.width,s.canvas.height),Ce.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ie,disable:Ae,bindFramebuffer:Re,drawBuffers:ae,useProgram:Te,setBlending:O,setMaterial:W,setFlipSided:G,setCullFace:J,setLineWidth:se,setPolygonOffset:ce,setScissorTest:pe,activeTexture:Oe,bindTexture:ke,unbindTexture:I,compressedTexImage2D:S,compressedTexImage3D:V,texImage2D:ze,texImage3D:Se,updateUBOMapping:_e,uniformBlockBinding:le,texStorage2D:be,texStorage3D:Ne,texSubImage2D:j,texSubImage3D:re,compressedTexSubImage2D:Q,compressedTexSubImage3D:Pe,scissor:X,viewport:he,reset:ye}}function eM(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ge,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,S){return d?new OffscreenCanvas(I,S):Er("canvas")}function x(I,S,V){let j=1,re=ke(I);if((re.width>V||re.height>V)&&(j=V/Math.max(re.width,re.height)),j<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let Q=Math.floor(j*re.width),Pe=Math.floor(j*re.height);u===void 0&&(u=m(Q,Pe));let be=S?m(Q,Pe):u;return be.width=Q,be.height=Pe,be.getContext("2d").drawImage(I,0,0,Q,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+Q+"x"+Pe+")."),be}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),I;return I}function g(I){return I.generateMipmaps}function p(I){s.generateMipmap(I)}function v(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(I,S,V,j,re=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Q=S;if(S===s.RED&&(V===s.FLOAT&&(Q=s.R32F),V===s.HALF_FLOAT&&(Q=s.R16F),V===s.UNSIGNED_BYTE&&(Q=s.R8)),S===s.RED_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.R8UI),V===s.UNSIGNED_SHORT&&(Q=s.R16UI),V===s.UNSIGNED_INT&&(Q=s.R32UI),V===s.BYTE&&(Q=s.R8I),V===s.SHORT&&(Q=s.R16I),V===s.INT&&(Q=s.R32I)),S===s.RG&&(V===s.FLOAT&&(Q=s.RG32F),V===s.HALF_FLOAT&&(Q=s.RG16F),V===s.UNSIGNED_BYTE&&(Q=s.RG8)),S===s.RG_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.RG8UI),V===s.UNSIGNED_SHORT&&(Q=s.RG16UI),V===s.UNSIGNED_INT&&(Q=s.RG32UI),V===s.BYTE&&(Q=s.RG8I),V===s.SHORT&&(Q=s.RG16I),V===s.INT&&(Q=s.RG32I)),S===s.RGB_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),V===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),V===s.UNSIGNED_INT&&(Q=s.RGB32UI),V===s.BYTE&&(Q=s.RGB8I),V===s.SHORT&&(Q=s.RGB16I),V===s.INT&&(Q=s.RGB32I)),S===s.RGBA_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),V===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),V===s.UNSIGNED_INT&&(Q=s.RGBA32UI),V===s.BYTE&&(Q=s.RGBA8I),V===s.SHORT&&(Q=s.RGBA16I),V===s.INT&&(Q=s.RGBA32I)),S===s.RGB&&(V===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),V===s.UNSIGNED_INT_10F_11F_11F_REV&&(Q=s.R11F_G11F_B10F)),S===s.RGBA){let Pe=re?Mo:nt.getTransfer(j);V===s.FLOAT&&(Q=s.RGBA32F),V===s.HALF_FLOAT&&(Q=s.RGBA16F),V===s.UNSIGNED_BYTE&&(Q=Pe===ut?s.SRGB8_ALPHA8:s.RGBA8),V===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),V===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function _(I,S){let V;return I?S===null||S===ls||S===cs?V=s.DEPTH24_STENCIL8:S===yn?V=s.DEPTH32F_STENCIL8:S===Or&&(V=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ls||S===cs?V=s.DEPTH_COMPONENT24:S===yn?V=s.DEPTH_COMPONENT32F:S===Or&&(V=s.DEPTH_COMPONENT16),V}function b(I,S){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==Vt&&I.minFilter!==It?Math.log2(Math.max(S.width,S.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?S.mipmaps.length:1}function w(I){let S=I.target;S.removeEventListener("dispose",w),C(S),S.isVideoTexture&&h.delete(S)}function A(I){let S=I.target;S.removeEventListener("dispose",A),M(S)}function C(I){let S=n.get(I);if(S.__webglInit===void 0)return;let V=I.source,j=f.get(V);if(j){let re=j[S.__cacheKey];re.usedTimes--,re.usedTimes===0&&E(I),Object.keys(j).length===0&&f.delete(V)}n.remove(I)}function E(I){let S=n.get(I);s.deleteTexture(S.__webglTexture);let V=I.source,j=f.get(V);delete j[S.__cacheKey],o.memory.textures--}function M(I){let S=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(S.__webglFramebuffer[j]))for(let re=0;re<S.__webglFramebuffer[j].length;re++)s.deleteFramebuffer(S.__webglFramebuffer[j][re]);else s.deleteFramebuffer(S.__webglFramebuffer[j]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[j])}else{if(Array.isArray(S.__webglFramebuffer))for(let j=0;j<S.__webglFramebuffer.length;j++)s.deleteFramebuffer(S.__webglFramebuffer[j]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let j=0;j<S.__webglColorRenderbuffer.length;j++)S.__webglColorRenderbuffer[j]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[j]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let V=I.textures;for(let j=0,re=V.length;j<re;j++){let Q=n.get(V[j]);Q.__webglTexture&&(s.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(V[j])}n.remove(I)}let P=0;function N(){P=0}function B(){let I=P;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),P+=1,I}function k(I){let S=[];return S.push(I.wrapS),S.push(I.wrapT),S.push(I.wrapR||0),S.push(I.magFilter),S.push(I.minFilter),S.push(I.anisotropy),S.push(I.internalFormat),S.push(I.format),S.push(I.type),S.push(I.generateMipmaps),S.push(I.premultiplyAlpha),S.push(I.flipY),S.push(I.unpackAlignment),S.push(I.colorSpace),S.join()}function U(I,S){let V=n.get(I);if(I.isVideoTexture&&pe(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&V.__version!==I.version){let j=I.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{te(V,I,S);return}}else I.isExternalTexture&&(V.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,V.__webglTexture,s.TEXTURE0+S)}function D(I,S){let V=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&V.__version!==I.version){te(V,I,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,V.__webglTexture,s.TEXTURE0+S)}function H(I,S){let V=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&V.__version!==I.version){te(V,I,S);return}t.bindTexture(s.TEXTURE_3D,V.__webglTexture,s.TEXTURE0+S)}function z(I,S){let V=n.get(I);if(I.version>0&&V.__version!==I.version){ie(V,I,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture,s.TEXTURE0+S)}let Y={[un]:s.REPEAT,[zn]:s.CLAMP_TO_EDGE,[Hn]:s.MIRRORED_REPEAT},$={[Vt]:s.NEAREST,[ql]:s.NEAREST_MIPMAP_NEAREST,[Ws]:s.NEAREST_MIPMAP_LINEAR,[It]:s.LINEAR,[Fr]:s.LINEAR_MIPMAP_NEAREST,[Pn]:s.LINEAR_MIPMAP_LINEAR},fe={[$f]:s.NEVER,[np]:s.ALWAYS,[Jf]:s.LESS,[uh]:s.LEQUAL,[jf]:s.EQUAL,[tp]:s.GEQUAL,[Qf]:s.GREATER,[ep]:s.NOTEQUAL};function ve(I,S){if(S.type===yn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===It||S.magFilter===Fr||S.magFilter===Ws||S.magFilter===Pn||S.minFilter===It||S.minFilter===Fr||S.minFilter===Ws||S.minFilter===Pn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,Y[S.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,Y[S.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,Y[S.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,$[S.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,$[S.minFilter]),S.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,fe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Vt||S.minFilter!==Ws&&S.minFilter!==Pn||S.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");s.texParameterf(I,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function we(I,S){let V=!1;I.__webglInit===void 0&&(I.__webglInit=!0,S.addEventListener("dispose",w));let j=S.source,re=f.get(j);re===void 0&&(re={},f.set(j,re));let Q=k(S);if(Q!==I.__cacheKey){re[Q]===void 0&&(re[Q]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,V=!0),re[Q].usedTimes++;let Pe=re[I.__cacheKey];Pe!==void 0&&(re[I.__cacheKey].usedTimes--,Pe.usedTimes===0&&E(S)),I.__cacheKey=Q,I.__webglTexture=re[Q].texture}return V}function Ce(I,S,V){return Math.floor(Math.floor(I/V)/S)}function Me(I,S,V,j){let Q=I.updateRanges;if(Q.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,S.width,S.height,V,j,S.data);else{Q.sort((Se,X)=>Se.start-X.start);let Pe=0;for(let Se=1;Se<Q.length;Se++){let X=Q[Pe],he=Q[Se],_e=X.start+X.count,le=Ce(he.start,S.width,4),ye=Ce(X.start,S.width,4);he.start<=_e+1&&le===ye&&Ce(he.start+he.count-1,S.width,4)===le?X.count=Math.max(X.count,he.start+he.count-X.start):(++Pe,Q[Pe]=he)}Q.length=Pe+1;let be=s.getParameter(s.UNPACK_ROW_LENGTH),Ne=s.getParameter(s.UNPACK_SKIP_PIXELS),ze=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,S.width);for(let Se=0,X=Q.length;Se<X;Se++){let he=Q[Se],_e=Math.floor(he.start/4),le=Math.ceil(he.count/4),ye=_e%S.width,F=Math.floor(_e/S.width),oe=le,me=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,ye),s.pixelStorei(s.UNPACK_SKIP_ROWS,F),t.texSubImage2D(s.TEXTURE_2D,0,ye,F,oe,me,V,j,S.data)}I.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,be),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ne),s.pixelStorei(s.UNPACK_SKIP_ROWS,ze)}}function te(I,S,V){let j=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(j=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(j=s.TEXTURE_3D);let re=we(I,S),Q=S.source;t.bindTexture(j,I.__webglTexture,s.TEXTURE0+V);let Pe=n.get(Q);if(Q.version!==Pe.__version||re===!0){t.activeTexture(s.TEXTURE0+V);let be=nt.getPrimaries(nt.workingColorSpace),Ne=S.colorSpace===si?null:nt.getPrimaries(S.colorSpace),ze=S.colorSpace===si||be===Ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let Se=x(S.image,!1,i.maxTextureSize);Se=Oe(S,Se);let X=r.convert(S.format,S.colorSpace),he=r.convert(S.type),_e=y(S.internalFormat,X,he,S.colorSpace,S.isVideoTexture);ve(j,S);let le,ye=S.mipmaps,F=S.isVideoTexture!==!0,oe=Pe.__version===void 0||re===!0,me=Q.dataReady,Le=b(S,Se);if(S.isDepthTexture)_e=_(S.format===us,S.type),oe&&(F?t.texStorage2D(s.TEXTURE_2D,1,_e,Se.width,Se.height):t.texImage2D(s.TEXTURE_2D,0,_e,Se.width,Se.height,0,X,he,null));else if(S.isDataTexture)if(ye.length>0){F&&oe&&t.texStorage2D(s.TEXTURE_2D,Le,_e,ye[0].width,ye[0].height);for(let xe=0,ue=ye.length;xe<ue;xe++)le=ye[xe],F?me&&t.texSubImage2D(s.TEXTURE_2D,xe,0,0,le.width,le.height,X,he,le.data):t.texImage2D(s.TEXTURE_2D,xe,_e,le.width,le.height,0,X,he,le.data);S.generateMipmaps=!1}else F?(oe&&t.texStorage2D(s.TEXTURE_2D,Le,_e,Se.width,Se.height),me&&Me(S,Se,X,he)):t.texImage2D(s.TEXTURE_2D,0,_e,Se.width,Se.height,0,X,he,Se.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){F&&oe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Le,_e,ye[0].width,ye[0].height,Se.depth);for(let xe=0,ue=ye.length;xe<ue;xe++)if(le=ye[xe],S.format!==fn)if(X!==null)if(F){if(me)if(S.layerUpdates.size>0){let Fe=_h(le.width,le.height,S.format,S.type);for(let Ge of S.layerUpdates){let st=le.data.subarray(Ge*Fe/le.data.BYTES_PER_ELEMENT,(Ge+1)*Fe/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,xe,0,0,Ge,le.width,le.height,1,X,st)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,xe,0,0,0,le.width,le.height,Se.depth,X,le.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,xe,_e,le.width,le.height,Se.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?me&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,xe,0,0,0,le.width,le.height,Se.depth,X,he,le.data):t.texImage3D(s.TEXTURE_2D_ARRAY,xe,_e,le.width,le.height,Se.depth,0,X,he,le.data)}else{F&&oe&&t.texStorage2D(s.TEXTURE_2D,Le,_e,ye[0].width,ye[0].height);for(let xe=0,ue=ye.length;xe<ue;xe++)le=ye[xe],S.format!==fn?X!==null?F?me&&t.compressedTexSubImage2D(s.TEXTURE_2D,xe,0,0,le.width,le.height,X,le.data):t.compressedTexImage2D(s.TEXTURE_2D,xe,_e,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?me&&t.texSubImage2D(s.TEXTURE_2D,xe,0,0,le.width,le.height,X,he,le.data):t.texImage2D(s.TEXTURE_2D,xe,_e,le.width,le.height,0,X,he,le.data)}else if(S.isDataArrayTexture)if(F){if(oe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Le,_e,Se.width,Se.height,Se.depth),me)if(S.layerUpdates.size>0){let xe=_h(Se.width,Se.height,S.format,S.type);for(let ue of S.layerUpdates){let Fe=Se.data.subarray(ue*xe/Se.data.BYTES_PER_ELEMENT,(ue+1)*xe/Se.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ue,Se.width,Se.height,1,X,he,Fe)}S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Se.width,Se.height,Se.depth,X,he,Se.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,_e,Se.width,Se.height,Se.depth,0,X,he,Se.data);else if(S.isData3DTexture)F?(oe&&t.texStorage3D(s.TEXTURE_3D,Le,_e,Se.width,Se.height,Se.depth),me&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Se.width,Se.height,Se.depth,X,he,Se.data)):t.texImage3D(s.TEXTURE_3D,0,_e,Se.width,Se.height,Se.depth,0,X,he,Se.data);else if(S.isFramebufferTexture){if(oe)if(F)t.texStorage2D(s.TEXTURE_2D,Le,_e,Se.width,Se.height);else{let xe=Se.width,ue=Se.height;for(let Fe=0;Fe<Le;Fe++)t.texImage2D(s.TEXTURE_2D,Fe,_e,xe,ue,0,X,he,null),xe>>=1,ue>>=1}}else if(ye.length>0){if(F&&oe){let xe=ke(ye[0]);t.texStorage2D(s.TEXTURE_2D,Le,_e,xe.width,xe.height)}for(let xe=0,ue=ye.length;xe<ue;xe++)le=ye[xe],F?me&&t.texSubImage2D(s.TEXTURE_2D,xe,0,0,X,he,le):t.texImage2D(s.TEXTURE_2D,xe,_e,X,he,le);S.generateMipmaps=!1}else if(F){if(oe){let xe=ke(Se);t.texStorage2D(s.TEXTURE_2D,Le,_e,xe.width,xe.height)}me&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,X,he,Se)}else t.texImage2D(s.TEXTURE_2D,0,_e,X,he,Se);g(S)&&p(j),Pe.__version=Q.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function ie(I,S,V){if(S.image.length!==6)return;let j=we(I,S),re=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+V);let Q=n.get(re);if(re.version!==Q.__version||j===!0){t.activeTexture(s.TEXTURE0+V);let Pe=nt.getPrimaries(nt.workingColorSpace),be=S.colorSpace===si?null:nt.getPrimaries(S.colorSpace),Ne=S.colorSpace===si||Pe===be?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let ze=S.isCompressedTexture||S.image[0].isCompressedTexture,Se=S.image[0]&&S.image[0].isDataTexture,X=[];for(let ue=0;ue<6;ue++)!ze&&!Se?X[ue]=x(S.image[ue],!0,i.maxCubemapSize):X[ue]=Se?S.image[ue].image:S.image[ue],X[ue]=Oe(S,X[ue]);let he=X[0],_e=r.convert(S.format,S.colorSpace),le=r.convert(S.type),ye=y(S.internalFormat,_e,le,S.colorSpace),F=S.isVideoTexture!==!0,oe=Q.__version===void 0||j===!0,me=re.dataReady,Le=b(S,he);ve(s.TEXTURE_CUBE_MAP,S);let xe;if(ze){F&&oe&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Le,ye,he.width,he.height);for(let ue=0;ue<6;ue++){xe=X[ue].mipmaps;for(let Fe=0;Fe<xe.length;Fe++){let Ge=xe[Fe];S.format!==fn?_e!==null?F?me&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Fe,0,0,Ge.width,Ge.height,_e,Ge.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Fe,ye,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Fe,0,0,Ge.width,Ge.height,_e,le,Ge.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Fe,ye,Ge.width,Ge.height,0,_e,le,Ge.data)}}}else{if(xe=S.mipmaps,F&&oe){xe.length>0&&Le++;let ue=ke(X[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Le,ye,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(Se){F?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,X[ue].width,X[ue].height,_e,le,X[ue].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,ye,X[ue].width,X[ue].height,0,_e,le,X[ue].data);for(let Fe=0;Fe<xe.length;Fe++){let st=xe[Fe].image[ue].image;F?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Fe+1,0,0,st.width,st.height,_e,le,st.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Fe+1,ye,st.width,st.height,0,_e,le,st.data)}}else{F?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,_e,le,X[ue]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,ye,_e,le,X[ue]);for(let Fe=0;Fe<xe.length;Fe++){let Ge=xe[Fe];F?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Fe+1,0,0,_e,le,Ge.image[ue]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Fe+1,ye,_e,le,Ge.image[ue])}}}g(S)&&p(s.TEXTURE_CUBE_MAP),Q.__version=re.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function Ae(I,S,V,j,re,Q){let Pe=r.convert(V.format,V.colorSpace),be=r.convert(V.type),Ne=y(V.internalFormat,Pe,be,V.colorSpace),ze=n.get(S),Se=n.get(V);if(Se.__renderTarget=S,!ze.__hasExternalTextures){let X=Math.max(1,S.width>>Q),he=Math.max(1,S.height>>Q);re===s.TEXTURE_3D||re===s.TEXTURE_2D_ARRAY?t.texImage3D(re,Q,Ne,X,he,S.depth,0,Pe,be,null):t.texImage2D(re,Q,Ne,X,he,0,Pe,be,null)}t.bindFramebuffer(s.FRAMEBUFFER,I),ce(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,re,Se.__webglTexture,0,se(S)):(re===s.TEXTURE_2D||re>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,j,re,Se.__webglTexture,Q),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Re(I,S,V){if(s.bindRenderbuffer(s.RENDERBUFFER,I),S.depthBuffer){let j=S.depthTexture,re=j&&j.isDepthTexture?j.type:null,Q=_(S.stencilBuffer,re),Pe=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=se(S);ce(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,be,Q,S.width,S.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,be,Q,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Q,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Pe,s.RENDERBUFFER,I)}else{let j=S.textures;for(let re=0;re<j.length;re++){let Q=j[re],Pe=r.convert(Q.format,Q.colorSpace),be=r.convert(Q.type),Ne=y(Q.internalFormat,Pe,be,Q.colorSpace),ze=se(S);V&&ce(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ze,Ne,S.width,S.height):ce(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ze,Ne,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Ne,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ae(I,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,I),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=n.get(S.depthTexture);j.__renderTarget=S,(!j.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),U(S.depthTexture,0);let re=j.__webglTexture,Q=se(S);if(S.depthTexture.format===br)ce(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,re,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,re,0);else if(S.depthTexture.format===us)ce(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,re,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Te(I){let S=n.get(I),V=I.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==I.depthTexture){let j=I.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),j){let re=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,j.removeEventListener("dispose",re)};j.addEventListener("dispose",re),S.__depthDisposeCallback=re}S.__boundDepthTexture=j}if(I.depthTexture&&!S.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");let j=I.texture.mipmaps;j&&j.length>0?ae(S.__webglFramebuffer[0],I):ae(S.__webglFramebuffer,I)}else if(V){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]===void 0)S.__webglDepthbuffer[j]=s.createRenderbuffer(),Re(S.__webglDepthbuffer[j],I,!1);else{let re=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer[j];s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,Q)}}else{let j=I.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),Re(S.__webglDepthbuffer,I,!1);else{let re=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,Q)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Z(I,S,V){let j=n.get(I);S!==void 0&&Ae(j.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),V!==void 0&&Te(I)}function T(I){let S=I.texture,V=n.get(I),j=n.get(S);I.addEventListener("dispose",A);let re=I.textures,Q=I.isWebGLCubeRenderTarget===!0,Pe=re.length>1;if(Pe||(j.__webglTexture===void 0&&(j.__webglTexture=s.createTexture()),j.__version=S.version,o.memory.textures++),Q){V.__webglFramebuffer=[];for(let be=0;be<6;be++)if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer[be]=[];for(let Ne=0;Ne<S.mipmaps.length;Ne++)V.__webglFramebuffer[be][Ne]=s.createFramebuffer()}else V.__webglFramebuffer[be]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer=[];for(let be=0;be<S.mipmaps.length;be++)V.__webglFramebuffer[be]=s.createFramebuffer()}else V.__webglFramebuffer=s.createFramebuffer();if(Pe)for(let be=0,Ne=re.length;be<Ne;be++){let ze=n.get(re[be]);ze.__webglTexture===void 0&&(ze.__webglTexture=s.createTexture(),o.memory.textures++)}if(I.samples>0&&ce(I)===!1){V.__webglMultisampledFramebuffer=s.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let be=0;be<re.length;be++){let Ne=re[be];V.__webglColorRenderbuffer[be]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,V.__webglColorRenderbuffer[be]);let ze=r.convert(Ne.format,Ne.colorSpace),Se=r.convert(Ne.type),X=y(Ne.internalFormat,ze,Se,Ne.colorSpace,I.isXRRenderTarget===!0),he=se(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,he,X,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.RENDERBUFFER,V.__webglColorRenderbuffer[be])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(V.__webglDepthRenderbuffer=s.createRenderbuffer(),Re(V.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Q){t.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture),ve(s.TEXTURE_CUBE_MAP,S);for(let be=0;be<6;be++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ne=0;Ne<S.mipmaps.length;Ne++)Ae(V.__webglFramebuffer[be][Ne],I,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ne);else Ae(V.__webglFramebuffer[be],I,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0);g(S)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let be=0,Ne=re.length;be<Ne;be++){let ze=re[be],Se=n.get(ze),X=s.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(X=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(X,Se.__webglTexture),ve(X,ze),Ae(V.__webglFramebuffer,I,ze,s.COLOR_ATTACHMENT0+be,X,0),g(ze)&&p(X)}t.unbindTexture()}else{let be=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(be=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(be,j.__webglTexture),ve(be,S),S.mipmaps&&S.mipmaps.length>0)for(let Ne=0;Ne<S.mipmaps.length;Ne++)Ae(V.__webglFramebuffer[Ne],I,S,s.COLOR_ATTACHMENT0,be,Ne);else Ae(V.__webglFramebuffer,I,S,s.COLOR_ATTACHMENT0,be,0);g(S)&&p(be),t.unbindTexture()}I.depthBuffer&&Te(I)}function O(I){let S=I.textures;for(let V=0,j=S.length;V<j;V++){let re=S[V];if(g(re)){let Q=v(I),Pe=n.get(re).__webglTexture;t.bindTexture(Q,Pe),p(Q),t.unbindTexture()}}}let W=[],G=[];function J(I){if(I.samples>0){if(ce(I)===!1){let S=I.textures,V=I.width,j=I.height,re=s.COLOR_BUFFER_BIT,Q=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Pe=n.get(I),be=S.length>1;if(be)for(let ze=0;ze<S.length;ze++)t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer);let Ne=I.texture.mipmaps;Ne&&Ne.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let ze=0;ze<S.length;ze++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(re|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(re|=s.STENCIL_BUFFER_BIT)),be){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Pe.__webglColorRenderbuffer[ze]);let Se=n.get(S[ze]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Se,0)}s.blitFramebuffer(0,0,V,j,0,0,V,j,re,s.NEAREST),l===!0&&(W.length=0,G.length=0,W.push(s.COLOR_ATTACHMENT0+ze),I.depthBuffer&&I.resolveDepthBuffer===!1&&(W.push(Q),G.push(Q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,G)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,W))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),be)for(let ze=0;ze<S.length;ze++){t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.RENDERBUFFER,Pe.__webglColorRenderbuffer[ze]);let Se=n.get(S[ze]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ze,s.TEXTURE_2D,Se,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){let S=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function se(I){return Math.min(i.maxSamples,I.samples)}function ce(I){let S=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function pe(I){let S=o.render.frame;h.get(I)!==S&&(h.set(I,S),I.update())}function Oe(I,S){let V=I.colorSpace,j=I.format,re=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||V!==Qt&&V!==si&&(nt.getTransfer(V)===ut?(j!==fn||re!==ni)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),S}function ke(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=N,this.setTexture2D=U,this.setTexture2DArray=D,this.setTexture3D=H,this.setTextureCube=z,this.rebindTextures=Z,this.setupRenderTarget=T,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=J,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=ce}function tM(s,e){function t(n,i=si){let r,o=nt.getTransfer(i);if(n===ni)return s.UNSIGNED_BYTE;if(n===Zl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Kl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===rh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===oh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===ih)return s.BYTE;if(n===sh)return s.SHORT;if(n===Or)return s.UNSIGNED_SHORT;if(n===Yl)return s.INT;if(n===ls)return s.UNSIGNED_INT;if(n===yn)return s.FLOAT;if(n===ii)return s.HALF_FLOAT;if(n===ah)return s.ALPHA;if(n===lh)return s.RGB;if(n===fn)return s.RGBA;if(n===br)return s.DEPTH_COMPONENT;if(n===us)return s.DEPTH_STENCIL;if(n===Br)return s.RED;if(n===$l)return s.RED_INTEGER;if(n===ea)return s.RG;if(n===Jl)return s.RG_INTEGER;if(n===jl)return s.RGBA_INTEGER;if(n===ta||n===na||n===ia||n===sa)if(o===ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===sa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ql||n===ec||n===tc||n===nc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ql)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ec)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===tc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===nc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ic||n===sc||n===rc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ic||n===sc)return o===ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===rc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===oc||n===ac||n===lc||n===cc||n===uc||n===hc||n===dc||n===fc||n===pc||n===mc||n===gc||n===xc||n===_c||n===vc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===oc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ac)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===lc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===cc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===uc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===hc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===mc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===gc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_c)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vc)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yc||n===Mc||n===Sc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===yc)return o===ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Mc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bc||n===Ec||n===Tc||n===wc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===bc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ec)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Tc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===cs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var nM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ph=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Do(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Gt({vertexShader:nM,fragmentShader:iM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Je(new Ft(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Lh=class extends fi{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,m=null,x=typeof XRWebGLBinding<"u",g=new Ph,p={},v=t.getContextAttributes(),y=null,_=null,b=[],w=[],A=new ge,C=null,E=new Ht;E.viewport=new ct;let M=new Ht;M.viewport=new ct;let P=[E,M],N=new El,B=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let ie=b[te];return ie===void 0&&(ie=new Rr,b[te]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(te){let ie=b[te];return ie===void 0&&(ie=new Rr,b[te]=ie),ie.getGripSpace()},this.getHand=function(te){let ie=b[te];return ie===void 0&&(ie=new Rr,b[te]=ie),ie.getHandSpace()};function U(te){let ie=w.indexOf(te.inputSource);if(ie===-1)return;let Ae=b[ie];Ae!==void 0&&(Ae.update(te.inputSource,te.frame,c||o),Ae.dispatchEvent({type:te.type,data:te.inputSource}))}function D(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",D),i.removeEventListener("inputsourceschange",H);for(let te=0;te<b.length;te++){let ie=w[te];ie!==null&&(w[te]=null,b[te].disconnect(ie))}B=null,k=null,g.reset();for(let te in p)delete p[te];e.setRenderTarget(y),d=null,f=null,u=null,i=null,_=null,Me.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(te){if(i=te,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",D),i.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ae=null,Re=null,ae=null;v.depth&&(ae=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ae=v.stencil?us:br,Re=v.stencil?cs:ls);let Te={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Te),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new hn(f.textureWidth,f.textureHeight,{format:fn,type:ni,depthTexture:new Ns(f.textureWidth,f.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,Ae),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let Ae={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,Ae),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new hn(d.framebufferWidth,d.framebufferHeight,{format:fn,type:ni,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Me.setContext(i),Me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(te){for(let ie=0;ie<te.removed.length;ie++){let Ae=te.removed[ie],Re=w.indexOf(Ae);Re>=0&&(w[Re]=null,b[Re].disconnect(Ae))}for(let ie=0;ie<te.added.length;ie++){let Ae=te.added[ie],Re=w.indexOf(Ae);if(Re===-1){for(let Te=0;Te<b.length;Te++)if(Te>=w.length){w.push(Ae),Re=Te;break}else if(w[Te]===null){w[Te]=Ae,Re=Te;break}if(Re===-1)break}let ae=b[Re];ae&&ae.connect(Ae)}}let z=new L,Y=new L;function $(te,ie,Ae){z.setFromMatrixPosition(ie.matrixWorld),Y.setFromMatrixPosition(Ae.matrixWorld);let Re=z.distanceTo(Y),ae=ie.projectionMatrix.elements,Te=Ae.projectionMatrix.elements,Z=ae[14]/(ae[10]-1),T=ae[14]/(ae[10]+1),O=(ae[9]+1)/ae[5],W=(ae[9]-1)/ae[5],G=(ae[8]-1)/ae[0],J=(Te[8]+1)/Te[0],se=Z*G,ce=Z*J,pe=Re/(-G+J),Oe=pe*-G;if(ie.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Oe),te.translateZ(pe),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),ae[10]===-1)te.projectionMatrix.copy(ie.projectionMatrix),te.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{let ke=Z+pe,I=T+pe,S=se-Oe,V=ce+(Re-Oe),j=O*T/I*ke,re=W*T/I*ke;te.projectionMatrix.makePerspective(S,V,j,re,ke,I),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function fe(te,ie){ie===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(ie.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(i===null)return;let ie=te.near,Ae=te.far;g.texture!==null&&(g.depthNear>0&&(ie=g.depthNear),g.depthFar>0&&(Ae=g.depthFar)),N.near=M.near=E.near=ie,N.far=M.far=E.far=Ae,(B!==N.near||k!==N.far)&&(i.updateRenderState({depthNear:N.near,depthFar:N.far}),B=N.near,k=N.far),N.layers.mask=te.layers.mask|6,E.layers.mask=N.layers.mask&3,M.layers.mask=N.layers.mask&5;let Re=te.parent,ae=N.cameras;fe(N,Re);for(let Te=0;Te<ae.length;Te++)fe(ae[Te],Re);ae.length===2?$(N,E,M):N.projectionMatrix.copy(E.projectionMatrix),ve(te,N,Re)};function ve(te,ie,Ae){Ae===null?te.matrix.copy(ie.matrixWorld):(te.matrix.copy(Ae.matrixWorld),te.matrix.invert(),te.matrix.multiply(ie.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(ie.projectionMatrix),te.projectionMatrixInverse.copy(ie.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Is*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(te){l=te,f!==null&&(f.fixedFoveation=te),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=te)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(te){return p[te]};let we=null;function Ce(te,ie){if(h=ie.getViewerPose(c||o),m=ie,h!==null){let Ae=h.views;d!==null&&(e.setRenderTargetFramebuffer(_,d.framebuffer),e.setRenderTarget(_));let Re=!1;Ae.length!==N.cameras.length&&(N.cameras.length=0,Re=!0);for(let T=0;T<Ae.length;T++){let O=Ae[T],W=null;if(d!==null)W=d.getViewport(O);else{let J=u.getViewSubImage(f,O);W=J.viewport,T===0&&(e.setRenderTargetTextures(_,J.colorTexture,J.depthStencilTexture),e.setRenderTarget(_))}let G=P[T];G===void 0&&(G=new Ht,G.layers.enable(T),G.viewport=new ct,P[T]=G),G.matrix.fromArray(O.transform.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale),G.projectionMatrix.fromArray(O.projectionMatrix),G.projectionMatrixInverse.copy(G.projectionMatrix).invert(),G.viewport.set(W.x,W.y,W.width,W.height),T===0&&(N.matrix.copy(G.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Re===!0&&N.cameras.push(G)}let ae=i.enabledFeatures;if(ae&&ae.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let T=u.getDepthInformation(Ae[0]);T&&T.isValid&&T.texture&&g.init(T,i.renderState)}if(ae&&ae.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let T=0;T<Ae.length;T++){let O=Ae[T].camera;if(O){let W=p[O];W||(W=new Do,p[O]=W);let G=u.getCameraImage(O);W.sourceTexture=G}}}}for(let Ae=0;Ae<b.length;Ae++){let Re=w[Ae],ae=b[Ae];Re!==null&&ae!==void 0&&ae.update(Re,ie,c||o)}we&&we(te,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),m=null}let Me=new Fp;Me.setAnimationLoop(Ce),this.setAnimationLoop=function(te){we=te},this.dispose=function(){}}},Ys=new Cn,sM=new Ye;function rM(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,ph(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,v,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,v,y):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Xt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Xt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let v=e.get(p),y=v.envMap,_=v.envMapRotation;y&&(g.envMap.value=y,Ys.copy(_),Ys.x*=-1,Ys.y*=-1,Ys.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ys.y*=-1,Ys.z*=-1),g.envMapRotation.value.setFromMatrix4(sM.makeRotationFromEuler(Ys)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=y*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function oM(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){let _=y.program;n.uniformBlockBinding(v,_)}function c(v,y){let _=i[v.id];_===void 0&&(m(v),_=h(v),i[v.id]=_,v.addEventListener("dispose",g));let b=y.program;n.updateUBOMapping(v,b);let w=e.render.frame;r[v.id]!==w&&(f(v),r[v.id]=w)}function h(v){let y=u();v.__bindingPointIndex=y;let _=s.createBuffer(),b=v.__size,w=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,b,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,_),_}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let y=i[v.id],_=v.uniforms,b=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let w=0,A=_.length;w<A;w++){let C=Array.isArray(_[w])?_[w]:[_[w]];for(let E=0,M=C.length;E<M;E++){let P=C[E];if(d(P,w,E,b)===!0){let N=P.__offset,B=Array.isArray(P.value)?P.value:[P.value],k=0;for(let U=0;U<B.length;U++){let D=B[U],H=x(D);typeof D=="number"||typeof D=="boolean"?(P.__data[0]=D,s.bufferSubData(s.UNIFORM_BUFFER,N+k,P.__data)):D.isMatrix3?(P.__data[0]=D.elements[0],P.__data[1]=D.elements[1],P.__data[2]=D.elements[2],P.__data[3]=0,P.__data[4]=D.elements[3],P.__data[5]=D.elements[4],P.__data[6]=D.elements[5],P.__data[7]=0,P.__data[8]=D.elements[6],P.__data[9]=D.elements[7],P.__data[10]=D.elements[8],P.__data[11]=0):(D.toArray(P.__data,k),k+=H.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,N,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(v,y,_,b){let w=v.value,A=y+"_"+_;if(b[A]===void 0)return typeof w=="number"||typeof w=="boolean"?b[A]=w:b[A]=w.clone(),!0;{let C=b[A];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return b[A]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function m(v){let y=v.uniforms,_=0,b=16;for(let A=0,C=y.length;A<C;A++){let E=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,P=E.length;M<P;M++){let N=E[M],B=Array.isArray(N.value)?N.value:[N.value];for(let k=0,U=B.length;k<U;k++){let D=B[k],H=x(D),z=_%b,Y=z%H.boundary,$=z+Y;_+=Y,$!==0&&b-$<H.storage&&(_+=b-$),N.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=_,_+=H.storage}}}let w=_%b;return w>0&&(_+=b-w),v.__size=_,v.__cache={},this}function x(v){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){let y=v.target;y.removeEventListener("dispose",g);let _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(let v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}var Uc=class{constructor(e={}){let{canvas:t=ip(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let m=new Uint32Array(4),x=new Int32Array(4),g=null,p=null,v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,b=!1;this._outputColorSpace=Qe;let w=0,A=0,C=null,E=-1,M=null,P=new ct,N=new ct,B=null,k=new Ve(0),U=0,D=t.width,H=t.height,z=1,Y=null,$=null,fe=new ct(0,0,D,H),ve=new ct(0,0,D,H),we=!1,Ce=new Ir,Me=!1,te=!1,ie=new Ye,Ae=new L,Re=new ct,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function Z(){return C===null?z:1}let T=n;function O(R,q){return t.getContext(R,q)}try{let R={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Le,!1),t.addEventListener("webglcontextcreationerror",xe,!1),T===null){let q="webgl2";if(T=O(q,R),T===null)throw O(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let W,G,J,se,ce,pe,Oe,ke,I,S,V,j,re,Q,Pe,be,Ne,ze,Se,X,he,_e,le,ye;function F(){W=new Ev(T),W.init(),_e=new tM(T,W),G=new xv(T,W,e,_e),J=new Qy(T,W),G.reversedDepthBuffer&&f&&J.buffers.depth.setReversed(!0),se=new Av(T),ce=new ky,pe=new eM(T,W,J,ce,G,_e,se),Oe=new vv(_),ke=new bv(_),I=new D0(T),le=new mv(T,I),S=new Tv(T,I,se,le),V=new Cv(T,S,I,se),Se=new Rv(T,G,pe),be=new _v(ce),j=new zy(_,Oe,ke,W,G,le,be),re=new rM(_,ce),Q=new Vy,Pe=new Zy(W),ze=new pv(_,Oe,ke,J,V,d,l),Ne=new Jy(_,V,G),ye=new oM(T,se,G,J),X=new gv(T,W,se),he=new wv(T,W,se),se.programs=j.programs,_.capabilities=G,_.extensions=W,_.properties=ce,_.renderLists=Q,_.shadowMap=Ne,_.state=J,_.info=se}F();let oe=new Lh(_,T);this.xr=oe,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){let R=W.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=W.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(R){R!==void 0&&(z=R,this.setSize(D,H,!1))},this.getSize=function(R){return R.set(D,H)},this.setSize=function(R,q,ee=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=R,H=q,t.width=Math.floor(R*z),t.height=Math.floor(q*z),ee===!0&&(t.style.width=R+"px",t.style.height=q+"px"),this.setViewport(0,0,R,q)},this.getDrawingBufferSize=function(R){return R.set(D*z,H*z).floor()},this.setDrawingBufferSize=function(R,q,ee){D=R,H=q,z=ee,t.width=Math.floor(R*ee),t.height=Math.floor(q*ee),this.setViewport(0,0,R,q)},this.getCurrentViewport=function(R){return R.copy(P)},this.getViewport=function(R){return R.copy(fe)},this.setViewport=function(R,q,ee,ne){R.isVector4?fe.set(R.x,R.y,R.z,R.w):fe.set(R,q,ee,ne),J.viewport(P.copy(fe).multiplyScalar(z).round())},this.getScissor=function(R){return R.copy(ve)},this.setScissor=function(R,q,ee,ne){R.isVector4?ve.set(R.x,R.y,R.z,R.w):ve.set(R,q,ee,ne),J.scissor(N.copy(ve).multiplyScalar(z).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(R){J.setScissorTest(we=R)},this.setOpaqueSort=function(R){Y=R},this.setTransparentSort=function(R){$=R},this.getClearColor=function(R){return R.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(R=!0,q=!0,ee=!0){let ne=0;if(R){let K=!1;if(C!==null){let Ee=C.texture.format;K=Ee===jl||Ee===Jl||Ee===$l}if(K){let Ee=C.texture.type,De=Ee===ni||Ee===ls||Ee===Or||Ee===cs||Ee===Zl||Ee===Kl,He=ze.getClearColor(),Be=ze.getClearAlpha(),qe=He.r,Ke=He.g,We=He.b;De?(m[0]=qe,m[1]=Ke,m[2]=We,m[3]=Be,T.clearBufferuiv(T.COLOR,0,m)):(x[0]=qe,x[1]=Ke,x[2]=We,x[3]=Be,T.clearBufferiv(T.COLOR,0,x))}else ne|=T.COLOR_BUFFER_BIT}q&&(ne|=T.DEPTH_BUFFER_BIT),ee&&(ne|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Le,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),ze.dispose(),Q.dispose(),Pe.dispose(),ce.dispose(),Oe.dispose(),ke.dispose(),V.dispose(),le.dispose(),ye.dispose(),j.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",zt),oe.removeEventListener("sessionend",Rd),xs.stop()};function me(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function Le(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let R=se.autoReset,q=Ne.enabled,ee=Ne.autoUpdate,ne=Ne.needsUpdate,K=Ne.type;F(),se.autoReset=R,Ne.enabled=q,Ne.autoUpdate=ee,Ne.needsUpdate=ne,Ne.type=K}function xe(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ue(R){let q=R.target;q.removeEventListener("dispose",ue),Fe(q)}function Fe(R){Ge(R),ce.remove(R)}function Ge(R){let q=ce.get(R).programs;q!==void 0&&(q.forEach(function(ee){j.releaseProgram(ee)}),R.isShaderMaterial&&j.releaseShaderCache(R))}this.renderBufferDirect=function(R,q,ee,ne,K,Ee){q===null&&(q=ae);let De=K.isMesh&&K.matrixWorld.determinant()<0,He=jm(R,q,ee,ne,K);J.setMaterial(ne,De);let Be=ee.index,qe=1;if(ne.wireframe===!0){if(Be=S.getWireframeAttribute(ee),Be===void 0)return;qe=2}let Ke=ee.drawRange,We=ee.attributes.position,rt=Ke.start*qe,xt=(Ke.start+Ke.count)*qe;Ee!==null&&(rt=Math.max(rt,Ee.start*qe),xt=Math.min(xt,(Ee.start+Ee.count)*qe)),Be!==null?(rt=Math.max(rt,0),xt=Math.min(xt,Be.count)):We!=null&&(rt=Math.max(rt,0),xt=Math.min(xt,We.count));let Dt=xt-rt;if(Dt<0||Dt===1/0)return;le.setup(K,ne,He,ee,Be);let Et,yt=X;if(Be!==null&&(Et=I.get(Be),yt=he,yt.setIndex(Et)),K.isMesh)ne.wireframe===!0?(J.setLineWidth(ne.wireframeLinewidth*Z()),yt.setMode(T.LINES)):yt.setMode(T.TRIANGLES);else if(K.isLine){let Xe=ne.linewidth;Xe===void 0&&(Xe=1),J.setLineWidth(Xe*Z()),K.isLineSegments?yt.setMode(T.LINES):K.isLineLoop?yt.setMode(T.LINE_LOOP):yt.setMode(T.LINE_STRIP)}else K.isPoints?yt.setMode(T.POINTS):K.isSprite&&yt.setMode(T.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)Tr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),yt.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(W.get("WEBGL_multi_draw"))yt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let Xe=K._multiDrawStarts,wt=K._multiDrawCounts,lt=K._multiDrawCount,Tn=Be?I.get(Be).bytesPerElement:1,ir=ce.get(ne).currentProgram.getUniforms();for(let wn=0;wn<lt;wn++)ir.setValue(T,"_gl_DrawID",wn),yt.render(Xe[wn]/Tn,wt[wn])}else if(K.isInstancedMesh)yt.renderInstances(rt,Dt,K.count);else if(ee.isInstancedBufferGeometry){let Xe=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,wt=Math.min(ee.instanceCount,Xe);yt.renderInstances(rt,Dt,wt)}else yt.render(rt,Dt)};function st(R,q,ee){R.transparent===!0&&R.side===St&&R.forceSinglePass===!1?(R.side=Xt,R.needsUpdate=!0,ba(R,q,ee),R.side=Qn,R.needsUpdate=!0,ba(R,q,ee),R.side=St):ba(R,q,ee)}this.compile=function(R,q,ee=null){ee===null&&(ee=R),p=Pe.get(ee),p.init(q),y.push(p),ee.traverseVisible(function(K){K.isLight&&K.layers.test(q.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),R!==ee&&R.traverseVisible(function(K){K.isLight&&K.layers.test(q.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),p.setupLights();let ne=new Set;return R.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let Ee=K.material;if(Ee)if(Array.isArray(Ee))for(let De=0;De<Ee.length;De++){let He=Ee[De];st(He,ee,K),ne.add(He)}else st(Ee,ee,K),ne.add(Ee)}),p=y.pop(),ne},this.compileAsync=function(R,q,ee=null){let ne=this.compile(R,q,ee);return new Promise(K=>{function Ee(){if(ne.forEach(function(De){ce.get(De).currentProgram.isReady()&&ne.delete(De)}),ne.size===0){K(R);return}setTimeout(Ee,10)}W.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let at=null;function $e(R){at&&at(R)}function zt(){xs.stop()}function Rd(){xs.start()}let xs=new Fp;xs.setAnimationLoop($e),typeof self<"u"&&xs.setContext(self),this.setAnimationLoop=function(R){at=R,oe.setAnimationLoop(R),R===null?xs.stop():xs.start()},oe.addEventListener("sessionstart",zt),oe.addEventListener("sessionend",Rd),this.render=function(R,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(q),q=oe.getCamera()),R.isScene===!0&&R.onBeforeRender(_,R,q,C),p=Pe.get(R,y.length),p.init(q),y.push(p),ie.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),Ce.setFromProjectionMatrix(ie,jn,q.reversedDepth),te=this.localClippingEnabled,Me=be.init(this.clippingPlanes,te),g=Q.get(R,v.length),g.init(),v.push(g),oe.enabled===!0&&oe.isPresenting===!0){let Ee=_.xr.getDepthSensingMesh();Ee!==null&&iu(Ee,q,-1/0,_.sortObjects)}iu(R,q,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(Y,$),Te=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,Te&&ze.addToRenderList(g,R),this.info.render.frame++,Me===!0&&be.beginShadows();let ee=p.state.shadowsArray;Ne.render(ee,R,q),Me===!0&&be.endShadows(),this.info.autoReset===!0&&this.info.reset();let ne=g.opaque,K=g.transmissive;if(p.setupLights(),q.isArrayCamera){let Ee=q.cameras;if(K.length>0)for(let De=0,He=Ee.length;De<He;De++){let Be=Ee[De];Id(ne,K,R,Be)}Te&&ze.render(R);for(let De=0,He=Ee.length;De<He;De++){let Be=Ee[De];Cd(g,R,Be,Be.viewport)}}else K.length>0&&Id(ne,K,R,q),Te&&ze.render(R),Cd(g,R,q);C!==null&&A===0&&(pe.updateMultisampleRenderTarget(C),pe.updateRenderTargetMipmap(C)),R.isScene===!0&&R.onAfterRender(_,R,q),le.resetDefaultState(),E=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],Me===!0&&be.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function iu(R,q,ee,ne){if(R.visible===!1)return;if(R.layers.test(q.layers)){if(R.isGroup)ee=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(q);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Ce.intersectsSprite(R)){ne&&Re.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ie);let De=V.update(R),He=R.material;He.visible&&g.push(R,De,He,ee,Re.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Ce.intersectsObject(R))){let De=V.update(R),He=R.material;if(ne&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Re.copy(R.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),Re.copy(De.boundingSphere.center)),Re.applyMatrix4(R.matrixWorld).applyMatrix4(ie)),Array.isArray(He)){let Be=De.groups;for(let qe=0,Ke=Be.length;qe<Ke;qe++){let We=Be[qe],rt=He[We.materialIndex];rt&&rt.visible&&g.push(R,De,rt,ee,Re.z,We)}}else He.visible&&g.push(R,De,He,ee,Re.z,null)}}let Ee=R.children;for(let De=0,He=Ee.length;De<He;De++)iu(Ee[De],q,ee,ne)}function Cd(R,q,ee,ne){let K=R.opaque,Ee=R.transmissive,De=R.transparent;p.setupLightsView(ee),Me===!0&&be.setGlobalState(_.clippingPlanes,ee),ne&&J.viewport(P.copy(ne)),K.length>0&&Sa(K,q,ee),Ee.length>0&&Sa(Ee,q,ee),De.length>0&&Sa(De,q,ee),J.buffers.depth.setTest(!0),J.buffers.depth.setMask(!0),J.buffers.color.setMask(!0),J.setPolygonOffset(!1)}function Id(R,q,ee,ne){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[ne.id]===void 0&&(p.state.transmissionRenderTarget[ne.id]=new hn(1,1,{generateMipmaps:!0,type:W.has("EXT_color_buffer_half_float")||W.has("EXT_color_buffer_float")?ii:ni,minFilter:Pn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace}));let Ee=p.state.transmissionRenderTarget[ne.id],De=ne.viewport||P;Ee.setSize(De.z*_.transmissionResolutionScale,De.w*_.transmissionResolutionScale);let He=_.getRenderTarget(),Be=_.getActiveCubeFace(),qe=_.getActiveMipmapLevel();_.setRenderTarget(Ee),_.getClearColor(k),U=_.getClearAlpha(),U<1&&_.setClearColor(16777215,.5),_.clear(),Te&&ze.render(ee);let Ke=_.toneMapping;_.toneMapping=Gi;let We=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),p.setupLightsView(ne),Me===!0&&be.setGlobalState(_.clippingPlanes,ne),Sa(R,ee,ne),pe.updateMultisampleRenderTarget(Ee),pe.updateRenderTargetMipmap(Ee),W.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let xt=0,Dt=q.length;xt<Dt;xt++){let Et=q[xt],yt=Et.object,Xe=Et.geometry,wt=Et.material,lt=Et.group;if(wt.side===St&&yt.layers.test(ne.layers)){let Tn=wt.side;wt.side=Xt,wt.needsUpdate=!0,Pd(yt,ee,ne,Xe,wt,lt),wt.side=Tn,wt.needsUpdate=!0,rt=!0}}rt===!0&&(pe.updateMultisampleRenderTarget(Ee),pe.updateRenderTargetMipmap(Ee))}_.setRenderTarget(He,Be,qe),_.setClearColor(k,U),We!==void 0&&(ne.viewport=We),_.toneMapping=Ke}function Sa(R,q,ee){let ne=q.isScene===!0?q.overrideMaterial:null;for(let K=0,Ee=R.length;K<Ee;K++){let De=R[K],He=De.object,Be=De.geometry,qe=De.group,Ke=De.material;Ke.allowOverride===!0&&ne!==null&&(Ke=ne),He.layers.test(ee.layers)&&Pd(He,q,ee,Be,Ke,qe)}}function Pd(R,q,ee,ne,K,Ee){R.onBeforeRender(_,q,ee,ne,K,Ee),R.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),K.onBeforeRender(_,q,ee,ne,R,Ee),K.transparent===!0&&K.side===St&&K.forceSinglePass===!1?(K.side=Xt,K.needsUpdate=!0,_.renderBufferDirect(ee,q,ne,K,R,Ee),K.side=Qn,K.needsUpdate=!0,_.renderBufferDirect(ee,q,ne,K,R,Ee),K.side=St):_.renderBufferDirect(ee,q,ne,K,R,Ee),R.onAfterRender(_,q,ee,ne,K,Ee)}function ba(R,q,ee){q.isScene!==!0&&(q=ae);let ne=ce.get(R),K=p.state.lights,Ee=p.state.shadowsArray,De=K.state.version,He=j.getParameters(R,K.state,Ee,q,ee),Be=j.getProgramCacheKey(He),qe=ne.programs;ne.environment=R.isMeshStandardMaterial?q.environment:null,ne.fog=q.fog,ne.envMap=(R.isMeshStandardMaterial?ke:Oe).get(R.envMap||ne.environment),ne.envMapRotation=ne.environment!==null&&R.envMap===null?q.environmentRotation:R.envMapRotation,qe===void 0&&(R.addEventListener("dispose",ue),qe=new Map,ne.programs=qe);let Ke=qe.get(Be);if(Ke!==void 0){if(ne.currentProgram===Ke&&ne.lightsStateVersion===De)return Dd(R,He),Ke}else He.uniforms=j.getUniforms(R),R.onBeforeCompile(He,_),Ke=j.acquireProgram(He,Be),qe.set(Be,Ke),ne.uniforms=He.uniforms;let We=ne.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(We.clippingPlanes=be.uniform),Dd(R,He),ne.needsLights=eg(R),ne.lightsStateVersion=De,ne.needsLights&&(We.ambientLightColor.value=K.state.ambient,We.lightProbe.value=K.state.probe,We.directionalLights.value=K.state.directional,We.directionalLightShadows.value=K.state.directionalShadow,We.spotLights.value=K.state.spot,We.spotLightShadows.value=K.state.spotShadow,We.rectAreaLights.value=K.state.rectArea,We.ltc_1.value=K.state.rectAreaLTC1,We.ltc_2.value=K.state.rectAreaLTC2,We.pointLights.value=K.state.point,We.pointLightShadows.value=K.state.pointShadow,We.hemisphereLights.value=K.state.hemi,We.directionalShadowMap.value=K.state.directionalShadowMap,We.directionalShadowMatrix.value=K.state.directionalShadowMatrix,We.spotShadowMap.value=K.state.spotShadowMap,We.spotLightMatrix.value=K.state.spotLightMatrix,We.spotLightMap.value=K.state.spotLightMap,We.pointShadowMap.value=K.state.pointShadowMap,We.pointShadowMatrix.value=K.state.pointShadowMatrix),ne.currentProgram=Ke,ne.uniformsList=null,Ke}function Ld(R){if(R.uniformsList===null){let q=R.currentProgram.getUniforms();R.uniformsList=Vr.seqWithValue(q.seq,R.uniforms)}return R.uniformsList}function Dd(R,q){let ee=ce.get(R);ee.outputColorSpace=q.outputColorSpace,ee.batching=q.batching,ee.batchingColor=q.batchingColor,ee.instancing=q.instancing,ee.instancingColor=q.instancingColor,ee.instancingMorph=q.instancingMorph,ee.skinning=q.skinning,ee.morphTargets=q.morphTargets,ee.morphNormals=q.morphNormals,ee.morphColors=q.morphColors,ee.morphTargetsCount=q.morphTargetsCount,ee.numClippingPlanes=q.numClippingPlanes,ee.numIntersection=q.numClipIntersection,ee.vertexAlphas=q.vertexAlphas,ee.vertexTangents=q.vertexTangents,ee.toneMapping=q.toneMapping}function jm(R,q,ee,ne,K){q.isScene!==!0&&(q=ae),pe.resetTextureUnits();let Ee=q.fog,De=ne.isMeshStandardMaterial?q.environment:null,He=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Qt,Be=(ne.isMeshStandardMaterial?ke:Oe).get(ne.envMap||De),qe=ne.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,Ke=!!ee.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),We=!!ee.morphAttributes.position,rt=!!ee.morphAttributes.normal,xt=!!ee.morphAttributes.color,Dt=Gi;ne.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Dt=_.toneMapping);let Et=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,yt=Et!==void 0?Et.length:0,Xe=ce.get(ne),wt=p.state.lights;if(Me===!0&&(te===!0||R!==M)){let ln=R===M&&ne.id===E;be.setState(ne,R,ln)}let lt=!1;ne.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==wt.state.version||Xe.outputColorSpace!==He||K.isBatchedMesh&&Xe.batching===!1||!K.isBatchedMesh&&Xe.batching===!0||K.isBatchedMesh&&Xe.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Xe.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Xe.instancing===!1||!K.isInstancedMesh&&Xe.instancing===!0||K.isSkinnedMesh&&Xe.skinning===!1||!K.isSkinnedMesh&&Xe.skinning===!0||K.isInstancedMesh&&Xe.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Xe.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Xe.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Xe.instancingMorph===!1&&K.morphTexture!==null||Xe.envMap!==Be||ne.fog===!0&&Xe.fog!==Ee||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==be.numPlanes||Xe.numIntersection!==be.numIntersection)||Xe.vertexAlphas!==qe||Xe.vertexTangents!==Ke||Xe.morphTargets!==We||Xe.morphNormals!==rt||Xe.morphColors!==xt||Xe.toneMapping!==Dt||Xe.morphTargetsCount!==yt)&&(lt=!0):(lt=!0,Xe.__version=ne.version);let Tn=Xe.currentProgram;lt===!0&&(Tn=ba(ne,q,K));let ir=!1,wn=!1,no=!1,At=Tn.getUniforms(),Un=Xe.uniforms;if(J.useProgram(Tn.program)&&(ir=!0,wn=!0,no=!0),ne.id!==E&&(E=ne.id,wn=!0),ir||M!==R){J.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),At.setValue(T,"projectionMatrix",R.projectionMatrix),At.setValue(T,"viewMatrix",R.matrixWorldInverse);let pn=At.map.cameraPosition;pn!==void 0&&pn.setValue(T,Ae.setFromMatrixPosition(R.matrixWorld)),G.logarithmicDepthBuffer&&At.setValue(T,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&At.setValue(T,"isOrthographic",R.isOrthographicCamera===!0),M!==R&&(M=R,wn=!0,no=!0)}if(K.isSkinnedMesh){At.setOptional(T,K,"bindMatrix"),At.setOptional(T,K,"bindMatrixInverse");let ln=K.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),At.setValue(T,"boneTexture",ln.boneTexture,pe))}K.isBatchedMesh&&(At.setOptional(T,K,"batchingTexture"),At.setValue(T,"batchingTexture",K._matricesTexture,pe),At.setOptional(T,K,"batchingIdTexture"),At.setValue(T,"batchingIdTexture",K._indirectTexture,pe),At.setOptional(T,K,"batchingColorTexture"),K._colorsTexture!==null&&At.setValue(T,"batchingColorTexture",K._colorsTexture,pe));let Fn=ee.morphAttributes;if((Fn.position!==void 0||Fn.normal!==void 0||Fn.color!==void 0)&&Se.update(K,ee,Tn),(wn||Xe.receiveShadow!==K.receiveShadow)&&(Xe.receiveShadow=K.receiveShadow,At.setValue(T,"receiveShadow",K.receiveShadow)),ne.isMeshGouraudMaterial&&ne.envMap!==null&&(Un.envMap.value=Be,Un.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),ne.isMeshStandardMaterial&&ne.envMap===null&&q.environment!==null&&(Un.envMapIntensity.value=q.environmentIntensity),wn&&(At.setValue(T,"toneMappingExposure",_.toneMappingExposure),Xe.needsLights&&Qm(Un,no),Ee&&ne.fog===!0&&re.refreshFogUniforms(Un,Ee),re.refreshMaterialUniforms(Un,ne,z,H,p.state.transmissionRenderTarget[R.id]),Vr.upload(T,Ld(Xe),Un,pe)),ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(Vr.upload(T,Ld(Xe),Un,pe),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&At.setValue(T,"center",K.center),At.setValue(T,"modelViewMatrix",K.modelViewMatrix),At.setValue(T,"normalMatrix",K.normalMatrix),At.setValue(T,"modelMatrix",K.matrixWorld),ne.isShaderMaterial||ne.isRawShaderMaterial){let ln=ne.uniformsGroups;for(let pn=0,su=ln.length;pn<su;pn++){let _s=ln[pn];ye.update(_s,Tn),ye.bind(_s,Tn)}}return Tn}function Qm(R,q){R.ambientLightColor.needsUpdate=q,R.lightProbe.needsUpdate=q,R.directionalLights.needsUpdate=q,R.directionalLightShadows.needsUpdate=q,R.pointLights.needsUpdate=q,R.pointLightShadows.needsUpdate=q,R.spotLights.needsUpdate=q,R.spotLightShadows.needsUpdate=q,R.rectAreaLights.needsUpdate=q,R.hemisphereLights.needsUpdate=q}function eg(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(R,q,ee){let ne=ce.get(R);ne.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),ce.get(R.texture).__webglTexture=q,ce.get(R.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:ee,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,q){let ee=ce.get(R);ee.__webglFramebuffer=q,ee.__useDefaultFramebuffer=q===void 0};let tg=T.createFramebuffer();this.setRenderTarget=function(R,q=0,ee=0){C=R,w=q,A=ee;let ne=!0,K=null,Ee=!1,De=!1;if(R){let Be=ce.get(R);if(Be.__useDefaultFramebuffer!==void 0)J.bindFramebuffer(T.FRAMEBUFFER,null),ne=!1;else if(Be.__webglFramebuffer===void 0)pe.setupRenderTarget(R);else if(Be.__hasExternalTextures)pe.rebindTextures(R,ce.get(R.texture).__webglTexture,ce.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let We=R.depthTexture;if(Be.__boundDepthTexture!==We){if(We!==null&&ce.has(We)&&(R.width!==We.image.width||R.height!==We.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");pe.setupDepthRenderbuffer(R)}}let qe=R.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(De=!0);let Ke=ce.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ke[q])?K=Ke[q][ee]:K=Ke[q],Ee=!0):R.samples>0&&pe.useMultisampledRTT(R)===!1?K=ce.get(R).__webglMultisampledFramebuffer:Array.isArray(Ke)?K=Ke[ee]:K=Ke,P.copy(R.viewport),N.copy(R.scissor),B=R.scissorTest}else P.copy(fe).multiplyScalar(z).floor(),N.copy(ve).multiplyScalar(z).floor(),B=we;if(ee!==0&&(K=tg),J.bindFramebuffer(T.FRAMEBUFFER,K)&&ne&&J.drawBuffers(R,K),J.viewport(P),J.scissor(N),J.setScissorTest(B),Ee){let Be=ce.get(R.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+q,Be.__webglTexture,ee)}else if(De){let Be=q;for(let qe=0;qe<R.textures.length;qe++){let Ke=ce.get(R.textures[qe]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+qe,Ke.__webglTexture,ee,Be)}}else if(R!==null&&ee!==0){let Be=ce.get(R.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Be.__webglTexture,ee)}E=-1},this.readRenderTargetPixels=function(R,q,ee,ne,K,Ee,De,He=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=ce.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(Be=Be[De]),Be){J.bindFramebuffer(T.FRAMEBUFFER,Be);try{let qe=R.textures[He],Ke=qe.format,We=qe.type;if(!G.textureFormatReadable(Ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!G.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=R.width-ne&&ee>=0&&ee<=R.height-K&&(R.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+He),T.readPixels(q,ee,ne,K,_e.convert(Ke),_e.convert(We),Ee))}finally{let qe=C!==null?ce.get(C).__webglFramebuffer:null;J.bindFramebuffer(T.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(R,q,ee,ne,K,Ee,De,He=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Be=ce.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(Be=Be[De]),Be)if(q>=0&&q<=R.width-ne&&ee>=0&&ee<=R.height-K){J.bindFramebuffer(T.FRAMEBUFFER,Be);let qe=R.textures[He],Ke=qe.format,We=qe.type;if(!G.textureFormatReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!G.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let rt=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,rt),T.bufferData(T.PIXEL_PACK_BUFFER,Ee.byteLength,T.STREAM_READ),R.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+He),T.readPixels(q,ee,ne,K,_e.convert(Ke),_e.convert(We),0);let xt=C!==null?ce.get(C).__webglFramebuffer:null;J.bindFramebuffer(T.FRAMEBUFFER,xt);let Dt=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await sp(T,Dt,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,rt),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,Ee),T.deleteBuffer(rt),T.deleteSync(Dt),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,q=null,ee=0){let ne=Math.pow(2,-ee),K=Math.floor(R.image.width*ne),Ee=Math.floor(R.image.height*ne),De=q!==null?q.x:0,He=q!==null?q.y:0;pe.setTexture2D(R,0),T.copyTexSubImage2D(T.TEXTURE_2D,ee,0,0,De,He,K,Ee),J.unbindTexture()};let ng=T.createFramebuffer(),ig=T.createFramebuffer();this.copyTextureToTexture=function(R,q,ee=null,ne=null,K=0,Ee=null){Ee===null&&(K!==0?(Tr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Ee=K,K=0):Ee=0);let De,He,Be,qe,Ke,We,rt,xt,Dt,Et=R.isCompressedTexture?R.mipmaps[Ee]:R.image;if(ee!==null)De=ee.max.x-ee.min.x,He=ee.max.y-ee.min.y,Be=ee.isBox3?ee.max.z-ee.min.z:1,qe=ee.min.x,Ke=ee.min.y,We=ee.isBox3?ee.min.z:0;else{let Fn=Math.pow(2,-K);De=Math.floor(Et.width*Fn),He=Math.floor(Et.height*Fn),R.isDataArrayTexture?Be=Et.depth:R.isData3DTexture?Be=Math.floor(Et.depth*Fn):Be=1,qe=0,Ke=0,We=0}ne!==null?(rt=ne.x,xt=ne.y,Dt=ne.z):(rt=0,xt=0,Dt=0);let yt=_e.convert(q.format),Xe=_e.convert(q.type),wt;q.isData3DTexture?(pe.setTexture3D(q,0),wt=T.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(pe.setTexture2DArray(q,0),wt=T.TEXTURE_2D_ARRAY):(pe.setTexture2D(q,0),wt=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,q.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,q.unpackAlignment);let lt=T.getParameter(T.UNPACK_ROW_LENGTH),Tn=T.getParameter(T.UNPACK_IMAGE_HEIGHT),ir=T.getParameter(T.UNPACK_SKIP_PIXELS),wn=T.getParameter(T.UNPACK_SKIP_ROWS),no=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,Et.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Et.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,qe),T.pixelStorei(T.UNPACK_SKIP_ROWS,Ke),T.pixelStorei(T.UNPACK_SKIP_IMAGES,We);let At=R.isDataArrayTexture||R.isData3DTexture,Un=q.isDataArrayTexture||q.isData3DTexture;if(R.isDepthTexture){let Fn=ce.get(R),ln=ce.get(q),pn=ce.get(Fn.__renderTarget),su=ce.get(ln.__renderTarget);J.bindFramebuffer(T.READ_FRAMEBUFFER,pn.__webglFramebuffer),J.bindFramebuffer(T.DRAW_FRAMEBUFFER,su.__webglFramebuffer);for(let _s=0;_s<Be;_s++)At&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ce.get(R).__webglTexture,K,We+_s),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ce.get(q).__webglTexture,Ee,Dt+_s)),T.blitFramebuffer(qe,Ke,De,He,rt,xt,De,He,T.DEPTH_BUFFER_BIT,T.NEAREST);J.bindFramebuffer(T.READ_FRAMEBUFFER,null),J.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(K!==0||R.isRenderTargetTexture||ce.has(R)){let Fn=ce.get(R),ln=ce.get(q);J.bindFramebuffer(T.READ_FRAMEBUFFER,ng),J.bindFramebuffer(T.DRAW_FRAMEBUFFER,ig);for(let pn=0;pn<Be;pn++)At?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Fn.__webglTexture,K,We+pn):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Fn.__webglTexture,K),Un?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ln.__webglTexture,Ee,Dt+pn):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,ln.__webglTexture,Ee),K!==0?T.blitFramebuffer(qe,Ke,De,He,rt,xt,De,He,T.COLOR_BUFFER_BIT,T.NEAREST):Un?T.copyTexSubImage3D(wt,Ee,rt,xt,Dt+pn,qe,Ke,De,He):T.copyTexSubImage2D(wt,Ee,rt,xt,qe,Ke,De,He);J.bindFramebuffer(T.READ_FRAMEBUFFER,null),J.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else Un?R.isDataTexture||R.isData3DTexture?T.texSubImage3D(wt,Ee,rt,xt,Dt,De,He,Be,yt,Xe,Et.data):q.isCompressedArrayTexture?T.compressedTexSubImage3D(wt,Ee,rt,xt,Dt,De,He,Be,yt,Et.data):T.texSubImage3D(wt,Ee,rt,xt,Dt,De,He,Be,yt,Xe,Et):R.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,Ee,rt,xt,De,He,yt,Xe,Et.data):R.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,Ee,rt,xt,Et.width,Et.height,yt,Et.data):T.texSubImage2D(T.TEXTURE_2D,Ee,rt,xt,De,He,yt,Xe,Et);T.pixelStorei(T.UNPACK_ROW_LENGTH,lt),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Tn),T.pixelStorei(T.UNPACK_SKIP_PIXELS,ir),T.pixelStorei(T.UNPACK_SKIP_ROWS,wn),T.pixelStorei(T.UNPACK_SKIP_IMAGES,no),Ee===0&&q.generateMipmaps&&T.generateMipmap(wt),J.unbindTexture()},this.initRenderTarget=function(R){ce.get(R).__webglFramebuffer===void 0&&pe.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?pe.setTextureCube(R,0):R.isData3DTexture?pe.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?pe.setTexture2DArray(R,0):pe.setTexture2D(R,0),J.unbindTexture()},this.resetState=function(){w=0,A=0,C=null,J.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}};var Nh=new Map;async function Hp(s){let e=["cartoon-wood","cartoon-linen","cartoon-paper","island-limestone-cartoon","kuri-atlas",...s==="night"?["cartoon-night"]:[]];return Object.fromEntries(await Promise.all(e.map(async t=>(Nh.has(t)||Nh.set(t,new Promise(n=>{let i=new Image;i.onload=()=>n(i),i.onerror=()=>n(null),i.src=t==="kuri-atlas"?"/world/textures/kuri-material-atlas.png":`/world/textures/${t}.webp`})),[t,await Nh.get(t)]))))}function Vp(s,e,t){let n={"cartoon-wood":"woodColor","cartoon-linen":"linenColor","cartoon-paper":"paperColor","island-limestone-cartoon":"stoneColor","kuri-enamel":"enamelColor","kuri-atlas":"kuriAtlas"};for(let[i,r]of Object.entries(n)){if(!e?.[i])continue;s[r]&&(t.delete(s[r]),s[r].dispose());let o=new Tt(e[i]);o.name=i,o.colorSpace=Qe,o.wrapS=o.wrapT=Hn,o.anisotropy=4,o.needsUpdate=!0,r==="linenColor"&&o.repeat.set(3,3),t.add(o),s[r]=o}return s}function Gp(s,e){s.traverse(t=>{if(!t.isMesh)return;let n=t.material;if(n.name!=="kuri-decal"){if(e.kuriAtlas&&["kuri-enamel","kuri-red","kuri-canvas","kuri-joint"].includes(n.name)){n.map=e.kuriAtlas,n.bumpMap=n.map,n.bumpScale=n.name==="kuri-canvas"?.0015:.001,n.color.set(16777215),n.roughnessMap=null,n.roughness=n.name==="kuri-canvas"?.94:n.name==="kuri-joint"?.58:.55,n.needsUpdate=!0;return}["kuri-eye","kuri-face","kuri-brass","kuri-joint"].includes(n.name)?(n.map=null,n.bumpMap=null):["kuri-enamel","kuri-red"].includes(n.name)?(n.map=e.enamelColor||e.paperColor,n.bumpMap=n.map||null,n.bumpScale=.002,n.roughnessMap=n.map||null,n.roughness=.8,n.onBeforeCompile=i=>{i.fragmentShader=i.fragmentShader.replace("#include <roughnessmap_fragment>",`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
 vec4 texelRoughness = texture2D(roughnessMap, vRoughnessMapUv);
 roughnessFactor *= 1.0 - 0.48 * texelRoughness.g;
#endif`)},n.customProgramCacheKey=()=>"kuri-worn-enamel-v1"):n.name==="kuri-canvas"?(n.map=e.linenColor,n.bumpMap=e.linenBump,n.bumpScale=.003):["shirt","pants","bag","shoe"].includes(n.name)?(n.map=e.linenColor,n.bumpMap=e.linenBump,n.bumpScale=.002):(n.map=e.paperColor||null,n.bumpMap=e.paperBump,n.bumpScale=.001),n.needsUpdate=!0}})}function Oc(s){return s.wrapS=Hn,s.wrapT=zn,s.repeat.set(2,1),s.needsUpdate=!0,s}function Bc(){let e=new Uint8Array(4096);for(let n=0;n<32;n++)for(let i=0;i<32;i++){let r=(n*32+i)*4,o=Math.hypot((i+.5)/32*2-1,(n+.5)/32*2-1);e[r]=e[r+1]=e[r+2]=255,e[r+3]=Math.max(0,1-o)**2*255}let t=new dn(e,32,32);return t.needsUpdate=!0,t.magFilter=It,t}var aM;function Wp(){return aM??=Promise.all(["island-limestone-cartoon","island-sky-cartoon"].map(s=>new Promise(e=>{let t=new Image;t.onload=()=>e(t),t.onerror=()=>e(null),t.src=`/world/textures/${s}.webp`})))}function Xp({group:s,images:e=[],stoneMap:t,ownedTextures:n,ownedMaterials:i,ownedGeometries:r}){let o=v=>{if(!v)return null;let y=new Tt(v);return y.colorSpace=Qe,y.needsUpdate=!0,n.add(y),y},a=t||o(e[0]);a&&(a.wrapS=a.wrapT=Hn,a.repeat.set(2,2),a.anisotropy=4);let l=o(e[1]);l&&Oc(l);let c=new Nt(225,40,24);r.add(c);let h=new mt({map:l,color:l?16777215:10211813,side:Xt,depthWrite:!1,fog:!1});i.add(h);let u=new Je(c,h);u.name="ambient-island-sky",u.renderOrder=-2,s.add(u);let f=new Nt(1,12,8);r.add(f);let d=new Ot({color:16775144,roughness:1});i.add(d);let m=new pi(f,d,18);m.name="ambient-clouds",s.add(m);let x=new pt,g=-1;function p(v){if(v!==g){g=v,u.rotation.y=.3+v*.0015;for(let y=0;y<18;y++){let _=Math.floor(y/6),b=y%6,w=[-12,2,16][_],A=[-9,-13,-7][_];x.position.set(w+(b-2.5)*.9+Math.sin(v*.025+_)*1.1,6.2+_*.7+Math.sin(b*2.4)*.3,A+Math.cos(b*1.9)*.5),x.scale.set(1.25,.5+b%3*.2,.8),x.updateMatrix(),m.setMatrixAt(y,x.matrix)}m.instanceMatrix.needsUpdate=!0,m.computeBoundingSphere()}}return p(0),{stone:a,update:p}}function qp(s){let e=s.getObjectByName("ArmR"),t=s.getObjectByName("ElbowR"),n=new L(0,-.24,.01),i=.24,r=n.length(),o=new L(0,-1,0),a=new L,l=new L,c=new L,h=new L,u=new L,f=new Ct,d=new Ct,m=new Ct,x=new Ct,g=new Ct;return{update(p,v=0){if(!e||!t||(e.rotation.set(e.rotation.x,0,0),t.rotation.set(t.rotation.x,0,0),!p||v<=0))return;x.copy(e.quaternion),g.copy(t.quaternion),s.updateWorldMatrix(!0,!0),e.getWorldPosition(a),l.copy(p).sub(a);let y=e.getWorldScale(new L).x,_=i*y,b=r*y,w=Pt.clamp(l.length(),.005,_+b-1e-4);l.normalize(),e.parent.getWorldQuaternion(f),c.set(1,0,0).applyQuaternion(f).addScaledVector(l,-new L(1,0,0).applyQuaternion(f).dot(l)),c.lengthSq()<.001&&c.set(0,0,1).addScaledVector(l,-l.z),c.normalize();let A=(_*_+w*w-b*b)/(2*w),C=Math.sqrt(Math.max(0,_*_-A*A));h.copy(a).addScaledVector(l,A).addScaledVector(c,C),u.copy(h).sub(a).normalize().applyQuaternion(f.clone().invert()),m.setFromUnitVectors(o,u),e.quaternion.copy(x).slerp(m,v),e.updateWorldMatrix(!0,!0),e.getWorldQuaternion(d),t.getWorldPosition(h),u.copy(p).sub(h).normalize().applyQuaternion(d.invert()),m.setFromUnitVectors(n.clone().normalize(),u),t.quaternion.copy(g).slerp(m,v)},handPosition(){return s.updateWorldMatrix(!0,!0),t?t.localToWorld(n.clone()):null}}}var $s={paper:{name:"Paper Workshop",number:"01",subtitle:"A desk for every chapter.",intro:"Start with the things I build. Choose a desk, or walk over and explore.",theme:"warm"},night:{name:"After Hours Studio",number:"02",subtitle:"A closer look at the work.",intro:"Take a seat, switch on a lamp, and look inside the projects.",theme:"night"},islands:{name:"Career Archipelago",number:"03",subtitle:"Follow the path from build to lead.",intro:"Cross the bridges between applications, document AI, and engineering leadership.",theme:"sea"}},Vn={build:{eyebrow:"01 / Build",title:"Mobile & web",subtitle:"Sribuu \xB7 BintanGO \xB7 Telkomcel",body:"I started with web and mobile applications, then grew into leading mobile teams. The work expanded from writing features to shaping architecture, reviewing code, and helping other engineers.",facts:[["Sribuu","Built the Flutter apps and later led the mobile team. Clean architecture, code reviews, research, and optimisation."],["BintanGO","Led and trained the mobile team, with responsibility for code reviews and app architecture."],["Telkomcel","Developed commercial apps including Mytimor, Musica, and the eLib-UNTL digital library."]],link:"/#experience",linkText:"Full experience"},ai:{eyebrow:"02 / Explore",title:"Documents into data",subtitle:"Fintelite \xB7 Machine Learning Engineer \xB7 2024",body:"I built OCR models and pipelines for text detection, recognition, and entity extraction, integrating LLMs into document processing. Later, as Tech Lead, I fine-tuned LLMs with the Data Team to improve extraction accuracy.",facts:[["A small example","Run the document machine to see a synthetic invoice mapped to named fields. This is a scripted illustration, not a live OCR service."]],link:"/#document-demo",linkText:"See the document example",demo:!0},lead:{eyebrow:"03 / Lead",title:"Engineering at Fintelite",subtitle:"Tech Lead \xB7 July 2024\u2013present",body:"I manage engineers across Fintelite Group\u2019s AI-powered fintech products, including AnyCheck. The work connects architecture and technical delivery with product priorities.",facts:[["Systems","Reduced infrastructure costs while improving system performance. The measured result is in the main portfolio."],["Delivery","Eliminated critical technical debt and modernised architecture to accelerate delivery."],["Product alignment","Brought Product and Engineering together, helping secure major enterprise deals."]],link:"/#impact",linkText:"Read the results"},source:{eyebrow:"The bookshelf",title:"Open source",subtitle:"Small tools, experiments, and references",body:"A few projects I share on GitHub. Each book opens its repository.",repositories:[["nutrizer","Nutrition tracking","nutrizer"],["mina-finansial","Personal finance","mina-finansial"],["CI3 AgGrid Server-Side","PHP data tables","codeigniter_aggrid"],["Game Center","Flutter architecture reference","game_center"]]},reports:{eyebrow:"Inside the studio",title:"SCM Tools",subtitle:"PT. Tanjung Enim Lestari \xB7 2019\u20132020",body:"Alongside ERP maintenance, I built tools to analyse and manage supply-chain information and deliver automated reports through a Telegram bot.",facts:[["Tools","PHP \xB7 MySQL \xB7 Oracle \xB7 Node.js"]],image:"/assets/project-reports.webp",link:"/#work",linkText:"Other projects"}};var Js=[{title:"Mobile & web",body:Vn.build.body.split(". ")[0]+"."},{title:"A growing role",body:Vn.build.body.split(". ").slice(1).join(". ")},...Vn.build.facts.map(([s,e])=>({title:s,body:e}))];function Yp({group:s,mesh:e,box:t,mat:n,detail:i,ownedTextures:r,ownedMaterials:o,batch:a,x:l}){let c=new Ze;c.name="story-workstation",c.position.set(l+.42,1.205,-1.58),s.add(c);let h=n(12763576,{metalness:.35,roughness:.37,bumpMap:i.metalBump,bumpScale:8e-4}),u=n(13815747,{metalness:.7,roughness:.28}),f=n(2369828,{roughness:.48}),d=n(5132618,{roughness:.95}),m=new Ze;c.add(m),t(0,.026,0,1.24,.052,.87,h,m),t(0,.05,-.09,1.12,.008,.43,f,m);let x=new Ze,g=new Ze;x.name="keyboard-close",g.name="keyboard-distant",c.add(x,g);for(let D=0;D<4;D++)for(let H=0;H<12;H++){let z=-.51+H*.092,Y=-.245+D*.098;t(z,.06,Y,.074,.014,.078,d,x),e(new Kt(.074,.014,.078),d,z,.06,Y,g)}a(x),a(g),x.visible=!1,t(0,.059,.12,.39,.009,.066,d,m),t(0,.055,.285,.4,.005,.2,u,m),t(0,.058,.285,.386,.005,.186,h,m);for(let D of[-1,1])t(D*.594,.028,.07,.003,.019,.1,f,m),t(D*.595,.028,.23,.003,.012,.035,f,m);let p=e(new Ut(.026,.026,.97,16),u,0,.066,-.38,m);p.rotation.z=Math.PI/2,a(m);let v=new Ze;v.position.set(0,.066,-.38),v.rotation.x=-.12,c.add(v),t(0,.47,0,1.24,.94,.037,h,v),t(0,.47,.022,1.19,.89,.012,f,v);let y=e(new Nt(.009,12,8),f,0,.911,.033,v);y.name="webcam";let _=document.createElement("canvas");_.width=1024,_.height=768;let b=_.getContext("2d"),w=new gn(_);w.colorSpace=Qe,w.anisotropy=4,w.name="workstation-story-display",r.add(w);let A=new mt({map:w,toneMapped:!1});o.add(A);let C=e(new Ft(1.12,.84),A,0,.47,.03,v);C.castShadow=!1,C.receiveShadow=!1,C.name="readable-laptop-screen",A.toneMapped=!1;let E=n(14202742,{emissive:14395485,emissiveIntensity:.5,transparent:!0,opacity:.65,depthWrite:!1}),M=e(new Fi(.078,.008,6,32),E,.51,.084,.3,c);M.rotation.x=-Math.PI/2,M.castShadow=!1;let P=0,N=0,B=!1,k=new L;function U(D=0){P=Pt.clamp(D,0,Js.length-1);let H=Js[P];b.fillStyle="#efe9d9",b.fillRect(0,0,1024,768),b.fillStyle="#ac4934",b.fillRect(0,0,1024,9),b.fillStyle="#6f7167",b.font="24px sans-serif",b.fillText("ARIEF WIJAYA  /  WORK JOURNAL",62,65),b.fillStyle="#242f29",b.font="58px Georgia",b.fillText(H.title,62,163),b.fillStyle="#c5bda9",b.fillRect(62,194,900,2),b.fillStyle="#343e36",b.font="52px sans-serif";let z=[],Y="";for(let $ of H.body.split(" "))(Y+" "+$).trim().length>31?(z.push(Y),Y=$):Y+=(Y?" ":"")+$;Y&&z.push(Y),z.forEach(($,fe)=>b.fillText($,62,265+fe*65)),b.fillStyle="#a24834",b.font="26px sans-serif",b.fillText(`${String(P+1).padStart(2,"0")} / ${String(Js.length).padStart(2,"0")}`,62,717),b.fillStyle="#6f7167",b.fillText("MOBILE  \u2192  ARCHITECTURE  \u2192  PEOPLE",250,717),w.needsUpdate=!0}return U(),{object:c,updateView(D,H){c.getWorldPosition(k);let z=1.24*H/(2*Math.tan(Pt.degToRad(D.fov/2))*Math.max(.01,D.position.distanceTo(k)));z>140?x.visible=!0:z<112&&(x.visible=!1),g.visible=!x.visible},paint:U,get page(){return P},setReading(D){B=D},view(){return{position:new L(l+.42,2.08,1),target:new L(l+.42,1.75,-1.98),span:1.35}},update(D,{calm:H=!1,near:z=!1}={}){N+=H?0:D,M.visible=!B,E.opacity=z?.95:H?.45:.45+Math.sin(N*2)*.12,v.rotation.x=Pt.damp(v.rotation.x,B?-.2:-.12,5,D)}}}function Zp(s,e){let t=new Set;for(let n of s)for(let i of[...Object.values(n.attributes),n.index].filter(Boolean))t.add((i.isInterleavedBufferAttribute?i.data.array:i.array).buffer);return{geometries:s.size,geometryBytes:[...t].reduce((n,i)=>n+i.byteLength,0),textures:e.size,textureBytes:[...e].reduce((n,i)=>n+(i.image?.data?.byteLength||0),0)}}function Kp(s){if(!["127.0.0.1","localhost"].includes(location.hostname)||new URLSearchParams(location.search).get("profile")!=="1")return null;let e=document.createElement("pre");e.id="world-profile",e.setAttribute("aria-label","Local rendering measurements"),e.style.cssText="position:fixed;z-index:8;right:16px;bottom:92px;background:#f7f1e9ed;color:#222;padding:10px;font:11px/1.35 monospace;pointer-events:none;max-width:90vw;white-space:pre-wrap",document.body.append(e),s.info.autoReset=!1;let t=0,n=0,i="",r=[],o=[],a,l=(c,h)=>[...c].sort((u,f)=>u-f)[Math.floor((c.length-1)*h)]||0;return{begin(){return s.info.reset(),performance.now()},end(c,h,u,f){let d=`${f}:${innerWidth}x${innerHeight}:${s.domElement.dataset.renderQuality}`;i!==d&&(i=d,r=[],o=[],t=0,n=h,a=u.resourceStats()),t&&h-t<500&&r.push(h-t),t=h,o.push(performance.now()-c),!(h-n<2e3)&&(n=h,e.textContent=JSON.stringify({world:f,viewport:[innerWidth,innerHeight],quality:s.domElement.dataset.renderQuality,frames:r.length,frameMedianMs:+l(r,.5).toFixed(2),frameP95Ms:+l(r,.95).toFixed(2),cpuMedianMs:+l(o,.5).toFixed(2),drawCalls:s.info.render.calls,triangles:s.info.render.triangles,gpuGeometries:s.info.memory.geometries,gpuTextures:s.info.memory.textures,programs:s.info.programs.length,owned:a},null,1),r=[],o=[])}}}var js=(s,e,t,n)=>e+(s-e)*Math.exp(-t*n),zc=(s,e,t,n)=>s+Math.atan2(Math.sin(e-s),Math.cos(e-s))*(1-Math.exp(-t*n)),Wr=(s,e)=>Math.hypot(s.x-e.x,s.z-e.z);function Uh(s,e,t,n=.24){return e.some(r=>s.x>=r[0]+n&&s.x<=r[2]-n&&s.z>=r[1]+n&&s.z<=r[3]-n)&&!t.some(r=>s.x>r[0]-n&&s.x<r[2]+n&&s.z>r[1]-n&&s.z<r[3]+n)}function hs(s,e,t){let n=Math.max(1,Math.ceil(Wr(s,e)/.12));for(let i=0;i<=n;i++)if(!t({x:s.x+(e.x-s.x)*i/n,z:s.z+(e.z-s.z)*i/n}))return!1;return!0}function $p(s,e,t,n=.35){if(!t(e))return[];if(hs(s,e,t))return[e];let i=(f,d)=>`${f},${d}`,r=f=>({x:Math.round(f.x/n),z:Math.round(f.z/n)}),o=r(s),a=r(e),l=[{...o,g:0,f:0}],c=new Map,h=new Set,u=i(o.x,o.z);c.set(u,{g:0,parent:null});for(let f=0;l.length&&f<9e3;f++){l.sort((g,p)=>p.f-g.f);let d=l.pop(),m=i(d.x,d.z);if(h.has(m))continue;h.add(m);let x={x:d.x*n,z:d.z*n};if(Math.abs(d.x-a.x)<=1&&Math.abs(d.z-a.z)<=1&&hs(x,e,t)){let g=[e],p=m;for(;p!==u;){let[_,b]=p.split(",").map(Number);g.unshift({x:_*n,z:b*n}),p=c.get(p).parent}if(g.length&&!hs(s,g[0],t))return[];let v=[],y=s;for(let _=0;_<g.length;){let b=_;for(;b+1<g.length&&hs(y,g[b+1],t);)b++;v.push(g[b]),y=g[b],_=b+1}return v}for(let g=-1;g<=1;g++)for(let p=-1;p<=1;p++){if(!g&&!p)continue;let v=d.x+g,y=d.z+p,_=i(v,y),b={x:v*n,z:y*n};if(h.has(_)||!hs(x,b,t))continue;let w=d.g+Math.hypot(g,p);w>=(c.get(_)?.g??1/0)||(c.set(_,{g:w,parent:m}),l.push({x:v,z:y,g:w,f:w+Math.hypot(v-a.x,y-a.z)}))}}return[]}function Jp(s,e,t,n){let i={x:s.x+e.x*t,z:s.z+e.z*t};if(hs(s,i,n))return i;let r={x:i.x,z:s.z},o={x:s.x,z:i.z};return hs(s,r,n)?r:hs(s,o,n)?o:{...s}}var Qs=s=>Number.isFinite(s)?s:0;function jp({radius:s=44,deadZone:e=.08}={}){let t=null,n={x:0,y:0},i={x:0,z:0},r={x:0,y:0};return{get active(){return t!==null},get pointerId(){return t},get value(){return{...i}},get thumb(){return{...r}},begin(o,a,l){return t!==null?!1:(t=o,n={x:Qs(a),y:Qs(l)},!0)},move(o,a,l){if(o!==t)return{...i};let c=Qs(a)-n.x,h=Qs(l)-n.y,u=Math.hypot(c,h),f=Math.min(1,u/s),d=f<=e?0:Math.pow((f-e)/(1-e),1.15),m=u?c/u:0,x=u?h/u:0;return i={x:m*d,z:x*d},r={x:m*f*s,y:x*f*s},{...i}},end(o){return o!==t?!1:(this.reset(),!0)},reset(){t=null,i={x:0,z:0},r={x:0,y:0}}}}function Qp({threshold:s=6}={}){let e=null;return{get active(){return e!==null},get pointerId(){return e?.id??null},begin(t,n,i){return e?!1:(e={id:t,x:n,y:i,startX:n,startY:i,drag:!1},!0)},move(t,n,i){if(!e||e.id!==t)return null;let r=n-e.x,o=i-e.y;return Math.hypot(n-e.startX,i-e.startY)>s&&(e.drag=!0),e.x=n,e.y=i,e.drag?{x:r,y:o}:null},end(t){if(!e||e.id!==t)return null;let n={tap:!e.drag,x:e.x,y:e.y};return e=null,n},reset(){e=null}}}function em(s,e,t){let n=Qs(e.x),i=Qs(e.z),r=Math.hypot(n,i)>.001,o=s.x*n+s.z*i<0,a=r?o?22:14:26,l=Math.max(0,Qs(t)),c={x:js(s.x,n,a,l),z:js(s.z,i,a,l)};return!r&&Math.hypot(c.x,c.z)<.008?{x:0,z:0}:c}var tm=s=>s==="diorama"||s==="top";function nm(){let s=0;return{transition(){s=.3},step(e,{calm:t=!1,idle:n=!1}={}){if(!Number.isFinite(e)||e<=0)return 0;let i=!t||!n||s>0;return s=Math.max(0,s-e),i?e:0}}}var lM=new Set(["diorama","third","first","top"]),Fh=new L(0,1,0),im=new L(44,60,84),cM=1.45,uM=1.05,sm=.22,hM=3.5,Mn=(s,e=0)=>Number.isFinite(s)?s:e;function rm(){let s=new Ht(8,1.5,.06,350),e=new L,t=new L,n=new L,i=new L,r=new L,o=new L,a=new Ye,l=new Cn(0,0,0,"YXZ"),c=new Ct,h=new Hs,u=new L,f=new L,d=new L,m=new L,x=[],g=[[0,0],[.16,0],[-.16,0],[0,.16],[0,-.16]],p="diorama",v=1200,y=800,_="paper",b=0,w=-.2,A=0,C=0,E=!1,M=!1,P=0,N=!0,B=!1,k=8,U=0,D=null;function H(ve){let we=v<800?12.5:_==="islands"?28:23,Ce=v<800?Math.min(we/s.aspect,20):we/s.aspect;return Pt.radToDeg(2*Math.atan(Ce/(2*ve)))}function z(){return p==="diorama"?H(im.length()):p==="top"?H(90):p==="first"?68:v<800?62:55}function Y(ve,we,Ce){f.subVectors(we,ve);let Me=f.length();if(Me<.001||!Ce.length)return Me;f.divideScalar(Me),d.crossVectors(f,Fh),d.lengthSq()<1e-5?d.set(1,0,0):d.normalize(),m.crossVectors(d,f).normalize();let te=Me;h.near=0,h.far=Me+.16;for(let[ie,Ae]of g)u.copy(ve).addScaledVector(d,ie).addScaledVector(m,Ae),h.set(u,f),x.length=0,h.intersectObjects(Ce,!1,x),x.length&&(te=Math.min(te,Math.max(.04,x[0].distance-.2)));return te}function $(ve,{position:we={x:0,z:0},calm:Ce=!1,colliders:Me=[],snap:te=!1}={}){let ie=Math.max(0,Mn(ve));if(D){D.time=Math.min(1,D.time+(Ce?1:ie/1.35));let O=D.time,W=O*O*O*(O*(O*6-15)+10),G=D.from.clone().sub(D.target),J=D.position.clone().sub(D.target),se=Math.exp(Pt.lerp(Math.log(G.length()),Math.log(J.length()),W));G.normalize().lerp(J.normalize(),W).normalize().multiplyScalar(se),s.position.copy(D.target).add(G),a.lookAt(D.position,D.target,Fh),c.setFromRotationMatrix(a),s.quaternion.copy(D.rotation).slerp(c,W);let ce=Math.max(D.span/s.aspect,D.height||1.65),pe=Pt.radToDeg(2*Math.atan(ce/(2*D.position.distanceTo(D.target))));s.fov=Pt.lerp(D.fov,pe,W),s.near=Math.max(.06,(se-8)*.1),s.updateProjectionMatrix(),s.updateMatrixWorld(!0),E=O<1;return}let Ae=te||N||Ce||!B,Re=Ae?1:-Math.expm1(-8*ie),ae=Mn(we.x),Te=Mn(we.y),Z=Mn(we.z);if(p==="diorama"||p==="top"){let O=v<800?1:Ce?0:.13;t.set(ae*O,0,Z*O),e.copy(t),p==="diorama"?e.add(im):(e.y+=90,e.z+=.001),o.copy(t)}else{if(t.set(ae,Te+(p==="third"?uM:cM),Z),i.set(Math.sin(b)*Math.cos(w),Math.sin(w),-Math.cos(b)*Math.cos(w)),e.copy(t),p==="third"){e.addScaledVector(i,-hM);let O=Y(t,e,Me);e.copy(t).addScaledVector(i,-O)}o.copy(e).add(i)}a.lookAt(e,o,Fh),c.setFromRotationMatrix(a),l.setFromRotationMatrix(a,"YXZ");let T=Ae?1:-Math.expm1(-(P>0?18:8)*ie);if(A+=(l.x-A)*T,C+=Math.atan2(Math.sin(l.y-C),Math.cos(l.y-C))*T,s.quaternion.setFromEuler(l.set(A,C,0,"YXZ")),Ae)s.position.copy(e),M=!1;else if(M){U+=ie;let O=Math.min(1,U/.9),W=O*O*(3-2*O);s.position.lerpVectors(n,e,W),M=O<1}else p==="first"?s.position.copy(e):s.position.lerp(e,Re);if(p==="third"){let O=Y(t,s.position,Me),W=s.position.distanceTo(t);O<W&&s.position.sub(t).setLength(O).add(t),s.position.y=Math.max(.25,s.position.y)}k=z(),s.fov+=(k-s.fov)*Re,s.near=p==="diorama"||p==="top"?Math.max(.06,(s.position.distanceTo(o)-8)*.1):.06,s.updateProjectionMatrix(),s.updateMatrixWorld(!0),E=!Ae&&(s.position.distanceToSquared(e)>1e-4||Math.abs(s.fov-k)>.01||s.quaternion.angleTo(c)>.001),P=Math.max(0,P-ie),N=!1,B=!0}let fe={camera:s,get focused(){return!!D},focusOn(ve){D={...ve,from:s.position.clone(),rotation:s.quaternion.clone(),fov:s.fov,time:0},E=!0},releaseFocus(){D&&(D=null,n.copy(s.position),U=0,M=!0,E=!0,l.setFromQuaternion(s.quaternion,"YXZ"),A=l.x,C=l.y)},get mode(){return p},get isFirstPerson(){return p==="first"},get transitioning(){return E},resize(ve,we,Ce=_){v=Math.max(1,Mn(ve,1)),y=Math.max(1,Mn(we,1)),_=Ce,s.aspect=v/y,!E&&!D&&(s.fov=z()),s.updateProjectionMatrix()},setMode(ve,{calm:we=!1}={}){return lM.has(ve)?(ve===p||(p=ve,E=!0,M=!0,N=we,n.copy(s.position),U=0,p==="third"&&(w=Math.min(w,sm))),!0):!1},look(ve,we){p!=="first"&&p!=="third"||((Mn(ve)||Mn(we))&&(P=.18),b=(b+Mn(ve)*.0035)%(Math.PI*2),w=Pt.clamp(w-Mn(we)*.0035,-1.35,p==="third"?sm:1.35))},movement(ve,we){return r.set(1,0,0).applyQuaternion(s.quaternion),r.y=0,r.normalize(),{x:r.x*Mn(ve)-r.z*Mn(we),z:r.z*Mn(ve)+r.x*Mn(we)}},update:$};return $(0,{snap:!0}),fe}var Xr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Ln=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},dM=new Hi(-1,1,1,-1,0,1),Oh=class extends ht{constructor(){super(),this.setAttribute("position",new ot([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ot([0,2,0,0,2,0],2))}},fM=new Oh,ds=class{constructor(e){this._mesh=new Je(fM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,dM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var qr=class extends Ln{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Gt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ri.clone(e.uniforms),this.material=new Gt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new ds(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var aa=class extends Ln{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}},kc=class extends Ln{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Hc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new ge);this._width=n.width,this._height=n.height,t=new hn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ii}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new qr(Xr),this.copyPass.material.blending=$t,this.clock=new $o}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}aa!==void 0&&(o instanceof aa?n=!0:o instanceof kc&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ge);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Vc=class extends Ln{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ve}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}};var Gc=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,i,r,o=.5*(Math.sqrt(3)-1),a=(e+t)*o,l=Math.floor(e+a),c=Math.floor(t+a),h=(3-Math.sqrt(3))/6,u=(l+c)*h,f=l-u,d=c-u,m=e-f,x=t-d,g,p;m>x?(g=1,p=0):(g=0,p=1);let v=m-g+h,y=x-p+h,_=m-1+2*h,b=x-1+2*h,w=l&255,A=c&255,C=this.perm[w+this.perm[A]]%12,E=this.perm[w+g+this.perm[A+p]]%12,M=this.perm[w+1+this.perm[A+1]]%12,P=.5-m*m-x*x;P<0?n=0:(P*=P,n=P*P*this._dot(this.grad3[C],m,x));let N=.5-v*v-y*y;N<0?i=0:(N*=N,i=N*N*this._dot(this.grad3[E],v,y));let B=.5-_*_-b*b;return B<0?r=0:(B*=B,r=B*B*this._dot(this.grad3[M],_,b)),70*(n+i+r)}noise3d(e,t,n){let i,r,o,a,c=(e+t+n)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),f=Math.floor(n+c),d=1/6,m=(h+u+f)*d,x=h-m,g=u-m,p=f-m,v=e-x,y=t-g,_=n-p,b,w,A,C,E,M;v>=y?y>=_?(b=1,w=0,A=0,C=1,E=1,M=0):v>=_?(b=1,w=0,A=0,C=1,E=0,M=1):(b=0,w=0,A=1,C=1,E=0,M=1):y<_?(b=0,w=0,A=1,C=0,E=1,M=1):v<_?(b=0,w=1,A=0,C=0,E=1,M=1):(b=0,w=1,A=0,C=1,E=1,M=0);let P=v-b+d,N=y-w+d,B=_-A+d,k=v-C+2*d,U=y-E+2*d,D=_-M+2*d,H=v-1+3*d,z=y-1+3*d,Y=_-1+3*d,$=h&255,fe=u&255,ve=f&255,we=this.perm[$+this.perm[fe+this.perm[ve]]]%12,Ce=this.perm[$+b+this.perm[fe+w+this.perm[ve+A]]]%12,Me=this.perm[$+C+this.perm[fe+E+this.perm[ve+M]]]%12,te=this.perm[$+1+this.perm[fe+1+this.perm[ve+1]]]%12,ie=.6-v*v-y*y-_*_;ie<0?i=0:(ie*=ie,i=ie*ie*this._dot3(this.grad3[we],v,y,_));let Ae=.6-P*P-N*N-B*B;Ae<0?r=0:(Ae*=Ae,r=Ae*Ae*this._dot3(this.grad3[Ce],P,N,B));let Re=.6-k*k-U*U-D*D;Re<0?o=0:(Re*=Re,o=Re*Re*this._dot3(this.grad3[Me],k,U,D));let ae=.6-H*H-z*z-Y*Y;return ae<0?a=0:(ae*=ae,a=ae*ae*this._dot3(this.grad3[te],H,z,Y)),32*(i+r+o+a)}noise4d(e,t,n,i){let r=this.grad4,o=this.simplex,a=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,u,f,d,m,x=(e+t+n+i)*l,g=Math.floor(e+x),p=Math.floor(t+x),v=Math.floor(n+x),y=Math.floor(i+x),_=(g+p+v+y)*c,b=g-_,w=p-_,A=v-_,C=y-_,E=e-b,M=t-w,P=n-A,N=i-C,B=E>M?32:0,k=E>P?16:0,U=M>P?8:0,D=E>N?4:0,H=M>N?2:0,z=P>N?1:0,Y=B+k+U+D+H+z,$=o[Y][0]>=3?1:0,fe=o[Y][1]>=3?1:0,ve=o[Y][2]>=3?1:0,we=o[Y][3]>=3?1:0,Ce=o[Y][0]>=2?1:0,Me=o[Y][1]>=2?1:0,te=o[Y][2]>=2?1:0,ie=o[Y][3]>=2?1:0,Ae=o[Y][0]>=1?1:0,Re=o[Y][1]>=1?1:0,ae=o[Y][2]>=1?1:0,Te=o[Y][3]>=1?1:0,Z=E-$+c,T=M-fe+c,O=P-ve+c,W=N-we+c,G=E-Ce+2*c,J=M-Me+2*c,se=P-te+2*c,ce=N-ie+2*c,pe=E-Ae+3*c,Oe=M-Re+3*c,ke=P-ae+3*c,I=N-Te+3*c,S=E-1+4*c,V=M-1+4*c,j=P-1+4*c,re=N-1+4*c,Q=g&255,Pe=p&255,be=v&255,Ne=y&255,ze=a[Q+a[Pe+a[be+a[Ne]]]]%32,Se=a[Q+$+a[Pe+fe+a[be+ve+a[Ne+we]]]]%32,X=a[Q+Ce+a[Pe+Me+a[be+te+a[Ne+ie]]]]%32,he=a[Q+Ae+a[Pe+Re+a[be+ae+a[Ne+Te]]]]%32,_e=a[Q+1+a[Pe+1+a[be+1+a[Ne+1]]]]%32,le=.6-E*E-M*M-P*P-N*N;le<0?h=0:(le*=le,h=le*le*this._dot4(r[ze],E,M,P,N));let ye=.6-Z*Z-T*T-O*O-W*W;ye<0?u=0:(ye*=ye,u=ye*ye*this._dot4(r[Se],Z,T,O,W));let F=.6-G*G-J*J-se*se-ce*ce;F<0?f=0:(F*=F,f=F*F*this._dot4(r[X],G,J,se,ce));let oe=.6-pe*pe-Oe*Oe-ke*ke-I*I;oe<0?d=0:(oe*=oe,d=oe*oe*this._dot4(r[he],pe,Oe,ke,I));let me=.6-S*S-V*V-j*j-re*re;return me<0?m=0:(me*=me,m=me*me*this._dot4(r[_e],S,V,j,re)),27*(h+u+f+d+m)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}_dot4(e,t,n,i,r){return e[0]*t+e[1]*n+e[2]*i+e[3]*r}};var la={name:"SSAOShader",defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new ge},cameraProjectionMatrix:{value:new Ye},cameraInverseProjectionMatrix:{value:new Ye},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == 1.0 ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background

			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`},ca={name:"SSAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},ua={name:"SSAOBlurShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ge}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`};var ha=class s extends Ln{constructor(e,t,n=512,i=512,r=32){super(),this.width=n,this.height=i,this.clear=!0,this.needsSwap=!1,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=[],this._generateSampleKernel(r),this._generateRandomKernelRotations();let o=new Ns;o.format=us,o.type=cs,this.normalRenderTarget=new hn(this.width,this.height,{minFilter:Vt,magFilter:Vt,type:ii,depthTexture:o}),this.ssaoRenderTarget=new hn(this.width,this.height,{type:ii}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new Gt({defines:Object.assign({},la.defines),uniforms:ri.clone(la.uniforms),vertexShader:la.vertexShader,fragmentShader:la.fragmentShader,blending:$t}),this.ssaoMaterial.defines.KERNEL_SIZE=r,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Go,this.normalMaterial.blending=$t,this.blurMaterial=new Gt({defines:Object.assign({},ua.defines),uniforms:ri.clone(ua.uniforms),vertexShader:ua.vertexShader,fragmentShader:ua.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new Gt({defines:Object.assign({},ca.defines),uniforms:ri.clone(ca.uniforms),vertexShader:ca.vertexShader,fragmentShader:ca.fragmentShader,blending:$t}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Gt({uniforms:ri.clone(Xr.uniforms),vertexShader:Xr.vertexShader,fragmentShader:Xr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Il,blendDst:jo,blendEquation:ei,blendSrcAlpha:Cl,blendDstAlpha:jo,blendEquationAlpha:ei}),this._fsQuad=new ds(null),this._originalClearColor=new Ve}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}render(e,t,n){switch(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this._renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this._renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case s.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=$t,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case s.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=$t,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case s.OUTPUT.Depth:this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:n);break;case s.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=$t,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case s.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Rl,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}setSize(e,t){this.width=e,this.height=t,this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}_renderPass(e,t,n,i,r){e.getClearColor(this._originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(o)}_renderOverride(e,t,n,i,r){e.getClearColor(this._originalClearColor);let o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(o)}_generateSampleKernel(e){let t=this.kernel;for(let n=0;n<e;n++){let i=new L;i.x=Math.random()*2-1,i.y=Math.random()*2-1,i.z=Math.random(),i.normalize();let r=n/e;r=Pt.lerp(.1,1,r*r),i.multiplyScalar(r),t.push(i)}}_generateRandomKernelRotations(){let n=new Gc,i=16,r=new Float32Array(i);for(let o=0;o<i;o++){let a=Math.random()*2-1,l=Math.random()*2-1,c=0;r[o]=n.noise3d(a,l,c)}this.noiseTexture=new dn(r,4,4,Br,yn),this.noiseTexture.wrapS=un,this.noiseTexture.wrapT=un,this.noiseTexture.needsUpdate=!0}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}};ha.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4};var da={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Wc=class extends Ln{constructor(){super(),this.uniforms=ri.clone(da.uniforms),this.material=new Vo({name:da.name,uniforms:this.uniforms,vertexShader:da.vertexShader,fragmentShader:da.fragmentShader}),this._fsQuad=new ds(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},nt.getTransfer(this._outputColorSpace)===ut&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Bl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===zl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===kl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ur?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Vl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Gl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Hl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var om={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ge(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`};var Bh=class extends ha{constructor(...e){super(...e),this.ssaoRenderTarget.depthBuffer=!1,this.blurRenderTarget.depthBuffer=!1}dispose(){this.ssaoMaterial.dispose(),this.noiseTexture.dispose(),super.dispose()}_overrideVisibility(){super._overrideVisibility(),this.scene.traverse(e=>{e.isSprite&&e.visible&&(e.visible=!1,this._visibilityCache.push(e))})}};function am(s,e,t){let n=new Hc(s),i=new Bh(e,t,512,512,16),r=new qr(om);i.ssaoMaterial.defines.PERSPECTIVE_CAMERA=1,i.depthRenderMaterial.defines.PERSPECTIVE_CAMERA=1,i.kernelRadius=.6,i.minDistance=.002,i.maxDistance=.1,n.addPass(new Vc(e,t)),n.addPass(i),n.addPass(new Wc),n.addPass(r);let o=!1;return{resize(a,l){o=a>=800;let c=Math.min(devicePixelRatio,1.4);n.setPixelRatio(o?c:1),n.setSize(o?a:1,o?l:1),r.uniforms.resolution.value.set(1/(a*c),1/(l*c)),s.domElement.dataset.renderQuality=o?"ambient-occlusion":"mobile"},render(a){o?(i.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(t.projectionMatrix),i.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(t.projectionMatrixInverse),i.ssaoMaterial.uniforms.cameraNear.value=t.near,i.ssaoMaterial.uniforms.cameraFar.value=t.far,n.render(a)):s.render(e,t)},dispose(){n.passes.forEach(a=>a.dispose?.()),n.dispose()}}}function lm({group:s,surfaces:e,ownedMaterials:t,ownedGeometries:n,batch:i}){let r=new Ze;r.name="paper-home",s.add(r);let o=(_,b=null,w={})=>{let A=new Ot({color:_,map:b,roughness:.9,...w});return t.add(A),A},a=o(11239767,e.woodColor),l=o(14997700,e.paperColor),c=o(12958119),h=o(9270109,e.woodColor),u=o(9326140,e.linenColor),f=o(7175275),d=o(4017738),m=(_,b,w,A,C,E,M)=>{let P=new Kt(A,C,E);n.add(P);let N=new Je(P,M);return N.position.set(_,b,w),N.receiveShadow=!0,r.add(N),N};m(0,-1.3,0,34,1,22,a).name="human-desk";for(let _ of[-15,15])for(let b of[-9,9])m(_,-8,b,1.4,13,1.4,a);m(0,-15,0,130,.5,130,h);let x=(_,b,w,A,C,E,M,P)=>{let N=new Ft(A,C);n.add(N);let B=new Je(N,P);B.position.set(_,b,w),B.rotation.set(E,M,0),B.name="home-interior-wall",r.add(B)};x(0,18,-45,110,66,0,0,c),x(-55,18,0,100,66,0,Math.PI/2,c),x(55,18,0,100,66,0,-Math.PI/2,c),x(0,18,50,110,66,0,Math.PI,c),x(0,51,0,110,100,Math.PI/2,0,l);let g=o(13230819,null,{emissive:11848913,emissiveIntensity:.55});m(-18,22,-44.5,31,30,.6,a),m(-18,22,-44,29,28,.2,g);for(let _ of[-32,-18,-4])m(_,22,-43.7,.6,28,.4,l);m(-18,22,-43.7,29,.6,.4,l),m(-18,6.7,-43,33,.7,3,a);for(let _ of[-36,0])m(_,21,-43,6,33,1.1,l);for(let _ of[22,38])m(_,7,-39,1,44,7,a);for(let _ of[-14,-4,6,16,28])m(30,_,-39,17,1,7,a);for(let _=0;_<4;_++)for(let b=0;b<7;b++){let w=6+b%3,A=m(24+b*1.8,-13.4+_*10+w/2,-38,1.4,w,4.3,[l,u,f,d][(b+_)%4]);A.rotation.z=b===6?-.1:0}m(-26,-5,6,11,1,10,f),m(-30,3,6,1,16,10,a);for(let _ of[-30,-22])for(let b of[2,10])m(_,-10,b,1,10,1,a);let p=o(14137200,null,{emissive:16762748,emissiveIntensity:.16});m(12,-.5,-7,4,.3,4,d),m(12,8,-7,.5,17,.5,d),m(9,16,-7,6,.5,.5,d);let v=new as(3,3,20,1,!0);n.add(v);let y=new Je(v,p);return y.position.set(6,14.5,-7),r.add(y),i?i(r):r}function cm({group:s,ownedMaterials:e,ownedGeometries:t,stoneMap:n}){let i=new Ze;i.name="night-city",s.add(i);let r=new Kt(1,1,1);t.add(r);let o=(v,y={})=>{let _=new Ot({color:v,roughness:.88,...y});return e.add(_),_},a=o(4612214,{map:n}),l=o(6521756,{map:n}),c=o(6387330),h=o(1517881),u=(v,y,_,b,w,A,C)=>{let E=new Je(r,C);return E.position.set(v,y,_),E.scale.set(b,w,A),E.receiveShadow=!0,i.add(E),E};u(0,-14.4,.2,16.9,27.8,8.8,a).name="studio-tower";for(let v=-2;v>-28;v-=2.3)u(0,v,.2,17.12,.12,9,c);u(0,-.55,.2,17.65,.22,9.55,l),u(0,-29,0,230,.5,230,h);let f=o(3426138);for(let v=-4;v<=4;v++){let y=v*13+6.5;u(y,-28.72,0,3.2,.035,120,f),u(0,-28.72,y,120,.035,3.2,f)}let d=[{x:0,z:.2,w:16.9,d:8.8,top:-.75,bottom:-28}];for(let v=-4;v<=4;v++)for(let y=-4;y<=4;y++){if(Math.abs(v)<2&&Math.abs(y)<2)continue;let _=Math.abs(Math.sin(v*17.1+y*8.7)),b=4+_*12,w=v*13,A=y*13,C=3+_*2,E=3+(1-_)*2;u(w,-28+b/2,A,C,b,E,a),u(w,-28+b+.12,A,C+.3,.24,E+.3,l),d.push({x:w,z:A,w:C,d:E,top:-28+b,bottom:-28})}let m=[],x=new pt;for(let v of d)for(let y=v.bottom+1;y<v.top-1;y+=2.3){for(let _=-v.w/2+.8;_<v.w/2-.3;_+=1.45)for(let b of[-1,1])Math.sin(_*8+y*2+v.x+v.z)>.2&&(x.position.set(v.x+_,y,v.z+b*(v.d/2+.025)),x.scale.set(.65,.95,.035),x.updateMatrix(),m.push(x.matrix.clone()));for(let _=-v.d/2+.8;_<v.d/2-.3;_+=1.45)for(let b of[-1,1])Math.cos(_*8+y*2+v.x+v.z)>.2&&(x.position.set(v.x+b*(v.w/2+.025),y,v.z+_),x.scale.set(.035,.95,.65),x.updateMatrix(),m.push(x.matrix.clone()))}let g=new pi(r,o(13151107,{emissive:16760165,emissiveIntensity:.3}),m.length);g.name="city-windows",m.forEach((v,y)=>g.setMatrixAt(y,v)),g.computeBoundingSphere(),i.add(g);let p=new Map;for(let v of[...i.children])!v.isMesh||v.isInstancedMesh||v.name==="studio-tower"||(v.updateMatrix(),p.has(v.material)||p.set(v.material,[]),p.get(v.material).push(v.matrix.clone()),i.remove(v));for(let[v,y]of p){let _=new pi(r,v,y.length);y.forEach((b,w)=>_.setMatrixAt(w,b)),_.computeBoundingSphere(),i.add(_)}return i}function um({group:s,target:e,ownedMaterials:t,ownedGeometries:n,ownedTextures:i,props:r=[],cameraColliders:o=[]}){let a=(y,_,b)=>{n.add(y),t.add(_);let w=new Je(y,_);return b.add(w),w},l=new Ze;l.name="printer-output-tray",l.position.set(e.position.x,1.47,-.15),s.add(l);let c=a(new Kt(1.25,.07,1.85),new Ot({color:5792347,roughness:.8}),l);c.position.y=-.04,c.userData.target="ai",r.push(c),o.push(c);let h=document.createElement("canvas");h.width=768,h.height=1024;let u=h.getContext("2d");u.fillStyle="#f4ecd8",u.fillRect(0,0,768,1024),u.fillStyle="#b15235",u.fillRect(50,62,80,6),u.font="23px sans-serif",u.fillText("FINTELITE / DOCUMENT LAB",50,110),u.fillStyle="#293a37",u.font="48px Georgia",u.fillText("Documents into data",50,190),u.font="25px sans-serif",u.fillText("Arief Wijaya \xB7 Machine Learning Engineer",50,244),u.fillText("2024",50,283);let f="",d=0;u.font="34px sans-serif";for(let y of Vn.ai.body.split(" "))(f+" "+y).length>31?(u.fillText(f,50,365+d++*46),f=y):f+=(f?" ":"")+y;f&&u.fillText(f,50,365+d*46),u.font="21px sans-serif",u.fillStyle="#68716a",u.fillText("FIELD NOTES \xB7 PRINTED IN THE WORKSHOP",50,970);let m=new gn(h);m.colorSpace=Qe,i.add(m);let x=a(new Ft(1.05,1.4),new mt({map:m,side:St,toneMapped:!1}),l);x.name="printed-field-notes",x.rotation.x=-Math.PI/2,x.position.y=.08,x.visible=!1;let g=0,p=!1;function v(y){let _=Math.max(0,Math.min(1,y));x.position.z=-1.75+1.75*_,x.visible=_>0}return{open(){return g===0&&(p=!0,v(0)),this.view()},get printing(){return p},view(){let y=new L(e.position.x,1.55,-.15);return{target:y,position:y.clone().add(new L(0,2.8,1.7)),span:1.35,height:1.9}},close(){},update(y,_){p&&(g=_?2.4:Math.min(2.4,g+y),v(Math.max(0,g-.35)/2.05),g===2.4&&(p=!1))}}}function hm({group:s,targets:e,readingStations:t,ownedMaterials:n,ownedGeometries:i,ownedTextures:r,props:o=[],cameraColliders:a=[]}){let l={},c=um({group:s,target:e.find(m=>m.id==="ai"),ownedMaterials:n,ownedGeometries:i,ownedTextures:r,props:o,cameraColliders:a});for(let m of["lead","reports","source"]){let x=e.find(D=>D.id===m),g=Vn[m],p=document.createElement("canvas");p.width=1024,p.height=m==="lead"?390:640;let v=p.getContext("2d");v.fillStyle=m==="ai"?"#233d41":"#efe3c8",v.fillRect(0,0,1024,640),v.fillStyle="#bc6e48",v.fillRect(0,0,1024,12),v.fillStyle=m==="ai"?"#efe3c8":"#39453c",v.font="24px sans-serif",v.fillText(g.eyebrow.toUpperCase(),56,m==="lead"?42:65),v.font=m==="lead"?"42px Georgia":"52px Georgia",v.fillText(g.title,56,m==="lead"?104:145),v.font="28px sans-serif",v.fillText(g.subtitle,56,m==="lead"?147:205);let y=g.body.split(". ")[0]+".";v.font=m==="lead"?"30px sans-serif":"39px sans-serif";let _="",b=[];for(let D of y.split(" "))(_+" "+D).length>(m==="lead"?54:40)?(b.push(_),_=D):_+=(_?" ":"")+D;_&&b.push(_),b.slice(0,m==="lead"?4:6).forEach((D,H)=>v.fillText(D,56,m==="lead"?210+H*35:287+H*49)),v.font="22px sans-serif",v.fillText("ARIEF WIJAYA  /  FIELD NOTES",56,m==="lead"?370:608);let w=new gn(p);w.colorSpace=Qe,w.name=`story-${m}`,r.add(w);let A=new Ze;A.name=`story-display-${m}`,A.position.set(x.position.x,x.position.y+.05,x.position.z+.5),s.add(A),m==="ai"&&(A.position.z+=.45),m==="lead"&&A.position.set(x.position.x,1.6,-3.1),m==="source"&&A.position.set(x.position.x-.4,1.4,x.position.z+.75);let C=m==="lead"?3.25:2.45,E=m==="lead"?1.24:C*.625,M=(D,H,z=A)=>{i.add(D),n.add(H);let Y=new Je(D,H);return z.add(Y),Y},P=(D,H,z,Y,$=A)=>M(new Kt(D,H,z),new Ot({color:Y,roughness:.82}),$),N=M(new Ft(C,E),new mt({map:w,toneMapped:!1}));N.position.z=.08;let B=null;if(m==="source"){let D=m==="source"?9125426:11967340;P(C+.15,E+.15,.1,D).position.z=-.04;for(let Me=0;Me<4;Me++){let te=P(C-.02,E-.03,.012,15260868);te.position.z=Me*.018}B=new Ze,B.name=m==="source"?"book-cover-hinge":"folder-cover-hinge",B.position.set(-C/2,0,.11),A.add(B);let H=P(C+.07,E+.1,.035,D,B);H.position.x=C/2,P(C*.65,.035,.012,14204027,B).position.set(C/2,E*.26,.025);let Y=document.createElement("canvas");Y.width=1024,Y.height=640;let $=Y.getContext("2d");$.fillStyle="#e8dcc4",$.fillRect(0,0,1024,640),$.fillStyle="#39453c",$.font="42px Georgia",$.fillText(m==="source"?"From the bookshelf":"Work notes",64,84),(m==="source"?g.repositories:g.facts).forEach(([Me,te],ie)=>{$.font="34px Georgia",$.fillText(Me,64,170+ie*106),$.font="27px sans-serif",$.fillText(te,64,211+ie*106)});let ve=new gn(Y);ve.colorSpace=Qe,r.add(ve);let we=M(new Ft(C-.06,E-.04),new mt({map:ve,toneMapped:!1}),B);we.rotation.y=Math.PI,we.position.set(C/2,0,-.025);let Ce=t[m];A.scale.setScalar(.3),A.rotation.x=-Math.PI/2,A.position.set(Ce.x+C*.3/2,Ce.y,Ce.z)}else m==="reports"?(t.reports.drawer.add(A),A.position.set(0,.788,0),A.scale.setScalar(.48),A.rotation.x=-Math.PI/2,P(C+.05,E+.05,.018,15260868).position.z=.025):A.position.set(x.position.x,1.5,-3.26);B&&A.traverse(D=>{D.isMesh&&(D.userData.target=m,o.push(D))});let k=A.position.clone();A.visible=!0;let U=m==="reports"?t.reports.drawer:null;l[m]={panel:A,hinge:B,drawer:U,rest:k,width:C,height:E,view(D=1.5){let H=B&&D>=.8,z=k.clone();if(B)return H&&(z.x-=C*.3/2),{position:z.clone().add(new L(0,2.4,1.1)),target:z,span:H?C*.3*2.3:C*.3*1.2,height:E*.3+.22};if(U){let Y=t.reports;return z.set(Y.x,.82,Y.z+1),{position:z.clone().add(new L(0,2.4,1.1)),target:z,span:C*.48+.2,height:E*.48+.2}}return{position:z.clone().add(new L(0,.05,1.6)),target:z,span:C+.35,height:E+.7}}}}let h=null,u=0,f=!1,d=(m,x,g)=>{let p=x.panel,v=g*g*(3-2*g);x.hinge?(p.visible=!0,x.hinge.rotation.y=-Math.PI*v):x.drawer&&(x.drawer.position.z=v)};return{open(m,x){h=m,f=!1,u=0;for(let[g,p]of Object.entries(l))d(g,p,0);return m==="ai"?c.open():(c.close(),l[m]?.view(x))},get printing(){return c.printing},view(m){return h==="ai"?c.view():l[h]?.view(m)},close(){c.close(),h&&(f=!0,u=Math.min(u,1.2))},update(m,x){if(c.update(m,x),h==="ai"){f&&(h=null);return}h&&(u=f?Math.max(0,u-m*1.8):u+m,d(h,l[h],x?f?0:1:Math.min(1,u/1.2)),f&&(x||u===0)&&(h=null))}}}function dm({group:s,targets:e,ownedMaterials:t,ownedGeometries:n,ownedTextures:i=new Set}){let r=new Fs(.24,.275,32);n.add(r);let o=e.map(M=>{let P=new mt({color:15252336,transparent:!0,opacity:.45,depthWrite:!1,side:St});t.add(P);let N=new Je(r,P);return N.position.set(M.approach.x,.075,M.approach.z),N.rotation.x=-Math.PI/2,N.name=`interaction-ring-${M.id}`,s.add(N),{target:M,marker:N}}),a=24,l=new Float32Array(a*3),c=new ht;c.setAttribute("position",new ft(l,3)),n.add(c);let h=Bc();i.add(h);let u=new mi({map:h,alphaTest:.02,color:16766877,size:.045,transparent:!0,opacity:0,depthWrite:!1});t.add(u);let f=new Ui(c,u);f.frustumCulled=!1,f.name="interaction-sparks",s.add(f);let d=new mt({color:16767378,transparent:!0,opacity:.9,depthWrite:!1,side:St});t.add(d);let m=new Fs(.3,.365,40);n.add(m);let x=new Je(m,d);x.name="walk-destination",x.rotation.x=-Math.PI/2,x.visible=!1,x.renderOrder=2,s.add(x);let g=new Fs(.365,.405,40);n.add(g);let p=new mt({color:5651243,transparent:!0,opacity:.7,depthWrite:!1,side:St});t.add(p);let v=new Je(g,p);x.add(v);let y=0,_=!1,b=!0,w=!1,A=2,C=0,E=new L;return{setDestination(M,P=!0){x.position.set(M.x,.08,M.z),_=!0,b=P,y=0,w=P,d.color.set(P?15769682:13848387)},cancelDestination(){_=!1,x.visible=!1},trigger(M){let P=e.find(N=>N.id===M);P&&(E.copy(P.position),A=0)},update(M,{near:P,calm:N=!1,hidden:B=!1,walking:k=!1}={}){C+=N?0:M,A+=M,y+=M,w&&!k&&(w=!1,y=0);let U=!k||!b;U&&y>.65&&(_=!1),x.visible=_&&!B;let D=N?1:U?1+y*1.4:1+Math.sin(C*5)*.12;x.scale.setScalar(D),d.opacity=U?Math.max(0,1-y/.65):.95,p.opacity=d.opacity*.7;for(let{target:H,marker:z}of o)z.visible=!B&&P===H.id,z.material.opacity=N?.55:.5+Math.sin(C*2)*.1;if(f.visible=!N&&A<1.1,f.visible){u.opacity=(1-A/1.1)*.8;for(let H=0;H<a;H++){let z=H*2.399,Y=A*(.2+H%5*.07);l[H*3]=E.x+Math.cos(z)*Y,l[H*3+1]=E.y+A*.4-A*A*.3+H%3*.03,l[H*3+2]=E.z+Math.sin(z)*Y}c.attributes.position.needsUpdate=!0}}}}function fm({kind:s,group:e,image:t,ownedMaterials:n,ownedGeometries:i,ownedTextures:r}){let o=s==="night",a=v=>(n.add(v),v),l=v=>(i.add(v),v),c;if(o){let v=null;t&&(v=new Tt(t),v.colorSpace=Qe,v.needsUpdate=!0,r.add(v),Oc(v),v.repeat.set(6,1)),c=new Je(l(new Nt(225,32,20)),a(new mt({map:v,color:v?10201273:1454924,side:Xt,depthWrite:!1,fog:!1}))),c.material.onBeforeCompile=C=>{C.fragmentShader=C.fragmentShader.replace("#include <map_fragment>",`
    #ifdef USE_MAP
     vec2 uv = vMapUv; float elevation = uv.y;
     uv.y = clamp((elevation - .34) * 3.2, 0.0, 1.0);
     vec4 clouds = texture2D(map, uv);
     float band = smoothstep(.32,.43,elevation)*(1.0-smoothstep(.56,.72,elevation));
     vec3 clearSky = mix(vec3(.035,.065,.14),vec3(.085,.14,.23),1.0-elevation);
     diffuseColor.rgb *= mix(clearSky, clouds.rgb, band*.65);
    #endif
   `)},c.material.customProgramCacheKey=()=>"night-cloud-band-v1",c.name="ambient-night-sky",c.renderOrder=-2,e.add(c);let y=new Je(l(new Nt(.8,24,16)),a(new mt({color:16770220})));y.name="ambient-moon",y.position.set(70,60,-110),y.scale.setScalar(8),e.add(y);let _=new ss(a(new Ni({color:16770488,transparent:!0,opacity:.09,depthWrite:!1}))),b=32,w=new Uint8Array(b*b*4);for(let C=0;C<b;C++)for(let E=0;E<b;E++){let M=(C*b+E)*4,P=Math.hypot(E/31*2-1,C/31*2-1);w[M]=w[M+1]=w[M+2]=255,w[M+3]=Math.max(0,1-P)**2*255}let A=new dn(w,b,b);A.needsUpdate=!0,A.magFilter=It,r.add(A),_.material.map=A,_.position.copy(y.position),_.scale.set(32,32,1),e.add(_);for(let C of[-5.2,0,5.2]){let E=new ss(a(new Ni({map:A,color:16760952,transparent:!0,opacity:.24,depthWrite:!1})));E.name="ambient-lamp-glow",E.position.set(C,2.95,-1.5),E.scale.set(2.2,2.2,1),e.add(E)}}let h=o?0:16,u=new Float32Array(h*3),f=[];for(let v=0;v<h;v++){let y=[Math.sin(v*17.3)*(o?15:8),o?2+v%9*.6:.5+v%7*.44,Math.cos(v*7.1)*(o?10:4)];f.push(y),u.set(y,v*3)}let d=l(new ht);d.setAttribute("position",new ft(u,3));let m=Bc();r.add(m);let x=a(new mi({map:m,alphaTest:.03,color:o?16769697:16772559,size:.035,transparent:!0,opacity:o?.7:.42,depthWrite:!1})),g=new Ui(d,x);g.name=o?"ambient-fireflies":"ambient-paper-dust",e.add(g);let p=-1;return{update(v,{calm:y=!1,active:_=!0}={}){if(g.visible=!y&&_,v!==p){p=v,c&&(c.rotation.y=v*7e-4);for(let b=0;b<h;b++){let w=f[b];u[b*3]=w[0]+Math.sin(v*.18+b)*.18,u[b*3+1]=w[1]+Math.sin(v*.23+b*1.7)*.16,u[b*3+2]=w[2]+Math.cos(v*.15+b)*.1}d.attributes.position.needsUpdate=!0,x.opacity=.22+Math.sin(v*.7)*.04}}}}function mm(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new ht,c=0;for(let h=0;h<s.length;++h){let u=s[h],f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(e){let d;if(t)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(t){let h=0,u=[];for(let f=0;f<s.length;++f){let d=s[f].index;for(let m=0;m<d.count;++m)u.push(d.getX(m)+h);h+=s[f].attributes.position.count}l.setIndex(u)}for(let h in r){let u=pm(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let x=0;x<o[h].length;++x)d.push(o[h][x][f]);let m=pm(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function pm(s){let e,t,n,i=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new ft(o,t,n),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let f=0,d=h.count;f<d;f++)for(let m=0;m<t;m++){let x=h.getComponent(f,m);a.setComponent(f+u,m,x)}}else o.set(h.array,l);l+=h.count*t}return i!==void 0&&(a.gpuType=i),a}function zh(s,e){if(e===ch)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===zr||e===ra){let t=s.getIndex();if(t===null){let o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===zr)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function gm({group:s,mat:e,mesh:t,box:n,cylinder:i,paper:r,wood:o,red:a,dark:l,white:c,paperTexture:h,detail:u={},kind:f="paper",ownedGeometries:d,swayMaterial:m=x=>x}){let x=f==="night",g=f==="islands",p={map:u.linenColor||h,bumpMap:u.linenBump,roughnessMap:u.linenRoughness,bumpScale:.016},v={map:u.paperColor||null,bumpMap:u.ceramicBump,roughnessMap:u.ceramicRoughness,bumpScale:.008,roughness:.72},y=e(6776409,{map:u.paperColor||null}),_=e(x?5793637:13745298,p),b=m(e(7964506,{map:u.stoneColor,side:St})),w=m(e(10857077,{map:u.stoneColor,side:St})),A=e(g?12417365:11963238,v),C=e(9598282,{map:u.paperColor||null,metalness:.55,roughness:.68,bumpMap:u.metalBump,roughnessMap:u.metalRoughness,bumpScale:.003}),E=e(x?10333869:15261641,v),M=e(x?8557204:6710363,{map:u.paperColor||null,metalness:.72,roughness:.7,bumpMap:u.metalBump,roughnessMap:u.metalRoughness,bumpScale:.003}),P=e(10987148,{map:u.stoneColor,bumpMap:u.stoneBump,roughnessMap:u.stoneRoughness,bumpScale:.035}),N=e(g?12021579:x?10333869:14733226,v),B=e(l.color),k=e(12362619,p);N.userData.cameraPassThrough=B.userData.cameraPassThrough=!0;let U=(ae,Te,Z)=>{let T=new Ze;return T.position.set(ae,Te,Z),s.add(T),T},D=(ae,Te,Z,T,O=o)=>{let W=new L(...Te),G=new L(...Z),J=t(new Ut(T,T,W.distanceTo(G),8),O,0,0,0,ae);return J.position.copy(W).add(G).multiplyScalar(.5),J.quaternion.setFromUnitVectors(new L(0,1,0),G.sub(W).normalize()),J};function H(ae){ae.updateWorldMatrix(!0,!0);let Te=ae.matrixWorld.clone().invert(),Z=new Map,T=[];ae.traverse(O=>{if(!O.isMesh)return;let W=(O.geometry.index?O.geometry.toNonIndexed():O.geometry.clone()).applyMatrix4(Te.clone().multiply(O.matrixWorld)),G=Z.get(O.material)||[];G.push(W),Z.set(O.material,G),T.push(O)}),T.forEach(O=>{O.removeFromParent(),d.delete(O.geometry)&&O.geometry.dispose()});for(let[O,W]of Z){let G=mm(W,!1);W.forEach(J=>J.dispose()),t(G,O,0,0,0,ae)}return ae}function z(ae,Te,Z,T,O=5,W=1,G=0){let J=new Ze;J.position.set(Te,Z,T),J.rotation.y=G,ae.add(J);for(let se=0;se<O;se++)n((se%3-1)*.009,.012+se*.018,0,.5*W,.012,.69*W,c,J);for(let se=0;se<5;se++)n(-.015,O*.018+.002,-.2*W+se*.079*W,(se===0?.32:.37)*W,.004,.007,y,J)}function Y(ae,Te,Z,T){let O=t(new Ut(.09,.07,.15,12,1,!0),E,Te,Z+.08,T,ae);t(new Ut(.073,.073,.006,12),l,Te,Z+.135,T,ae);let W=t(new Fi(.055,.013,6,12),E,Te+.091,Z+.085,T,ae);W.rotation.y=Math.PI/2}function $(ae,Te,Z,T,O=3){for(let W=0;W<O;W++){let G=W%3===0?a:W%3===1?_:o;n(Te+W%2*.012,Z+W*.065,T,.44,.06,.31,G,ae),n(Te-.007,Z+W*.065,T+.008,.4,.034,.3,c,ae)}}function fe(ae,Te,Z,T=.9,O=s,W=0){let G=new Ze;G.position.set(ae,Te,Z),O.add(G);let J=T/.9;G.scale.setScalar(J);let se=(W+(x?1:g?2:0))%3;if(se===1?n(0,.15,0,.34,.3,.34,N,G):t(new Ut(se===2?.22:.19,se===2?.19:.13,.3,se===2?8:16),N,0,.15,0,G),t(new Ut(.158,.158,.015,12),B,0,.3,0,G),se===2)for(let ce=0;ce<9;ce++){let pe=ce*2.4,Oe=new ti;Oe.moveTo(0,0),Oe.quadraticCurveTo(.11,.16,0,.47),Oe.quadraticCurveTo(-.045,.18,0,0),t(new Os(Oe,4),ce%2?b:w,0,.31,0,G).rotation.set(.55+ce%3*.25,pe,.1)}else for(let ce=0;ce<(se===1?10:7);ce++){let pe=ce*2.4,Oe=[Math.sin(pe)*(.18+ce%2*.08),.5+ce%3*.14,Math.cos(pe)*.23];D(G,[0,.3,0],Oe,.01,b);let ke=new ti;ke.moveTo(0,0),se===1?(ke.quadraticCurveTo(.06,.1,0,.42),ke.quadraticCurveTo(-.04,.14,0,0)):(ke.quadraticCurveTo(.14,.12,0,.36),ke.quadraticCurveTo(-.13,.13,0,0)),t(new Os(ke,5),ce%2?b:w,...Oe,G).rotation.set(-.5+Math.cos(pe)*.65,pe,Math.sin(pe)*.6)}return G}function ve(ae,Te,Z){i(Te,.57,Z,.25,.085,x?_:g?k:o,ae);for(let O=0;O<3;O++){let W=O*Math.PI*2/3;D(ae,[Te+Math.cos(W)*.2,.05,Z+Math.sin(W)*.2],[Te+Math.cos(W)*.14,.57-.03,Z+Math.sin(W)*.14],.027,x?M:o)}if(g)for(let O=0;O<4;O++){let W=t(new Fi(.07+O*.045,.011,4,20),k,Te,.615,Z,ae);W.rotation.x=Math.PI/2}}function we(ae,Te,Z,T){n(Te,Z+.05,T,.32,.045,.23,M,ae),D(ae,[Te,Z+.05,T],[Te,Z+.39,T],.025,M),n(Te,Z+.53,T,.82,.5,.055,l,ae),n(Te,Z+.53,T+.032,.75,.425,.006,_,ae);for(let O=0;O<4;O++)n(Te-.05,Z+.66-O*.082,T+.038,.4-O%3*.065,.018,.004,O===0?E:r,ae);n(Te,Z+.11,T+.31,.66,.035,.23,M,ae);for(let O=0;O<3;O++)for(let W=0;W<9;W++)n(Te-.26+W*.064,Z+.131,T+.24+O*.065,.041,.008,.038,l,ae)}function Ce(ae,Te){let Z=U(ae,0,Te);if(Z.name=`craft-bench-${f}`,x){n(0,1.13,0,2.99,.1,1.3,o,Z),n(0,1.074,0,3.01,.025,1.31,M,Z);for(let T of[-1.26,1.26])n(T,.53,0,.07,1.04,.92,M,Z),n(T,.05,0,.55,.06,1.05,M,Z);n(-.91,.81,-.06,.61,.43,.91,o,Z);for(let T of[.72,.9])n(-.91,T,.407,.29,.025,.023,M,Z)}else{for(let T=0;T<(g?3:4);T++)n(g?-1+T:-1.12+T*.75,1.13,0,g?.985:.745,.12,1.3,o,Z);if(g)for(let T of[-1.16,1.16])D(Z,[T-.19,.05,-.46],[T+.08,1.07,.38],.07),D(Z,[T+.19,.05,.46],[T-.08,1.07,-.38],.07);else for(let T of[-1.26,1.26])for(let O of[-.45,.45])n(T,.54,O,.105,1.08,.105,o,Z);for(let T of[-1.26,1.26])D(Z,[T,.27,-.45],[T,.27,.45],.035);n(0,.9,.48,2.6,.22,.08,o,Z);for(let T of[-.87,.87])n(T,.93,.535,.6,.15,.03,g?o:_,Z),n(T,.94,.57,.14,.023,.035,C,Z)}ve(Z,x?.1:-.75,.22),n(0,1.78,-.59,2.65,1.15,.065,o,Z),n(0,1.78,-.546,2.53,1.03,.022,r,Z);for(let T of[-.72,0,.72]){n(T,1.8,-.525,.44,.75,.025,l,Z),n(T,1.8,-.505,.395,.69,.025,c,Z),n(T,2.08,-.485,.12,.02,.004,y,Z);for(let O=0;O<4;O++)n(T,1.91-O*.11,-.485,O===0?.26:.29,.043,.005,O===0?_:r,Z);n(T,1.53,-.484,.19,.037,.006,a,Z)}x?(we(Z,-.48,1.2,-.23),$(Z,1.14,1.22,.23,2),Y(Z,-1.12,1.19,.29)):g?(z(Z,-.55,1.2,.11,1,1.15,.18),i(-1.12,1.22,.23,.18,.045,P,Z),Y(Z,1.11,1.19,.3)):(n(-.46,1.199,.1,.86,.015,.65,_,Z),z(Z,-.4,1.22,.09,3,.75,-.1),$(Z,1.12,1.22,.2,4),Y(Z,-1.1,1.19,.28)),i(-1.17,1.33,-.3,.085,.22,A,Z);for(let T=0;T<5;T++)D(Z,[-1.17+T%2*.04,1.38,-.3],[-1.2+T*.018,1.65+T%3*.035,-.3],.009,T%2?a:l);return H(Z)}function Me(ae,Te){let Z=U(ae,0,Te);if(Z.name=`craft-meeting-${f}`,x){let T=i(0,1.045,0,1,.1,o,Z);T.scale.z=.72,i(0,.52,0,.095,1,M,Z);let O=i(0,.065,0,.6,.085,M,Z);O.scale.z=.72,n(0,1.104,0,1.32,.018,.61,_,Z),z(Z,-.47,1.13,.12,2,.67,.22),Y(Z,.6,1.105,.19)}else if(g){for(let T=0;T<3;T++)n(-.67+T*.67,1.045,0,.65,.1,1.45,o,Z);for(let T of[-.67,.67])n(T,.5,0,.27,.96,.87,P,Z);n(0,1.105,0,.43,.015,1.35,_,Z),z(Z,-.49,1.12,.2,2,.65,-.2),i(.59,1.14,-.3,.2,.07,A,Z),Y(Z,.55,1.105,.35)}else{for(let T=0;T<4;T++)n(-.75+T*.5,1.045,0,.49,.1,1.45,o,Z);for(let T of[-.8,.8])for(let O of[-.5,.5])n(T,.51,O,.1,1.02,.1,o,Z);z(Z,-.55,1.105,.22,3,.7,-.16),z(Z,.57,1.105,-.2,2,.7,.3),Y(Z,-.66,1.105,-.38),$(Z,.65,1.14,.4,2)}return H(Z)}function te(ae,Te){let Z=U(ae,0,Te);Z.rotation.y=Math.PI/2,Z.name=`craft-shelf-${f}`;for(let T of[-.55,.55])n(T,1.15,0,x?.045:.1,2.3,.47,x?M:o,Z);x?(D(Z,[-.53,.15,-.21],[.53,2.3,-.21],.017,M),D(Z,[.53,.15,-.21],[-.53,2.3,-.21],.017,M)):n(0,1.16,-.215,1.14,2.28,.06,g?o:_,Z);for(let T of[.15,.68,1.22,1.78,2.3])n(0,T,0,1.2,.065,.5,o,Z);for(let T=0;T<4;T++){let O=T===1||T===0&&(x||g)?3:T===3?4:5;for(let W=0;W<O;W++){let G=n(-.44+W*.145,.37+T*.54,0,.105,.29+(W+T)%3*.045,.3,[a,r,_,o][(W+T+(x?1:0))%4],Z);G.rotation.z=W===O-1?-.13:0,n(-.44+W*.145,.43+T*.54,.159,.065,.023,.006,c,Z)}T===1&&$(Z,.31,.745,.015,x?2:3),T===3&&(g?i(.36,1.95,0,.13,.25,A,Z):Y(Z,.36,1.82,.035))}if(x)n(.24,.34,.025,.37,.28,.32,_,Z),n(.24,.35,.19,.16,.04,.008,M,Z);else if(g)for(let T of[.23,.31,.39]){let O=t(new Fi(.15,.026,5,16),k,.35,T,0,Z);O.rotation.x=Math.PI/2}return fe(.2,2.34,0,.6,Z,x?1:2),H(Z)}function ie(ae,Te){let Z=U(ae,0,Te);Z.name="crafted-doorway";for(let S of[-1,1])for(let V=0;V<5;V++)n(S*.607,.145+V*.287,0,.305,.28,.32,r,Z);let T=1.435,O=.452,W=.765;for(let S=0;S<9;S++){let V=S*Math.PI/9+.009,j=(S+1)*Math.PI/9-.009,re=new ti;re.moveTo(Math.cos(V)*O,T+Math.sin(V)*O),re.absarc(0,T,O,V,j,!1),re.lineTo(Math.cos(j)*W,T+Math.sin(j)*W),re.absarc(0,T,W,j,V,!0),re.closePath(),t(new Dr(re,{depth:.32,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:1,steps:1,curveSegments:4}),r,0,0,-.16,Z)}for(let S=0;S<3;S++)n(0,-.12-S*.13,.48+S*.25,1.6+S*.2,.2,.4,r,Z);n(0,.01,-.34,1.07,.018,.42,a,Z),H(Z);let G=new Ze;G.name="door-leaf",G.position.set(-.43,0,0),Z.add(G);let J=S=>1.435+Math.sqrt(Math.max(0,.43*.43-(S-.43)**2));for(let S=0;S<5;S++){let V=S*.172+.004,j=(S+1)*.172-.004,re=new ti;re.moveTo(V,.035),re.lineTo(j,.035),re.lineTo(j,J(j));for(let Q=1;Q<=4;Q++){let Pe=j+(V-j)*Q/4;re.lineTo(Pe,J(Pe))}re.closePath(),t(new Dr(re,{depth:.055,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:1,steps:1,curveSegments:4}),a,0,0,-.0275,G)}for(let S of[.38,1.18])n(.11,S,-.044,.21,.047,.025,C,G),n(.11,S,.044,.21,.047,.025,C,G);for(let S of[-1,1])n(.7,.86,S*.047,.065,.17,.035,C,G),t(new Nt(.038,10,8),C,.7,.88,S*.082,G);H(G);let se=0,ce=0,pe=new ti;pe.moveTo(-.43,0),pe.lineTo(.43,0),pe.lineTo(.43,1.435),pe.absarc(0,1.435,.43,0,Math.PI,!1),pe.closePath();let Oe=e(16768162,{emissive:16761466,emissiveIntensity:2,transparent:!0,opacity:0,depthWrite:!1,side:St});Oe.userData.cameraPassThrough=!0;let ke=t(new Os(pe,16),Oe,0,0,.055,Z);ke.castShadow=ke.receiveShadow=!1;let I=new vi(16763011,0,4,2);return I.position.set(0,.7,-.6),Z.add(I),Z.doorway={leaf:G,handlePosition(){return Z.updateWorldMatrix(!0,!0),G.localToWorld(new L(.7,.88,-.082))},setOpen(S){ce=S?1:0},update(S,V){se=V?ce:ce+(se-ce)*Math.exp(-Math.max(0,S)*4.8),G.rotation.y=-.08-se*1.35,Oe.opacity=se*.85,I.intensity=se*3},view(){return{position:new L(ae+1.55,1.8,Te-2.65),target:new L(ae,1.05,Te),span:2.7}}},Z.doorway.update(0,!0),Z}function Ae(ae,Te,Z){let T=U(0,0,0);T.name=`craft-plants-${f}`;for(let[O,W]of ae.entries()){for(let G=0;G<2;G++){let J=W+(G?1.85:-1.85);if(x&&O===0){n(J,1.61,-3.5,.49,.69,.035,M,T),n(J,1.61,-3.476,.41,.59,.014,_,T);continue}if(Z&&G===1){for(let se=0;se<3;se++)n(J,1.4+se*.2,-3.5,.56,.15,.035,o,T);continue}n(J,1.61+(O===1?.12:0),-3.5,G===O?.58:.49,.69,.035,c,T);for(let se=0;se<5;se++)n(J,1.8+(O===1?.12:0)-se*.082,-3.477,.33-se%2*.06,.009,.008,y,T);t(new Nt(.021,6,4),a,J,1.92+(O===1?.12:0),-3.47,T)}fe(W-2.04,0,-2.8,1.2+O*.09,T,O),fe(W+2.13,0,-2.9,.85+O*.09,T,O+1)}if(!Z){for(let O of[-1,1]){let W=O*4.5;n(W,.3,4.35,7.3,.6,.23,r,T);for(let G=0;G<6;G++)n(O*(1.6+G*1.05),.66,4.35,.13,.2,.28,r,T);for(let G=0;G<5;G++)fe(O*(2.1+G*1.1),.6,4.32,.35+G%2*.12,T,G)}for(let O of[-.65,-.42,-.19])n(0,O,4.79,17.2,.018,.025,_,T)}return H(T)}function Re(ae,Te){let Z=U(ae,0,Te);for(let O=0;O<5;O++){let W=i(-1.03+O*.52,1.39,.72,.09,.05,C,Z);W.rotation.x=Math.PI/2}for(let O=0;O<3;O++)n(-.72+O*.72,.87,.742,.42,.29,.018,_,Z),n(-.72+O*.72,.87,.76,.28,.045,.009,y,Z);z(Z,-.6,2.38,-.16,6,.72,-.08);let T=n(.14,2.04,.26,.65,.018,.95,c,Z);T.rotation.x=-.57;for(let O=0;O<6;O++)n(.14,2.11-O*.045,0+O*.071,.46,.007,.025,y,Z);return H(Z)}return{bench:Ce,meeting:Me,bookshelf:te,doorway:ie,roomDetails:Ae,scannerDetail:Re,batch:H,planter:fe,pages:z,cup:Y,books:$}}function xm({kind:s,group:e,ownedMaterials:t,ownedGeometries:n,ownedTextures:i}){let r={value:0},o=[],a=p=>(t.add(p),p),l=p=>(n.add(p),p),c=(p,v,y,_=e)=>{let b=new Je(l(p),v);return b.name=`ambient-${y}`,_.add(b),b};function h(p,v=.018){return p.userData.foliage=!0,p.onBeforeCompile=y=>{y.uniforms.uAmbientTime=r,y.vertexShader=y.vertexShader.replace("#include <common>",`#include <common>
uniform float uAmbientTime;`),y.vertexShader=y.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
    float sway = sin(uAmbientTime * 1.05 + position.x * 2.1 + position.z * 1.7);
    transformed.x += sway * ${v.toFixed(4)} * clamp(uv.y * 2.8, 0.0, 1.0);
    transformed.z += cos(uAmbientTime * 0.73 + position.x) * ${(v*.4).toFixed(4)} * clamp(uv.y * 2.8, 0.0, 1.0);`)},p.customProgramCacheKey=()=>`foliage-${v}`,p}function u(p){p.onBeforeCompile=y=>{y.uniforms.uAmbientTime=r,y.vertexShader=y.vertexShader.replace("#include <common>",`#include <common>
uniform float uAmbientTime;
varying vec2 vWaterLocal;`),y.vertexShader=y.vertexShader.replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
    objectNormal = normalize(vec3(-0.065 * cos(position.x * 0.9 + uAmbientTime * 0.7), -0.045 * cos(position.y * 1.3 - uAmbientTime * 0.53), 1.0));`),y.vertexShader=y.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
    vWaterLocal = position.xy;
    transformed.z += sin(position.x * 0.9 + uAmbientTime * 0.7) * 0.072 + sin(position.y * 1.3 - uAmbientTime * 0.53) * 0.035;`),y.fragmentShader=y.fragmentShader.replace("#include <common>",`#include <common>
uniform float uAmbientTime;
varying vec2 vWaterLocal;`),y.fragmentShader=y.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
    vec2 p = vWaterLocal;
    float shore = 100.0;
    for(int i=0;i<3;i++){
     vec2 q=(p-vec2(float(i-1)*7.6,0.0))/vec2(3.3,4.2);
     shore=min(shore,(length(q)-1.0)*3.3);
    }
    float swell=sin(p.x*1.3+p.y*.7+uAmbientTime*.9)*.12+sin(p.y*2.1-uAmbientTime*.65)*.07;
    float shallows=1.0-smoothstep(-.3,3.0,shore);
    vec3 sea=mix(vec3(.025,.24,.36),vec3(.12,.60,.57),shallows);
    float ripple=sin(p.x*3.2+p.y*2.5+sin(p.y*1.7-uAmbientTime*.6)+uAmbientTime*.8);
    float aa=max(fwidth(ripple),.035);
    float crossWave=sin(p.x*2.1-p.y*3.6-uAmbientTime*.52);
    float glint=smoothstep(.89-aa,.99+aa,ripple)*smoothstep(.65,.98,crossWave)*.018;
    float edge=shore+swell;
    float foam=(1.0-smoothstep(.02,.22,abs(edge-.18)))*smoothstep(-.2,.02,edge);
    float breakers=(1.0-smoothstep(.025,.10,abs(sin(shore*3.5-uAmbientTime*1.1))))*(1.0-smoothstep(.5,2.4,shore))*.16;
    float distant=1.0-smoothstep(12.0,80.0,length(p));
    diffuseColor.rgb=mix(sea+glint*distant,vec3(.83,.94,.85),clamp((foam*.38+breakers*.4)*distant,0.0,.8));
`)},p.customProgramCacheKey=()=>"living-water-v2";let v=c(new Ft(400,400,96,96),p,"water");return v.rotation.x=-Math.PI/2,v.position.y=-1.6,v.receiveShadow=!0,v}function f(p){p.name="ambient-canoe";let v=p.position.clone(),y=p.rotation.clone();o.push(_=>{p.position.y=v.y+Math.sin(_*.7)*.024,p.rotation.x=y.x+Math.sin(_*.61)*.022,p.rotation.z=y.z+Math.sin(_*.83+.4)*.016})}function d(){let p=a(new mt({color:5266256,side:St}));for(let v=0;v<3;v++){let y=new Ze;y.name=`ambient-bird-${v}`,e.add(y),c(new Nt(.035,6,4),p,`bird-body-${v}`,y).scale.set(2.2,.8,1);let b=[];for(let w of[-1,1]){let A=new ht;A.setAttribute("position",new ot([.035,0,0,-.09,0,w*.31,.12,0,w*.16],3)),A.computeVertexNormals(),b.push(c(A,p,`bird-wing-${v}-${w}`,y))}o.push(w=>{let A=(w+v*.7)%38,C=A/15;y.visible=A<15,y.position.set(-14+C*29,5.2+v*.24+Math.sin(w*.35+v)*.1,1.8+v*.42+Math.sin(C*Math.PI)*1.4);let E=Math.sin(w*6.2-v*.7)*.48;b[0].rotation.x=E,b[1].rotation.x=-E})}}function m(p,v,y){let b=new Uint8Array(4096);for(let A=0;A<32;A++)for(let C=0;C<32;C++){let E=Math.hypot((C+.5)/32*2-1,(A+.5)/32*2-1),M=(A*32+C)*4;b[M]=b[M+1]=b[M+2]=255,b[M+3]=Math.round(Math.pow(Math.max(0,1-E),2)*255)}let w=new dn(b,32,32);w.needsUpdate=!0,w.magFilter=It,i.add(w);for(let A=0;A<5;A++){let C=a(new Ni({map:w,color:16051932,transparent:!0,opacity:0,depthWrite:!1})),E=new ss(C);E.name=`ambient-steam-${p}-${A}`,E.renderOrder=1,e.add(E),o.push(M=>{let P=(M*.24+A/5)%1;E.position.set(p+Math.sin(M*.7+A*.6)*P*.035,v+P*.43,y+Math.sin(M*.45+A)*P*.025),E.scale.set(.075+P*.11,.13+P*.13,1),C.opacity=Math.sin(P*Math.PI)*.19})}}function x(p){let y=new ht,_=new Float32Array(156);y.setAttribute("position",new ft(_,3));let b=a(new os({color:12244693,transparent:!0,opacity:.33,depthWrite:!1})),w=new Ds(l(y),b);w.name=`ambient-rain-${p}`,w.frustumCulled=!1,e.add(w),o.push(A=>{for(let C=0;C<26;C++){let E=(C*.61803398875+A*(.31+C%3*.035))%1,M=p-.42+C*.754877666%1*.84,P=2.65-E*1.24,N=C*6;_[N]=M,_[N+1]=P,_[N+2]=-4.044,_[N+3]=M-.012,_[N+4]=Math.max(1.34,P-.065-C%3*.015),_[N+5]=-4.044}y.attributes.position.needsUpdate=!0})}function g(p){if(s==="islands"?d():(m(p[0]-1.1,1.35,-1.47),m(p[2]-.66,1.26,-1.68)),s==="night")for(let v of[-6.8,6.8])x(v);o.forEach(v=>v(0))}return{swayMaterial:h,water:u,floatCanoe:f,populate:g,time:()=>r.value,update(p,{calm:v=!1,active:y=!0}={}){v||!y||!Number.isFinite(p)||p<=0||(r.value+=p,o.forEach(_=>_(r.value)))}}}function _m(s,e="paper"){let n=Math.PI*2,i=(d,m)=>{let x=Math.imul(d+17,374761393)^Math.imul(m+41,668265263);return x=Math.imul(x^x>>>13,1274126177),((x^x>>>16)>>>0)/4294967295},r=new Map,o=(d,m,x=!1)=>{let g=d.replace(/-(bump|roughness)$/,""),p=d.endsWith("roughness")?1:0,v=x?4:2,y=x?null:r.get(g);y||(y=new dn(new Uint8Array(256*256*v),256,256,x?fn:ea),y.name=`surface-${x?d:g+"-detail"}`,y.colorSpace=x?Qe:si,y.wrapS=y.wrapT=un,y.magFilter=It,y.minFilter=Pn,y.generateMipmaps=!0,s.add(y),x||r.set(g,y));let _=y.image.data,b=w=>Math.max(0,Math.min(255,Math.round(w)));for(let w=0;w<256;w++)for(let A=0;A<256;A++){let C=m(A,w),E=(w*256+A)*v;if(x){for(let M=0;M<3;M++)_[E+M]=b(C[M]);_[E+3]=255}else _[E+p]=b(C)}return y.needsUpdate=!0,y},a=(d,m)=>{let x=d/256*n,g=m/256*n,p=Math.sin(g)*.8+Math.sin(g*3)*.22;return Math.sin(x*19+p)*.62+Math.sin(x*41+p*2)*.24+Math.sin(x*7+Math.sin(g)*1.7)*.14},l=(d,m)=>{let x=d/256*n*32,g=m/256*n*32;return Math.cos(x)*.38+Math.cos(g)*.38+Math.cos(x/2)*Math.cos(g/2)*.24},c=(d,m)=>{let x=d/256*n,g=m/256*n;return Math.sin(x*3+Math.sin(g*2))*.42+Math.cos(g*5+Math.sin(x*2))*.32+Math.sin(x*11+g*7)*.16},h=(d,m)=>Math.sin(m/256*n*27)*7+(i(d,m)-.5)*15,u=e==="islands",f=u?[222,218,202]:e==="night"?[224,213,202]:[242,226,200];return{woodColor:o("wood-color",(d,m)=>f.map((x,g)=>x+a(d,m)*(u?22:17)-(u?Math.pow(Math.max(0,Math.sin(d/256*n*31+Math.sin(m/256*n))),14)*22:0)+(i(d,m)-.5)*4-g),!0),woodBump:o("wood-bump",(d,m)=>137+a(d,m)*38+(i(d,m)-.5)*6),woodRoughness:o("wood-roughness",(d,m)=>208+a(d,m)*19+(u?18:0)+(i(d,m)-.5)*6),paperBump:o("paper-bump",(d,m)=>144+(i(d,m)-.5)*37+(i(d>>2,m)-.5)*11),paperRoughness:o("paper-roughness",(d,m)=>244+(i(d,m)-.5)*16),linenColor:o("linen-color",(d,m)=>[242,236,222].map(x=>x+l(d,m)*12),!0),linenBump:o("linen-bump",(d,m)=>135+l(d,m)*56+(i(d,m)-.5)*8),linenRoughness:o("linen-roughness",(d,m)=>232+l(d,m)*20),ceramicBump:o("ceramic-bump",(d,m)=>140+h(d,m)),ceramicRoughness:o("ceramic-roughness",(d,m)=>177+h(d,m)*1.5),stoneColor:o("stone-color",(d,m)=>[222,221,209].map(x=>x+c(d,m)*23+(i(d,m)-.5)*7),!0),stoneBump:o("stone-bump",(d,m)=>140+c(d,m)*48+(i(d,m)-.5)*20),stoneRoughness:o("stone-roughness",(d,m)=>228+c(d,m)*24),metalBump:o("metal-bump",(d,m)=>135+Math.sin(d/256*n*103)*17+(i(d,m)-.5)*4),metalRoughness:o("metal-roughness",(d,m)=>157+Math.sin(d/256*n*103)*25+(i(d,m)-.5)*6)}}var fa=new L;function Gn(s,e,t,n,i,r){let o=2*Math.PI*i/4,a=Math.max(r-2*i,0),l=Math.PI/4;fa.copy(e),fa[n]=0,fa.normalize();let c=.5*o/(o+a),h=1-fa.angleTo(s)/l;return Math.sign(fa[t])===1?h*c:a/(o+a)+c+c*(1-h)}var Yr=class s extends Kt{constructor(e=1,t=1,n=1,i=2,r=.1){let o=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let l=new L,c=new L,h=new L(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,m=u.length/6,x=new L,g=.5/o;for(let p=0,v=0;p<u.length;p+=3,v+=2)switch(l.fromArray(u,p),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),u[p+0]=h.x*Math.sign(l.x)+c.x*r,u[p+1]=h.y*Math.sign(l.y)+c.y*r,u[p+2]=h.z*Math.sign(l.z)+c.z*r,f[p+0]=c.x,f[p+1]=c.y,f[p+2]=c.z,Math.floor(p/m)){case 0:x.set(1,0,0),d[v+0]=Gn(x,c,"z","y",r,n),d[v+1]=1-Gn(x,c,"y","z",r,t);break;case 1:x.set(-1,0,0),d[v+0]=1-Gn(x,c,"z","y",r,n),d[v+1]=1-Gn(x,c,"y","z",r,t);break;case 2:x.set(0,1,0),d[v+0]=1-Gn(x,c,"x","z",r,e),d[v+1]=Gn(x,c,"z","x",r,n);break;case 3:x.set(0,-1,0),d[v+0]=1-Gn(x,c,"x","z",r,e),d[v+1]=1-Gn(x,c,"z","x",r,n);break;case 4:x.set(0,0,1),d[v+0]=1-Gn(x,c,"x","y",r,e),d[v+1]=1-Gn(x,c,"y","x",r,t);break;case 5:x.set(0,0,-1),d[v+0]=Gn(x,c,"x","y",r,e),d[v+1]=1-Gn(x,c,"y","x",r,t);break}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}};function vm(){let s=new Ze;s.name="KURI";let e=(k,U,D,H=0,z={})=>{let Y=new Ot({color:U,roughness:D,metalness:H,...z});return Y.name=k,Y},t=e("kuri-enamel",16050645,.42,.12),n=e("kuri-red",11091757,.43,.12),i=e("kuri-joint",3160888,.45,.55),r=e("kuri-brass",10385232,.36,.62),o=e("kuri-canvas",9583916,.92),a=e("kuri-sole",14207146,.85),l=e("kuri-face",1319969,.26,.18),c=e("kuri-eye",16771497,.3,0,{emissive:16765056,emissiveIntensity:1.4}),h=e("kuri-paper",15984592,.9),u=(k,U,D,H,z)=>{let Y=new Ze;return Y.name=k,Y.position.set(D,H,z),U.add(Y),Y},f=(k,U,D,H,z,Y)=>{if(["kuri-enamel","kuri-red"].includes(D.name)){let ve=U.attributes.normal,we=new Float32Array(ve.count*3);for(let Ce=0;Ce<ve.count;Ce++){let Me=U.userData.kuriPanel?Math.max(0,1-Math.max(Math.abs(ve.getX(Ce)),Math.abs(ve.getY(Ce)),Math.abs(ve.getZ(Ce)))):0,te=Math.min(.2,Me*.5);we.set([1-te*.32,1-te*.58,1-te*.82],Ce*3)}U.setAttribute("color",new ft(we,3)),D.vertexColors=!0}let $={"kuri-enamel":[0,.5],"kuri-red":[.5,.5],"kuri-canvas":[0,0],"kuri-joint":[.5,0]}[D.name];if($){let ve=U.attributes.uv;for(let we=0;we<ve.count;we++)ve.setXY(we,$[0]+.035+ve.getX(we)*.43,$[1]+.035+ve.getY(we)*.43)}let fe=new Je(U,D);return fe.position.set(H,z,Y),fe.castShadow=!0,fe.receiveShadow=!0,k.add(fe),fe},d=(k,U,D,H,z,Y,$,fe,ve=.035)=>{let we=new Yr(U,D,H,2,Math.min(ve,U/2,D/2,H/2));return we.userData.kuriPanel=!0,f(k,we,z,Y,$,fe)},m=(k,U,D,H,z,Y)=>f(k,new Nt(U,12,8),D,H,z,Y),x=(k,U,D,H,z,Y)=>{let $=f(k,new Ut(U,U,D,12),i,H,z,Y);return $.rotation.z=Math.PI/2,$},g=u("Hips",s,0,.6,0);d(g,.43,.42,.3,t,0,.22,0,.07),d(g,.29,.115,.22,i,0,-.015,0,.025),d(g,.31,.26,.018,t,0,.22,.153,.028),x(g,.065,.13,0,.46,0);let p=u("Head",g,0,.57,0);d(p,.57,.43,.36,t,0,.08,0,.08),d(p,.5,.35,.018,r,0,.08,.181,.045),d(p,.466,.314,.032,l,0,.08,.2,.045);for(let k of[-.099,.099]){let U=u(k<0?"EyeL":"EyeR",p,k,.09,.223);m(U,.032,c,0,0,0).scale.set(.72,1.2,.28)}for(let k of[-1,1]){x(p,.084,.034,k*.288,.07,0);let U=f(p,new Ut(.06,.06,.014,12),r,k*.31,.07,0);U.rotation.z=Math.PI/2}let v=u("Antenna",p,.16,.29,-.08),y=f(v,new Ut(.014,.014,.115,8),i,0,.048,0);y.rotation.z=-.14,m(v,.036,n,.008,.113,0);let _=u("Mailbag",g,0,.21,-.24);d(_,.35,.34,.17,o,0,0,0,.045),d(_,.3,.115,.035,o,0,.1,-.093,.018),d(_,.24,.105,.045,o,0,-.095,-.11,.015);for(let k of[-.1,.1])d(_,.025,.24,.024,r,k,-.006,-.107,.006);d(_,.055,.043,.018,r,0,.055,-.127,.005);let b=d(_,.22,.14,.018,h,0,.21,0,.008);b.rotation.z=-.13;let w=m(_,.022,n,0,.2,-.014);if(w.scale.z=.25,typeof document<"u"){let k=document.createElement("canvas");k.width=1024,k.height=512;let U=k.getContext("2d");if(U?.strokeRect){U.fillStyle="#9b4431",U.fillRect(30,0,30,512),U.fillRect(452,0,30,512),U.fillStyle="#625039",U.fillRect(104,65,120,90),U.fillStyle="#f1dfb9",U.font="bold 54px Georgia",U.fillText("AW",117,129),U.strokeStyle="#c4ae86",U.lineWidth=5,U.strokeRect(111,72,106,76),U.fillStyle="#8d3b29",U.fillRect(370,449,64,15),U.strokeStyle="#d1ab7a",U.lineWidth=4,U.setLineDash([9,7]),U.strokeRect(548,35,438,435);let D=new gn(k);D.colorSpace=Qe,D.name="kuri-decals";let H=e("kuri-decal",16777215,.85,0,{map:D,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}),z=($,fe,ve,we,Ce,Me,te=!1)=>{let ie=new Ft(fe,ve),Ae=ie.attributes.uv;for(let Re=0;Re<Ae.count;Re++)Ae.setX(Re,Ae.getX(Re)*.5+(te?.5:0));return f($,ie,H,we,Ce,Me)};z(g,.31,.32,0,.235,.166);let Y=z(_,.31,.3,0,0,-.145,!0);Y.rotation.y=Math.PI}}for(let k of[-1,1]){let U=k<0?"L":"R",D=u(`Arm${U}`,g,k*.258,.36,0);x(D,.076,.1,0,0,0),d(D,.115,.155,.13,t,0,-.115,0,.028);let H=u(`Elbow${U}`,D,0,-.24,0);x(H,.052,.13,0,0,0),d(H,.109,.155,.125,t,0,-.115,0,.025);let z=u(`Hand${U}`,H,0,-.24,.01);m(z,.052,i,0,0,0);for(let fe of[-.029,.029])d(z,.028,.064,.067,i,fe,-.026,.02,.012);let Y=u(`Leg${U}`,g,k*.112,-.06,0);x(Y,.07,.09,0,0,0),d(Y,.14,.16,.16,t,0,-.135,0,.028);let $=u(`Knee${U}`,Y,0,-.27,0);x($,.06,.15,0,0,0),d($,.13,.13,.145,t,0,-.1,0,.023),d($,.23,.14,.33,n,0,-.2,.07,.042),d($,.235,.045,.34,a,0,-.255,.07,.012)}let A=Array.from({length:17},(k,U)=>U/16),C=(k,U)=>new vn(k,A,U),E=k=>A.map(()=>k);function M(k,U=!1,D=!1,H=!1){let z=[];for(let $ of["L","R"]){let fe=$==="L"?0:Math.PI,ve=A.map(Me=>Math.sin(Me*Math.PI*2+fe)),Ce=A.map(Me=>Me*Me*(3-2*Me)).map(Me=>H?1-Me:Me);z.push(C(`Leg${$}.rotation[x]`,U?ve.map(Me=>Me*.4):D||H?Ce.map(Me=>-Me*1.4):E(0))),z.push(C(`Knee${$}.rotation[x]`,U?ve.map(Me=>Math.max(0,-Me)**2*.48):D||H?Ce.map(Me=>Me*1.5):E(.02))),z.push(C(`Arm${$}.rotation[x]`,U?ve.map(Me=>-Me*.26):D||H?Ce.map(Me=>-Me*.42):A.map(Me=>Math.sin(Me*Math.PI*2+fe)*.025))),z.push(C(`Elbow${$}.rotation[x]`,E(-.1)))}z.push(C("Hips.position[y]",U?A.map($=>.6+(1-Math.cos($*Math.PI*4))*.009):D||H?A.map($=>.6-(H?1-$*$*(3-2*$):$*$*(3-2*$))*.3):A.map($=>.6+Math.sin($*Math.PI*2)*.004))),z.push(C("Head.rotation[z]",A.map($=>Math.sin($*Math.PI*2)*(U?.018:.025)))),z.push(C("Mailbag.rotation[x]",A.map($=>Math.sin($*Math.PI*2)*(U?.04:.006)))),z.push(C("Antenna.rotation[z]",A.map($=>Math.sin($*Math.PI*4)*(U?.065:.025))));let Y=new ki(k,1,z);if(!U&&!D&&!H){Y.tracks.forEach($=>{for(let fe=0;fe<$.times.length;fe++)$.times[fe]*=3.8}),Y.duration=3.8;for(let $ of["EyeL","EyeR"])Y.tracks.push(new vn(`${$}.scale[y]`,[0,2.65,2.72,2.83,2.9,3.8],[1,1,.08,.08,1,1]))}else for(let $ of["EyeL","EyeR"])Y.tracks.push(C(`${$}.scale[y]`,E(1)));return Y}let P=M("Wave"),N=M("Pose");for(let k of[P,N])k.duration=2.4,k.tracks.forEach(U=>{let D=U.times[U.times.length-1];for(let H=0;H<U.times.length;H++)U.times[H]*=2.4/D});let B=(k,U,D)=>{k.tracks=k.tracks.filter(H=>H.name!==U),k.tracks.push(new vn(U,[0,.35,.7,1.05,1.4,1.85,2.4],D))};return B(P,"ArmR.rotation[x]",[0,-1.2,-1.6,-1.6,-1.6,-1.2,0]),B(P,"ElbowR.rotation[x]",[-.1,-1,-1.5,-.85,-1.5,-1,-.1]),B(P,"Head.rotation[z]",[0,-.08,-.08,-.04,-.08,-.04,0]),B(N,"ArmL.rotation[x]",[0,-.4,-.7,-.7,-.7,-.4,0]),B(N,"ArmR.rotation[x]",[0,-.4,-.7,-.7,-.7,-.4,0]),B(N,"ElbowL.rotation[x]",[-.1,-.9,-1.3,-1.3,-1.3,-.9,-.1]),B(N,"ElbowR.rotation[x]",[-.1,-.9,-1.3,-1.3,-1.3,-.9,-.1]),B(N,"Head.rotation[z]",[0,.06,.1,.1,.1,.06,0]),{scene:s,animations:[M("Idle"),M("Walking",!0),M("Sitting",!1,!0),M("Standing",!1,!1,!0),P,N]}}var ym=[[-2.78,-4.25,-2.62,-1.15],[2.62,-4.25,2.78,-1.15]];function Mm(s){return s==="islands"?[[-11,-3.9,-4.5,4.1],[-3.3,-3.9,3.3,4.1],[4.5,-3.9,11,4.1],[-5.15,.2,-2.65,1.8],[2.65,.2,5.15,1.8]]:[[-8.4,-4,8.4,4.6]]}var Xc=class extends _i{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new qh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new nd(t)}),this.register(function(t){return new id(t)}),this.register(function(t){return new sd(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new td(t)}),this.register(function(t){return new ed(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new rd(t)}),this.register(function(t){return new od(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=Vi.extractUrlBase(e);o=Vi.resolveURL(c,this.path)}else o=Vi.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Nr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===wm){try{o[it.KHR_BINARY_GLTF]=new ad(e)}catch(u){i&&i(u);return}r=JSON.parse(o[it.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new pd(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case it.KHR_MATERIALS_UNLIT:o[u]=new Wh;break;case it.KHR_DRACO_MESH_COMPRESSION:o[u]=new ld(r,this.dracoLoader);break;case it.KHR_TEXTURE_TRANSFORM:o[u]=new cd;break;case it.KHR_MESH_QUANTIZATION:o[u]=new ud;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function pM(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var it={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Gh=class{constructor(e){this.parser=e,this.name=it.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new Ve(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Qt);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ks(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new vi(h),c.distance=u;break;case"spot":c=new Zo(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Si(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}},Wh=class{constructor(){this.name=it.KHR_MATERIALS_UNLIT}getMaterialType(){return mt}extendParams(e,t,n){let i=[];e.color=new Ve(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Qt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Qe))}return Promise.all(i)}},Xh=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},qh=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ge(a,a)}return Promise.all(r)}},Yh=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Zh=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Kh=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ve(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Qt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Qe)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},$h=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Jh=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ve().setRGB(a[0],a[1],a[2],Qt),Promise.all(r)}},jh=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Qh=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ve().setRGB(a[0],a[1],a[2],Qt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Qe)),Promise.all(r)}},ed=class{constructor(e){this.parser=e,this.name=it.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},td=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},nd=class{constructor(e){this.parser=e,this.name=it.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},id=class{constructor(e){this.parser=e,this.name=it.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},sd=class{constructor(e){this.parser=e,this.name=it.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},rd=class{constructor(e){this.name=it.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,i.mode,i.filter),d})})}else return null}},od=class{constructor(e){this.name=it.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==Wn.TRIANGLES&&c.mode!==Wn.TRIANGLE_STRIP&&c.mode!==Wn.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],f=c[0].count,d=[];for(let m of u){let x=new Ye,g=new L,p=new Ct,v=new L(1,1,1),y=new pi(m.geometry,m.material,f);for(let _=0;_<f;_++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,_),l.SCALE&&v.fromBufferAttribute(l.SCALE,_),y.setMatrixAt(_,x.compose(g,p,v));for(let _ in l)if(_==="_COLOR_0"){let b=l[_];y.instanceColor=new rs(b.array,b.itemSize,b.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&m.geometry.setAttribute(_,l[_]);pt.prototype.copy.call(y,m),this.parser.assignFinalMaterial(y),d.push(y)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},wm="glTF",pa=12,Sm={JSON:1313821514,BIN:5130562},ad=class{constructor(e){this.name=it.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,pa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==wm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-pa,r=new DataView(e,pa),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===Sm.JSON){let c=new Uint8Array(e,pa+o,a);this.content=n.decode(c)}else if(l===Sm.BIN){let c=pa+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ld=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=it.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let h in o){let u=dd[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=dd[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[e.attributes[h]],d=Zr[f.componentType];c[u]=d.name,l[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){i.decodeDracoFile(h,function(d){for(let m in d.attributes){let x=d.attributes[m],g=l[m];g!==void 0&&(x.normalized=g)}u(d)},a,c,Qt,f)})})}},cd=class{constructor(){this.name=it.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},ud=class{constructor(){this.name=it.KHR_MESH_QUANTIZATION}},qc=class extends Oi{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,f=u*u,d=f*u,m=e*c,x=m-c,g=-2*d+3*f,p=d-f,v=1-g,y=p-f+u;for(let _=0;_!==a;_++){let b=o[x+_+a],w=o[x+_+l]*h,A=o[m+_+a],C=o[m+_]*h;r[_]=v*b+y*w+g*A+p*C}return r}},mM=new Ct,hd=class extends qc{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return mM.fromArray(r).normalize().toArray(r),r}},Wn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Zr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},bm={9728:Vt,9729:It,9984:ql,9985:Fr,9986:Ws,9987:Pn},Em={33071:zn,33648:Hn,10497:un},kh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},dd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},fs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},gM={CUBICSPLINE:void 0,LINEAR:Cs,STEP:Rs},Hh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function xM(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ot({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Qn})),s.DefaultMaterial}function er(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Si(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function _M(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(f)}if(i){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],f=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function vM(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function yM(s){let e,t=s.extensions&&s.extensions[it.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Vh(t.attributes):e=s.indices+":"+Vh(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Vh(s.targets[n]);return e}function Vh(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function fd(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function MM(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var SM=new Ye,pd=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new pM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new Bs(this.options.manager):this.textureLoader=new Ko(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Nr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return er(r,a,i),Si(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[it.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(Vi.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=kh[i.type],a=Zr[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new ft(c,o,l))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=kh[i.type],c=Zr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,x,g;if(d&&d!==u){let p=Math.floor(f/d),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,y=t.cache.get(v);y||(x=new c(a,p*d,i.count*d/h),y=new Ps(x,d/h),t.cache.add(v,y)),g=new is(y,l,f%d/h,m)}else a===null?x=new c(i.count*l):x=new c(a,f,i.count*l),g=new ft(x,l,m);if(i.sparse!==void 0){let p=kh.SCALAR,v=Zr[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,b=new v(o[1],y,i.sparse.count*p),w=new c(o[2],_,i.sparse.count*l);a!==null&&(g=new ft(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,C=b.length;A<C;A++){let E=b[A];if(g.setX(E,w[A*l]),l>=2&&g.setY(E,w[A*l+1]),l>=3&&g.setZ(E,w[A*l+2]),l>=4&&g.setW(E,w[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=bm[f.magFilter]||It,h.minFilter=bm[f.minFilter]||Pn,h.wrapS=Em[f.wrapS]||un,h.wrapT=Em[f.wrapT]||un,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Vt&&h.minFilter!==It,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=i.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;let f=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(f,d){let m=f;t.isImageBitmapLoader===!0&&(m=function(x){let g=new Tt(x);g.needsUpdate=!0,f(g)}),t.load(Vi.resolveURL(u,r.path),m,void 0,d)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),Si(u,o),u.userData.mimeType=o.mimeType||MM(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[it.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[it.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[it.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new mi,sn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new os,sn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Ot}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},l=r.extensions||{},c=[];if(l[it.KHR_MATERIALS_UNLIT]){let u=i[it.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Ve(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Qt),a.opacity=f[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Qe)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=St);let h=r.alphaMode||Hh.OPAQUE;if(h===Hh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Hh.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==mt&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ge(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==mt&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==mt){let u=r.emissiveFactor;a.emissive=new Ve().setRGB(u[0],u[1],u[2],Qt)}return r.emissiveTexture!==void 0&&o!==mt&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Qe)),Promise.all(c).then(function(){let u=new o(a);return r.name&&(u.name=r.name),Si(u,r),t.associations.set(u,{materials:e}),r.extensions&&er(i,u,r),u})}createUniqueName(e){let t=_t.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[it.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Tm(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],h=yM(c),u=i[h];if(u)o.push(u.promise);else{let f;c.extensions&&c.extensions[it.KHR_DRACO_MESH_COMPRESSION]?f=r(c):f=Tm(new ht,c,t),i[h]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let h=o[l].material===void 0?xM(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let d=0,m=h.length;d<m;d++){let x=h[d],g=o[d],p,v=c[d];if(g.mode===Wn.TRIANGLES||g.mode===Wn.TRIANGLE_STRIP||g.mode===Wn.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new Io(x,v):new Je(x,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===Wn.TRIANGLE_STRIP?p.geometry=zh(p.geometry,ra):g.mode===Wn.TRIANGLE_FAN&&(p.geometry=zh(p.geometry,zr));else if(g.mode===Wn.LINES)p=new Ds(x,v);else if(g.mode===Wn.LINE_STRIP)p=new Ls(x,v);else if(g.mode===Wn.LINE_LOOP)p=new Lo(x,v);else if(g.mode===Wn.POINTS)p=new Ui(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&vM(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Si(p,r),g.extensions&&er(i,p,g),t.assignFinalMaterial(p),u.push(p)}for(let d=0,m=u.length;d<m;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return r.extensions&&er(i,u[0],r),u[0];let f=new Ze;r.extensions&&er(i,f,r),t.associations.set(f,{meshes:e});for(let d=0,m=u.length;d<m;d++)f.add(u[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ht(Pt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Hi(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Si(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){let u=o[c];if(u){a.push(u);let f=new Ye;r!==null&&f.fromArray(r.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Po(a,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,f=i.channels.length;u<f;u++){let d=i.channels[u],m=i.samplers[d.sampler],x=d.target,g=x.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,v=i.parameters!==void 0?i.parameters[m.output]:m.output;x.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",v)),c.push(m),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],m=u[2],x=u[3],g=u[4],p=[];for(let y=0,_=f.length;y<_;y++){let b=f[y],w=d[y],A=m[y],C=x[y],E=g[y];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();let M=n._createAnimationTracks(b,w,A,C,E);if(M)for(let P=0;P<M.length;P++)p.push(M[P])}let v=new ki(r,void 0,p);return Si(v,i),v})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let h=c[0],u=c[1],f=c[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,SM)});for(let d=0,m=u.length;d<m;d++)h.add(u[d]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new Cr:c.length>1?h=new Ze:c.length===1?h=c[0]:h=new pt,h!==c[0])for(let u=0,f=c.length;u<f;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Si(h,r),r.extensions&&er(n,h,r),r.matrix!==void 0){let u=new Ye;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Ze;n.name&&(r.name=i.createUniqueName(n.name)),Si(r,n),n.extensions&&er(t,r,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);let c=h=>{let u=new Map;for(let[f,d]of i.associations)(f instanceof sn||f instanceof Tt)&&u.set(f,d);return h.traverse(f=>{let d=i.associations.get(f);d!=null&&u.set(f,d)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,l=[];fs[r.path]===fs.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(fs[r.path]){case fs.weights:c=vn;break;case fs.rotation:c=gi;break;case fs.translation:case fs.scale:c=xi;break;default:switch(n.itemSize){case 1:c=vn;break;case 2:case 3:default:c=xi;break}break}let h=i.interpolation!==void 0?gM[i.interpolation]:Cs,u=this._getArrayFromAccessor(n);for(let f=0,d=l.length;f<d;f++){let m=new c(l[f]+"."+fs[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=fd(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof gi?hd:qc;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function bM(s,e,t){let n=e.attributes,i=new en;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new L(l[0],l[1],l[2]),new L(c[0],c[1],c[2])),a.normalized){let h=fd(Zr[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new L,l=new L;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],d=f.min,m=f.max;if(d!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(m[2]))),f.normalized){let x=fd(Zr[f.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new mn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Tm(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(let o in n){let a=dd[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return nt.workingColorSpace!==Qt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${nt.workingColorSpace}" not supported.`),Si(s,e),bM(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?_M(s,e.targets,t):s})}var EM=new Xc,Am=["laptop","chairDesk","chair","books","lampRoundFloor","loungeChair","cardboardBoxClosed","tree_oak","rock_largeA","grass_large","flower_redA","canoe"];async function Rm(s){let e={},t=0;await Promise.all(Am.map(async i=>{e[i]=(await EM.loadAsync(`/world/models/${i}.glb`)).scene,s(++t/(Am.length+1))}));let n=vm();return s(1),{models:e,explorer:n}}var TM={paper:{paper:15261641,wall:15590867,wood:11897435,red:11093041,green:8292706,dark:4934467,background:15196369},night:{paper:13613457,wall:2309956,wood:7360576,red:11884094,green:5797470,dark:2765881,background:1322291},islands:{paper:14865332,wall:15391935,wood:11238226,red:11422258,green:7899226,dark:5592651,background:10337203}};function Cm(s,e,t,n,i){let r=new Ze,o=TM[s],a=s==="night",l=s==="islands",c=[],h=[],u=[],f=[],d=[],m=new Set,x=new Set,g=new Set,p=Vp(_m(g,s),i,g),v=xm({kind:s,group:r,ownedMaterials:m,ownedGeometries:x,ownedTextures:g}),y=l?Xp({group:r,images:n,stoneMap:p.stoneColor,ownedTextures:g,ownedMaterials:m,ownedGeometries:x}):fm({kind:s,group:r,image:i?.["cartoon-night"],ownedTextures:g,ownedMaterials:m,ownedGeometries:x});t=p.paperColor||t;let _=X=>(X.traverse(he=>{he.isMesh&&!he.material.userData.foliage&&!he.material.userData.cameraPassThrough&&d.push(he)}),X),b=(X,he={})=>{let _e=new Ot({color:X,roughness:.9,...he});return m.add(_e),_e},w=b(o.paper,{map:y?.stone||t,bumpMap:p.paperBump,roughnessMap:p.paperRoughness,bumpScale:.012}),A=b(o.wall,{map:t,bumpMap:p.paperBump,roughnessMap:p.paperRoughness,bumpScale:.012}),C=b(o.wood,{map:p.woodColor,bumpMap:p.woodBump,roughnessMap:p.woodRoughness,bumpScale:.025,roughness:.87}),E=b(o.red,{map:p.woodColor,bumpMap:p.paperBump,bumpScale:.02}),M=b(o.dark,{map:t}),P=b(16051932,{map:t,bumpMap:p.paperBump,roughnessMap:p.paperRoughness,bumpScale:.009}),N=(X,he,_e,le,ye,F=r)=>{x.add(X);let oe=new Je(X,he);return oe.position.set(_e,le,ye),oe.castShadow=!0,oe.receiveShadow=!0,F.add(oe),oe},B=(X,he,_e,le,ye,F,oe=w,me=r)=>N(new Yr(le,ye,F,2,Math.min(.07,le/5,ye/5,F/5)),oe,X,he,_e,me),k=(X,he,_e,le,ye,F=C,oe=r)=>N(new Ut(le,le,ye,20),F,X,he,_e,oe),U=gm({group:r,mat:b,mesh:N,box:B,cylinder:k,paper:w,wood:C,red:E,dark:M,white:P,paperTexture:t,detail:p,kind:s,ownedGeometries:x,swayMaterial:v.swayMaterial}),D=(X,he,_e,le)=>c.push([X-_e/2,he-le/2,X+_e/2,he+le/2]);function H(X,he,_e,le,ye,F=0,oe=r){let me=["tree_oak","grass_large","flower_redA"].includes(X),Le=e[X].clone(!0),xe=new en().setFromObject(Le),ue=xe.getSize(new L),Fe=xe.getCenter(new L),Ge=new Ze;return Ge.add(Le),Le.position.sub(new L(Fe.x,xe.min.y,Fe.z)),Ge.scale.setScalar(ye/ue.y),Ge.position.set(he,_e,le),Ge.rotation.y=F,Le.traverse(st=>{if(!st.isMesh)return;st.castShadow=!0,st.receiveShadow=!0;let $e=st.material.clone();m.add($e),$e.roughness=.92,$e.metalness=0;let zt=$e.name.toLowerCase();/wood|bark/.test(zt)?($e.color.set(o.wood),$e.map=p.woodColor,$e.bumpMap=p.woodBump,$e.bumpScale=.018,$e.roughnessMap=p.woodRoughness):/leaf|green|plant|grass/.test(zt)?($e.color.set(o.green),$e.map=p.stoneColor,$e.bumpMap=p.paperBump,$e.bumpScale=.006,me&&v.swayMaterial($e,.012)):/carpet|red|orange/.test(zt)?($e.color.set(o.red),$e.map=p.linenColor,$e.bumpMap=p.linenBump,$e.bumpScale=.012,$e.roughnessMap=p.linenRoughness):/metal|black/.test(zt)?($e.color.set(o.dark),a&&($e.metalness=.55,$e.roughness=.7,$e.bumpMap=p.metalBump,$e.bumpScale=.003,$e.roughnessMap=p.metalRoughness)):/white|plastic|wall/.test(zt)?($e.color.set(o.paper),$e.map=t):/rock|stone/.test(zt)||zt===""?$e.map=p.stoneColor:$e.map||($e.map=t),st.material=$e,st.userData.foliage=!!$e.userData.foliage}),oe.add(Ge),["chairDesk","chair","loungeChair","cardboardBoxClosed","lampRoundFloor"].includes(X)&&_(Ge),Ge}function z(X,he,_e,le,ye=2.6,F=64,oe="#292c28",me="#e9dfca",Le=0){let xe=document.createElement("canvas");xe.width=768,xe.height=256;let ue=xe.getContext("2d");ue.fillStyle=me,ue.fillRect(0,0,768,256),ue.fillStyle=oe,ue.textAlign="center",ue.textBaseline="middle",ue.font=`${F}px Georgia`,X.split(`
`).forEach((at,$e,zt)=>ue.fillText(at,384,128+($e-(zt.length-1)/2)*F*1.2,710));let Fe=new gn(xe);Fe.colorSpace=Qe,g.add(Fe);let Ge=b(16777215,{map:Fe,side:St}),st=N(new Ft(ye,ye/3),Ge,he,_e,le);return st.rotation.y=Le,st}function Y(X,he,_e,le,ye,F,oe){h.push({id:X,label:he,position:new L(_e,le,ye),approach:F}),oe&&oe.traverse(me=>{me.isMesh&&(me.userData.target=X,u.push(me))})}let $=Mm(s),fe=l?[-7.6,0,7.6]:[-5.2,0,5.2];if(l){let X=b(14731681,{map:y?.stone||p.stoneColor,bumpMap:p.stoneBump,roughnessMap:p.stoneRoughness,bumpScale:.08});for(let he of fe){N(new Ut(4.55,3.6,2.1,7),X,he,-1.14,0).scale.set(.79,1,1.06),B(he,-.18,.1,6.55,.36,8,w);for(let le=0;le<7;le++){let ye=le/7*Math.PI*2;H("rock_largeA",he+Math.cos(ye)*3.1,-.75,Math.sin(ye)*3.65,.7,ye)}}for(let he of[-3.9,3.9]){B(he,-.08,1,2.2,.18,1.5,C);for(let _e of[.3,1.7])for(let le of[-.8,.8])k(he+le,.35,_e,.045,.8,C);for(let _e of[.3,1.7])B(he,.72,_e,2.2,.05,.045,C);for(let _e=0;_e<10;_e++)B(he-.99+_e*.22,.03,1,.015,.012,1.5,M)}v.water(b(16777215,{roughness:.32,metalness:.08})),v.floatCanoe(H("canoe",-5,-1.48,4.8,.35,.5))}else{let X=p.woodColor?.clone();X&&(X.repeat.set(8,6),X.needsUpdate=!0,g.add(X));let he=N(new Ft(34,22),b(a?3425866:o.background,{map:X||null,roughness:1,bumpMap:p.paperBump,bumpScale:.004}),0,-.79,0);he.name="tabletop",he.visible=!a,he.rotation.x=-Math.PI/2,he.castShadow=!1,B(0,-.38,.2,17.3,.75,9.2,w),B(0,-.04,.2,17,.08,9,a?C:w);let _e=new Ze;r.add(_e);let le=[15195590,14800316,15656143,14471353].map(ye=>b(a?o.wood:ye,{map:a?p.woodColor:t,bumpMap:a?p.woodBump:p.paperBump,roughnessMap:a?p.woodRoughness:p.paperRoughness,bumpScale:.015}));for(let ye=0;ye<17;ye++)for(let F=0;F<9;F++)B(-8+ye,.002,-3.8+F,.977,.025,.977,le[(ye*7+F*3)%4],_e);U.batch(_e);for(let ye=0;ye<3;ye++)_(B(fe[ye],1.65+(ye===1?.25:0),-4.3,5.4,3.3+(ye===1?.5:0),.28,A)),_(B(fe[ye]-.08,1.62,-4.49,5.5,3.25,.09,w));_(B(-8.55,a?.36:1.05,-1.8,.22,a?.72:2.1,5,A));for(let ye of ym)_(B((ye[0]+ye[2])/2,1,(ye[1]+ye[3])/2,ye[2]-ye[0],2,ye[3]-ye[1],A)),c.push(ye);for(let ye of[-5.2,0,5.2]){let F=new Ze;r.add(F);let oe=b(a?3165003:13614487,{map:p.linenColor,bumpMap:p.linenBump,roughnessMap:p.linenRoughness,bumpScale:.025});B(ye,.03,-.7,3.7,.028,2.7,oe,F);for(let me=0;me<32;me++)B(ye-1.8+me*.114,.05,-2.09,.028,.01,.13,oe,F),B(ye-1.8+me*.114,.05,.69,.028,.01,.13,oe,F);U.batch(F)}}function ve(X,he){if(l){for(let _e of[-2.45,2.45])_(B(X+_e,1.8,-2.6,.15,3.6,.15,C));_(B(X,3.65,-2.6,5.2,.16,1.4,E)),_(B(X,1.55,-3.7,5.2,3.1,.15,A))}z(he,X,2.9,-3.52,3.7,65,a?"#efe3c8":"#35352b",a?"#233f44":"#e9dfca")}fe.forEach((X,he)=>ve(X,[`01  Build
Mobile & web`,`02  Explore
Document AI`,`03  Lead
Engineering`][he]));let[we,Ce,Me]=fe,te=_(U.bench(we,-1.75));D(we,-1.75,3.3,1.8);let ie=Yp({group:r,mesh:N,box:B,mat:b,detail:p,ownedTextures:g,ownedMaterials:m,batch:U.batch,x:we});ie||H("laptop",we+.45,1.2,-1.5,.38);let Ae=H("chairDesk",we,0,-.05,1.08,Math.PI);D(we,-.05,.65,.65),Y("build","Mobile & web",we,1.9,-1.55,{x:we+.9,z:.6},te),ie&&ie.object.traverse(X=>{X.isMesh&&(X.userData.target="build",u.push(X))});let Re=new Ze;Re.position.set(Ce,0,-1.6),r.add(Re),B(0,.65,0,2.7,1.3,1.45,w,Re),B(0,1.38,.15,2.6,.1,1.25,M,Re),B(0,1.85,-.15,2.5,1,.6,A,Re),B(0,1.73,.18,1.7,.16,.025,M,Re);for(let X=0;X<9;X++){let he=k(-1.16+X*.29,1.44,.3,.065,1,M,Re);he.rotation.x=Math.PI/2}for(let X=0;X<3;X++){let he=B(-.8+X*.6,1.53,.3,.49,.025,.77,P,Re);f.push({type:"paper",object:he,phase:X/3})}let ae=N(new Nt(.09,16,12),b(12210232,{emissive:10891556,emissiveIntensity:.4}),.96,1.93,.19,Re);z("DOCUMENT LAB",Ce,1,-.86,1.5,42),D(Ce,-1.6,2.9,1.75),Y("ai","Document AI",Ce,2.6,-1.6,{x:Ce,z:1.3},Re),_(Re),D(Ce,-.15,1.25,1.85);let Te={};function Z(X,he,_e){let le=new Ze;le.name=`reading-table-${X}`,le.position.set(he,0,_e),r.add(le),B(0,.96,0,1.76,.1,.92,C,le);for(let ye of[-.74,.74])for(let F of[-.34,.34])B(ye,.455,F,.095,.91,.095,C,le);return B(0,.63,-.34,1.53,.1,.07,C,le),_(le),D(he,_e,1.76,.92),Te[X]={x:he,y:1.045,z:_e},le}let T=Z("reports",Ce+1.92,.55);for(let X of[-.81,.81])_(B(X,.45,0,.12,.83,.84,C,T));_(B(0,.45,-.39,1.55,.83,.08,C,T)),_(B(0,.18,0,1.55,.08,.84,C,T));let O=new Ze;O.name="scm-archive-drawer",T.add(O),B(0,.75,0,1.5,.06,.9,C,O),B(0,.83,.46,1.56,.22,.07,C,O),B(0,.83,.515,.32,.04,.05,M,O);for(let X of[-.76,.76])B(X,.82,0,.05,.17,.9,C,O);Te.reports.drawer=O,Y("reports","SCM Tools",Ce+1.92,.88,1.05,{x:Ce+1.92,z:2.15},T);let W=_(U.meeting(Me,-1.3));D(Me,-1.3,2.1,2.1),H("laptop",Me,1.05,-1.3,.4),H("books",Me+.55,1.05,-1.1,.2);for(let X of[-1.3,1.3])H("chair",Me+X,0,-1.35,1,Math.sign(X)*Math.PI/2),D(Me+X,-1.35,.5,.5);_(B(Me,1.5,-3.28,3.6,1.5,.1,C)),B(Me,1.5,-3.2,3.42,1.32,.025,w),Y("lead","Engineering",Me,1.8,-1.3,{x:Me,z:.65},W);let G=l?Me+2.5:7.35,J=l?1.4:1.25,se=_(U.bookshelf(G,J));se.rotation.y=-Math.PI/2,D(G,J,.7,1.2),z("Open source",G-.29,2.15,J,1,54,"#38392f","#eee5d1",-Math.PI/2);let ce=Z("source",G-1.3,J+.3);Y("source","Open source",G-1.3,1.18,J+.3,{x:G-1.45,z:J+1.65},ce),se.traverse(X=>{X.isMesh&&(X.userData.target="source",u.push(X))});let pe=l?we-1.8:-6.4,Oe=2.15,ke=H("loungeChair",pe,0,Oe,.85,0);D(pe,Oe,.85,.75),Y("sit","Take a seat",pe,1.2,Oe,{x:pe,z:Oe+.85},ke);let I=l?Me-2.3:7.55,S=l?2.5:2.9,V=H("lampRoundFloor",I,0,S,2.1);D(I,S,.4,.4);let j=new vi(16763523,a?9:2,7,2);j.position.set(I,1.85,S),r.add(j);let re=N(new Nt(.12,16,12),b(16770730,{emissive:16761720,emissiveIntensity:2}),I,1.85,S);Y("lamp","Lamp",I,2.6,S,{x:I+(l?.7:-.7),z:S+.25},V);let Q=0,Pe=l?3.15:4.35,be=_(U.doorway(Q,Pe));Y("door","Choose a world",Q,2.3,Pe,{x:.045,z:Pe-.415},be),D(Q,Pe,1.5,.3);for(let X of fe)if(D(X-2.1,-2.9,.55,.55),D(X+2.1,-2.9,.5,.5),l){let he=X===Me?X:X+2.5;H("tree_oak",he,0,3.1,2.4,.5),D(he,3.1,.8,.8),H("grass_large",X-2.6,0,3.2,.35),H("flower_redA",X-2.3,0,3.4,.3)}if(_(U.roomDetails(fe,a,l)),U.scannerDetail(Ce,-1.6),!l)for(let X of[-1,1])D(X*4.5,4.35,7.3,.23);if(a)for(let X of[-6.8,6.8])B(X,2,-4.14,1.1,1.6,.08,C),B(X,2,-4.08,.92,1.38,.05,b(6323843,{emissive:2638667,emissiveIntensity:.6})),B(X,2,-4.01,.035,1.38,.025,C),B(X,2,-4.01,.92,.035,.025,C);for(let X of fe){let he=N(new as(.37,.3,24,1,!0),E,X,3.2,-1.5);he.rotation.x=0,k(X,3.7,-1.5,.014,.8,M);let _e=N(new Nt(.115,16,12),b(16770223,{emissive:16759915,emissiveIntensity:a?3:.7}),X,3.15,-1.5);if(a){let le=new vi(16762753,11,7,2);le.position.set(X,2.95,-1.5),r.add(le)}}if(a&&cm({group:r,ownedMaterials:m,ownedGeometries:x,stoneMap:p.stoneColor}),!l&&!a){let X=new Ze;X.name="tabletop-props",r.add(X);let he=new Ze;he.position.set(-6.8,-.64,6.9),he.rotation.y=-.4,X.add(he);let _e=N(new Ut(.095,.095,3.7,12),M,0,0,0,he);_e.rotation.z=Math.PI/2;let le=b(12163942,{metalness:.5,roughness:.45});for(let me of[-1.65,.9,1.7]){let Le=N(new Ut(.101,.101,.08,12),le,me,0,0,he);Le.rotation.z=Math.PI/2}let ye=N(new as(.095,.5,12),le,2.1,0,0,he);ye.rotation.z=-Math.PI/2;let F=new Ze;F.position.set(10.1,-.75,4.7),F.scale.setScalar(7),X.add(F),U.cup(F,0,0,0);let oe=new Ze;oe.position.set(-10.4,-.76,3.4),oe.rotation.y=.15,oe.scale.setScalar(3.3),X.add(oe),U.pages(oe,0,0,0,3,1),U.planter(-10.2,-.75,-3.7,2.1,X,1),U.batch(X)}s==="paper"&&lm({group:r,surfaces:p,ownedMaterials:m,ownedGeometries:x,batch:U.batch}),v.populate(fe);let Ne=hm({group:r,targets:h,readingStations:Te,ownedMaterials:m,ownedGeometries:x,ownedTextures:g,props:u,cameraColliders:d}),ze=dm({group:r,targets:h,ownedMaterials:m,ownedGeometries:x,ownedTextures:g}),Se=!1;return{ambientTime:v.time,displays:Ne,effects:ze,surfaces:p,doorway:be.doorway,workstation:ie,resourceStats:()=>Zp(x,g),group:r,cameraColliders:d,updateEnvironment(X,he){v.update(X,he),y&&y.update(v.time(),he)},bounds:$,obstacles:c,targets:h,props:u,animated:f,palette:o,start:{x:l?-7:-4.7,z:2.7},lampLight:j,bulb:re,seat:{x:pe,z:Oe},dispose(){Se||(Se=!0,r.traverse(X=>{X.isInstancedMesh&&X.dispose()}),m.forEach(X=>X.dispose()),x.forEach(X=>X.dispose()),g.forEach(X=>X.dispose()))}}}var de=s=>document.querySelector(s),jt=de("#world-canvas"),oi=de("#stage"),$c=de("#world-status"),Lt,Jc,qn,Dn,tr,Ue,Dm,vt,Yc,_d={},xa,Jr="",ai=[],bi={x:0,z:0},Mt={x:0,z:0},Qr="paper",Nn=!1,Ei=!1,li=!1,Sn=-1,an=null,Im=0,vd,Yn=!1,bt=null,jc=null,bn=null,gt=matchMedia("(prefers-reduced-motion: reduce)").matches,Kr=!0,Sd=0,ma=0,Qc=0,Pm,wM=0,Bt=new Set,_a=["build","ai","lead","source"],md=new Hs,Lm=new ge,AM=new Bn(new L(0,1,0),0),gd=new L,Nm=nm(),En=jp(),Wi=Qp(),Xi=1;try{Xi=Math.min(1.8,Math.max(.6,Number(localStorage.getItem("world-look-sensitivity"))||1))}catch{}var RM=matchMedia("(prefers-reduced-motion: reduce)");function bd(){document.body.classList.toggle("calm",gt),de("#motion").setAttribute("aria-pressed",String(gt))}bd();RM.addEventListener("change",s=>{gt=s.matches,bd()});var yd;function Um(){clearTimeout(yd),document.body.classList.remove("world-intro"),requestAnimationFrame(()=>{document.body.classList.add("world-intro"),yd=setTimeout(()=>document.body.classList.remove("world-intro"),gt?2300:4300)})}function eu(){clearTimeout(yd),document.body.classList.remove("world-intro")}de("#panel-camera").addEventListener("click",()=>{de("#explore-panel").close(),Ti("#camera-dialog")});function Yi(s,e=4500){clearTimeout(Pm),$c.textContent=s,e&&(Pm=setTimeout(()=>{$c.textContent=""},e))}function qi(){return!!document.querySelector("dialog[open]")}function ci(){Bt.clear(),En.reset(),Wi.reset(),nr(),bi={x:0,z:0},ai=[],Ue?.effects.cancelDestination()}function Ti(s){bt&&s!=="#world-picker"&&Ma(),ci(),s!=="#explore-panel"&&de("#explore-panel").open&&de("#explore-panel").close();let e=de(s);e.open||(e.returnValue="",e.showModal()),s==="#explore-panel"&&de("#explore-menu").setAttribute("aria-expanded","true")}de("#explore-menu").addEventListener("click",()=>Ti("#explore-panel"));de("#explore-panel").addEventListener("close",()=>de("#explore-menu").setAttribute("aria-expanded","false"));var Fm={build:"build",ai:"ai",reports:"reports",lead:"lead",source:"source",sit:"chair",lamp:"lamp",door:"door"},Om=s=>`<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-${s}"/></svg>`;function Bm(s){de("#tour [data-label]").textContent=s?"End tour":"Guided tour",de("#tour").setAttribute("aria-pressed",String(s))}document.querySelectorAll("[data-close]").forEach(s=>s.addEventListener("click",()=>{let e=s.closest("dialog");e.id==="story-dialog"&&Wt(),e.close()}));document.querySelectorAll("dialog").forEach(s=>{s.addEventListener("cancel",()=>{s.id==="story-dialog"&&Wt()}),s.addEventListener("click",e=>{if(e.target===s){let t=s.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&(s.id==="story-dialog"&&Wt(),s.close())}}),s.addEventListener("close",()=>{Nn&&!qi()&&(s.id==="explore-panel"&&s.returnValue!=="walk"?de("#explore-menu"):jt).focus({preventScroll:!0})})});var Zc={diorama:"Diorama",third:"Third person",first:"First person",top:"Top view"};function zm(s){!Nn||!Zc[s]||(Lt.setMode(s,{calm:gt}),jt.dataset.camera=s,document.body.dataset.camera=s,de("#camera-menu").setAttribute("aria-label",`Camera: ${Zc[s]}`),de("#camera-tooltip").textContent=`${Zc[s]} \xB7 Change view`,document.querySelectorAll("[data-camera-mode]").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.cameraMode===s))),de("#camera-dialog").close(),jt.focus({preventScroll:!0}),de(".keyboard-hint").textContent=s==="first"||s==="third"?"W A S D / arrows to walk \xB7 Drag to look \xB7 I J K L to look \xB7 C to change camera":"W A S D / arrows to walk \xB7 Click the floor to move \xB7 C to change camera")}de("#look-sensitivity").value=Xi;de("#sensitivity-value").textContent=`${Xi.toFixed(1)}\xD7`;de("#look-sensitivity").addEventListener("input",s=>{Xi=Number(s.target.value),de("#sensitivity-value").textContent=`${Xi.toFixed(1)}\xD7`;try{localStorage.setItem("world-look-sensitivity",Xi)}catch{}});de("#camera-menu").addEventListener("click",()=>Ti("#camera-dialog"));document.querySelectorAll("[data-camera-mode]").forEach(s=>s.addEventListener("click",()=>zm(s.dataset.cameraMode)));de("#choose-world").addEventListener("click",()=>Ti("#world-picker"));de("#show-places").addEventListener("click",()=>Ti("#places-dialog"));de("#help").addEventListener("click",()=>Ti("#help-dialog"));de("#motion").addEventListener("click",()=>{gt=!gt,bd(),Yi(gt?"Calm motion enabled. Decorative animation is paused.":"Full motion enabled.")});de("#interact").addEventListener("click",()=>an&&va(an.id));function ps(s,e=!1){if(!_d[s]||Jr===s)return;Nm.transition();let t=_d[s];xa?.fadeOut(gt?.1:.24),t.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(gt?.1:.24).play(),t.setLoop(e?Ac:Rc,e?1:1/0),t.clampWhenFinished=e,xa=t,Jr=s}function Ed(s){!Nn||Ei||Yn||bn||bt||li||(de("#explore-panel").close(),Wt(),ci(),vt.rotation.y=Math.atan2(tr.position.x-vt.position.x,tr.position.z-vt.position.z),ps(s,!0),jt.focus())}de("#kuri-wave").addEventListener("click",()=>Ed("Wave"));de("#kuri-pose").addEventListener("click",()=>Ed("Pose"));function km(s){Xn={from:vt.position.clone(),to:new L(s.x,s.y||0,s.z),time:0}}function tu(){li&&(li=!1,Mt={...Ue.targets.find(s=>s.id==="sit").approach},km(Mt),ps("Standing",!0))}function Td(){document.querySelectorAll("[data-field-next]").forEach(s=>{s.hidden=Sn<0,s.textContent=Sn===_a.length-1?"Finish tour \u2713":"Next stop \u2192"})}function Wt(){Sn=-1,Bm(!1),de("#story-tour").hidden=!0,Td()}function nu(s){Ue.workstation.paint(s);let e=Ue.workstation.page,t=Js[e];de("#workstation-page").textContent=`${String(e+1).padStart(2,"0")} / ${String(Js.length).padStart(2,"0")}`,de("#workstation-prev").disabled=e===0,de("#workstation-next").disabled=e===Js.length-1;let n=de("#workstation-transcript");n.replaceChildren();let i=document.createElement("h2"),r=document.createElement("p");i.textContent=t.title,r.textContent=t.body,n.append(i,r)}function eo(){Yn&&(Yn=!1,Lt.releaseFocus(),Ue.workstation?.setReading(!1),document.body.classList.remove("reading-workstation"),de("#workstation-controls").hidden=!0,de("#hotspots").inert=!1,de(".world-dock").inert=!1,jt.focus({preventScroll:!0}))}function wd(){Td(),ci(),Zi=null,Yn=!0,$c.textContent="",Ue.workstation.setReading(!0),Ue.effects.trigger("build"),nu(0),Lt.focusOn(Ue.workstation.view()),document.body.classList.add("reading-workstation"),de("#hotspots").inert=!0,de(".world-dock").inert=!0,de("#workstation-controls").hidden=!1,de("#workstation-back").focus({preventScroll:!0}),ui()}de("#workstation-back").addEventListener("click",()=>{Wt(),eo()});de("#workstation-prev").addEventListener("click",()=>{nu(Ue.workstation.page-1),ui("paper")});de("#workstation-next").addEventListener("click",()=>{nu(Ue.workstation.page+1),ui("paper")});de("#workstation-text").addEventListener("click",()=>{let s=de("#workstation-text"),e=s.getAttribute("aria-pressed")!=="true";s.setAttribute("aria-pressed",String(e)),de("#workstation-transcript").classList.toggle("sr-only",!e)});function ya(){bn&&(Ue.animated.forEach(s=>s.object.visible=!0),bn=null,Ue.displays.close(),Lt.releaseFocus(),de("#display-controls").hidden=!0,document.body.classList.remove("reading-workstation"),de("#hotspots").inert=!1,de(".world-dock").inert=!1,jt.focus({preventScroll:!0}))}function Hm(s){Td(),ci(),Zi=null,bn=s,s==="ai"&&Ue.animated.forEach(t=>t.object.visible=!1);let e=Ue.displays.open(s,oi.clientWidth/oi.clientHeight);Lt.focusOn(e),s==="ai"&&(Sd=Ue.displays.printing?Qc+4:0),Ue.effects.trigger(s),de("#display-caption").textContent=Vn[s].title,de("#display-controls").hidden=!1,document.body.classList.add("reading-workstation"),de("#hotspots").inert=!0,de(".world-dock").inert=!0,de("#display-back").focus({preventScroll:!0}),(s!=="ai"||Ue.displays.printing)&&ui(s==="ai"?"machine":s==="source"?"book":"paper")}de("#display-back").addEventListener("click",()=>{Wt(),ya()});de("#display-full").addEventListener("click",()=>Vm(bn));function Vm(s){if(s==="build"&&Ue.workstation&&Sn<0){wd();return}let e=Vn[s];if(!e)return;let t=de("#story-content");t.replaceChildren();function n(i,r,o,a=t){let l=document.createElement(i);return l.textContent=r,o&&(l.className=o),a.append(l),l}if(n("p",e.eyebrow,"eyebrow"),n("h2",e.title).id="story-title",n("p",e.subtitle,"story-subtitle"),n("p",e.body),e.image){let i=n("figure",""),r=document.createElement("img");r.src=e.image,r.alt="Conceptual illustration of automated reporting",r.width=1024,r.height=768,i.append(r),n("figcaption","Conceptual illustration \xB7 not a product screenshot.",null,i)}if(e.facts){let i=n("div","","story-facts");for(let[r,o]of e.facts){let a=n("section","",null,i);n("h3",r,null,a),n("p",o,null,a)}}if(e.repositories){let i=n("div","","story-links");for(let[r,o,a]of e.repositories){let l=n("a",`${r} \u2197`,null,i);l.href=`https://github.com/ariefwijaya/${a}`,n("span",o,null,l)}}if(e.demo){let i=n("div","","world-demo");n("p","SYNTHETIC INVOICE \xB7 SAMPLE-001 \xB7 TOTAL 120.00",null,i);let r=n("pre",'{ "invoice_id": null, "total": null }',null,i);r.setAttribute("role","status");let o=n("button","Run the document machine \u2192","button",i);o.addEventListener("click",()=>{Sd=Qc+4,r.textContent=`{
  "invoice_id": "SAMPLE-001",
  "total": 120.00
}`,o.textContent="Run again \u21BB",ui("machine")})}if(e.link){let i=n("a",`${e.linkText} \u2197`,"text-link accent");i.href=e.link}de("#story-tour").hidden=Sn<0,Sn>=0&&(de("#tour-progress").textContent=`Stop ${Sn+1} of ${_a.length}`,de("#tour-next").textContent=Sn===_a.length-1?"Finish tour \u2713":"Next stop \u2192"),Ti("#story-dialog"),ui()}function Ma(){bt&&(jc?.update(null,0),bt=null,Ue?.doorway?.setOpen(!1),Lt.releaseFocus(),de("#door-back").hidden=!0,de("#hotspots").inert=!1,de(".world-dock").inert=!1,jt.focus({preventScroll:!0}))}function CM(){Wt(),ci();let s=Ue.targets.find(e=>e.id==="door");jr(s.approach,()=>{bt={time:0,opened:!1,picker:!1,from:{...Mt},to:{...s.approach}},jc??=qp(vt),Lt.focusOn(Ue.doorway.view()),de("#door-back").hidden=!1,de("#hotspots").inert=!0,de(".world-dock").inert=!0,de("#door-back").focus({preventScroll:!0}),Yi("Opening the doorway\u2026",1800)})}de("#door-back").addEventListener("click",Ma);de("#world-picker").addEventListener("close",Ma);function va(s){if(eu(),!(!Nn||Ei||Yn||bn||bt)){if(s==="build"&&Ue.workstation){Wt(),ci(),jr(Ue.targets.find(e=>e.id==="build").approach,wd);return}if(Ue.effects.trigger(s),Vn[s]&&s!=="build"){Wt(),ci(),jr(Ue.targets.find(e=>e.id===s).approach,()=>Hm(s));return}if(s==="door"){Ue.doorway?CM():Ti("#world-picker");return}if(s==="lamp"){Kr=!Kr,Ue.lampLight.intensity=Kr?Qr==="night"?9:2:0,Ue.bulb.material.emissiveIntensity=Kr?2:0,Yi(Kr?"Lamp on.":"Lamp off."),ui("lamp");return}if(s==="sit"){Wt(),tu(),ci(),jr(Ue.targets.find(e=>e.id==="sit").approach,()=>{li=!0,km({...Ue.seat,y:.03}),ps("Sitting",!0),ui("chair"),Yi("Take your time. Move when you\u2019re ready to stand.")});return}Vm(s)}}var Zi=null,Xn=null;function jr(s,e=null){return eu(),tu(),ai=$p(Mt,s,n=>Uh(n,Ue.bounds,Ue.obstacles)),Zi=e,Ue.effects.setDestination(s,ai.length>0),ai.length?!0:(Yi("That spot is out of reach. Choose an open part of the floor."),Zi=null,!1)}function Ad(){if(Sn>=_a.length){Wt(),Yi("That\u2019s the tour. Stay and explore, or head back to the portfolio.");return}let s=_a[Sn],e=Ue.targets.find(n=>n.id===s);Bm(!0),Yi(`Walking to ${e.label}\u2026`,0);let t=()=>{$c.textContent="",s==="build"?wd():Hm(s)};jr(e.approach,t)||t()}de("#tour").addEventListener("click",()=>{de("#explore-panel").close("walk"),jt.focus({preventScroll:!0}),Sn>=0?(Wt(),ci(),Yi("Tour ended. Explore at your own pace.")):(Sn=0,Ad())});document.querySelectorAll("[data-field-next]").forEach(s=>s.addEventListener("click",()=>{ya(),eo(),Sn++,Ad()}));de("#tour-next").addEventListener("click",()=>{de("#story-dialog").close(),ya(),eo(),Sn++,Ad()});var gs=Nd(),Ki=!0,xd=0,Md=-1,Kc=!1,Gm=!1;try{Ki=localStorage.getItem("world-sound")!=="off"}catch{}function IM(){gs.setWorld(Qr)}function Wm(){de("#sound [data-label]").textContent=Ki?"Sound on":"Sound off",de("#sound").setAttribute("aria-pressed",String(Ki))}async function Xm(s,e=!1){if(!Kc){Kc=!0,de("#sound").disabled=!0;try{if(await gs.enable(s),Ki=s,Gm=s,e)try{localStorage.setItem("world-sound",s?"on":"off")}catch{}}catch(t){Ki=!1,console.error(t),Yi("The sound files could not be loaded. Please try again.")}finally{Kc=!1,de("#sound").disabled=!1,Wm()}}}function qm(s){!s.isTrusted||!Ki||Gm||Kc||s.target.closest?.("#sound")||s.type==="keydown"&&(s.repeat||s.ctrlKey||s.metaKey||s.altKey||["Shift","Control","Alt","Meta","Tab","Escape"].includes(s.key))||Xm(!0)}document.addEventListener("pointerdown",qm);document.addEventListener("keydown",qm);function ui(s="note"){gs.cue(s,Mt)}de("#sound").addEventListener("click",()=>Xm(!Ki,!0));Wm();function Ym(){if(!qn||!Lt)return;let s=oi.clientWidth,e=oi.clientHeight;Lt.resize(s,e,Qr),bn&&Lt.focusOn(Ue.displays.view(s/e)),qn.setPixelRatio(Math.min(devicePixelRatio,s<800?1.35:1.75)),qn.setSize(s,e,!1),Jc?.resize(s,e)}window.addEventListener("resize",()=>{En.reset(),Wi.reset(),nr(),Ym()});function PM(){let s=de("#hotspots"),e=de("#places-list");s.replaceChildren(),e.replaceChildren();for(let t of Ue.targets){let n=document.createElement("button");n.className="hotspot",n.dataset.id=t.id,n.setAttribute("aria-label",t.label),n.innerHTML=`<span class="dot" aria-hidden="true">${Om(Fm[t.id])}</span><span class="hotspot-label" aria-hidden="true"></span>`,n.lastChild.textContent=t.label,n.addEventListener("click",()=>{Wt(),va(t.id)}),s.append(n),t.button=n;let i=document.createElement("button"),r=document.createElement("span");r.textContent=t.label,i.append(r,document.createTextNode("\u2197")),i.addEventListener("click",()=>{de("#places-dialog").close(),Wt(),va(t.id)}),e.append(i)}}async function Zm(s,e=!1){if(!$s[s]||Ei)return;Ma(),eo(),ya(),Ei=!0,ci(),Zi=null,Xn=null,Wt(),li=!1,e||(oi.classList.add("switching"),await new Promise(i=>setTimeout(i,gt?0:280)));let[t,n]=await Promise.all([s==="islands"?Wp():void 0,Hp(s)]);Ue&&(Dn.remove(Ue.group),Ue.dispose()),Qr=s,Md=-1,Ue=Cm(s,Dm,$r,t,n),Dn.add(Ue.group),Gp(vt,Ue.surfaces),Dn.background=new Ve(Ue.palette.background),Dn.fog=new Ro(s==="islands"?12049637:Ue.palette.background,160,300),on.intensity=s==="night"?1.6:2.65,on.color.set(s==="night"?12900834:16769459),ga.intensity=s==="night"?2.15:1.65,ga.color.set(s==="night"?10597303:16183003),ga.groundColor.set(s==="night"?2701623:11905165),document.body.dataset.theme=$s[s].theme,de("#world-name").textContent=$s[s].name,de("#world-number").textContent=`${$s[s].number} / My World`,de("#world-subtitle").textContent=$s[s].subtitle,jt.dataset.world=s,Mt={...Ue.start},bi={x:0,z:0},vt.position.set(Mt.x,0,Mt.z),vt.rotation.y=Math.PI,ps("Idle"),Kr=!0,PM(),Ym(),Lt.update(0,{position:Mt,heading:vt.rotation.y,calm:gt,colliders:Ue.cameraColliders,snap:!0}),IM(),history.replaceState(null,"",`/world/${location.search}#${s}`),oi.classList.remove("switching"),Ei=!1,e||Um()}document.querySelectorAll("[data-world]").forEach(s=>s.addEventListener("click",()=>{de("#world-picker").close(),Zm(s.dataset.world)}));var to={w:"up",ArrowUp:"up",s:"down",ArrowDown:"down",a:"left",ArrowLeft:"left",d:"right",ArrowRight:"right"};window.addEventListener("keydown",s=>{if(!Nn||Ei||qi()||s.ctrlKey||s.metaKey||s.altKey||["INPUT","TEXTAREA","SELECT"].includes(s.target.tagName))return;if(bn){s.key==="Escape"&&(s.preventDefault(),Wt(),ya());return}if(bt){s.key==="Escape"&&(s.preventDefault(),Ma());return}let e=s.key.toLowerCase();if(Yn)if(s.key==="Escape")s.preventDefault(),Wt(),eo();else if(s.key==="ArrowRight"||s.key==="ArrowLeft")s.preventDefault(),nu(Ue.workstation.page+(s.key==="ArrowRight"?1:-1));else if(["w","a","s","d"].includes(e))eo();else return;if(e==="1"||e==="2"){s.preventDefault(),Ed(e==="1"?"Wave":"Pose");return}if(e==="m"){s.preventDefault(),Ti("#explore-panel");return}if(e==="c"){s.preventDefault();let n=Object.keys(Zc);zm(n[(n.indexOf(Lt.mode)+1)%n.length]);return}if(["BUTTON","A"].includes(s.target.tagName)&&!s.target.closest(".world-dock"))return;if(["i","j","k","l"].includes(e)){s.preventDefault(),Bt.add(e);return}let t=to[s.key]||to[e];t?(eu(),s.preventDefault(),tu(),Wt(),ai=[],Zi=null,Ue.effects.cancelDestination(),Bt.add(t)):s.key.toLowerCase()==="e"&&an&&(s.preventDefault(),va(an.id))});window.addEventListener("keyup",s=>Bt.delete(to[s.key]||to[s.key.toLowerCase()]||s.key.toLowerCase()));window.addEventListener("blur",()=>{En.reset(),Wi.reset(),nr(),Bt.clear(),bi={x:0,z:0},gs.context?.suspend()});window.addEventListener("focus",()=>{ma=0,Ki&&gs.context?.resume()});document.addEventListener("visibilitychange",()=>{En.reset(),Wi.reset(),nr(),Bt.clear(),bi={x:0,z:0},ma=0,document.hidden?gs.context?.suspend():Ki&&gs.context?.resume()});var ms=de("#joystick-pad");function nr(){let s=de("#joystick-pad");if(!s)return;let e=En.thumb;s.style.setProperty("--stick-x",`${e.x}px`),s.style.setProperty("--stick-y",`${e.y}px`),s.classList.toggle("is-active",En.active)}function Km(){eu(),tu(),Wt(),ai=[],Zi=null,Ue.effects.cancelDestination()}ms.addEventListener("pointerdown",s=>{if(!Nn||Ei||qi())return;s.preventDefault();let e=ms.getBoundingClientRect();En.begin(s.pointerId,e.left+e.width/2,e.top+e.height/2)&&(ms.setPointerCapture(s.pointerId),En.move(s.pointerId,s.clientX,s.clientY),Km(),nr())});ms.addEventListener("pointermove",s=>{En.pointerId===s.pointerId&&(En.move(s.pointerId,s.clientX,s.clientY),nr())});for(let s of["pointerup","pointercancel","lostpointercapture"])ms.addEventListener(s,e=>{En.end(e.pointerId),nr()});ms.addEventListener("keydown",s=>{let e=to[s.key];e&&Nn&&!qi()&&(s.preventDefault(),Km(),Bt.add(e))});ms.addEventListener("keyup",s=>Bt.delete(to[s.key]));ms.addEventListener("blur",()=>{Bt.clear()});function $m(s,e){s.addEventListener("pointerdown",t=>{!Nn||Ei||qi()||Yn||bn||bt||t.button>0||Wi.begin(t.pointerId,t.clientX,t.clientY)&&(t.preventDefault(),s.setPointerCapture(t.pointerId),t.pointerType!=="touch"&&jt.focus({preventScroll:!0}))}),s.addEventListener("pointermove",t=>{let n=Wi.move(t.pointerId,t.clientX,t.clientY);if(!n||qi()||Yn||bn||bt)return;let i=Xi*(t.pointerType==="touch"?1.9:1);Lt.look(n.x*i,n.y*i)}),s.addEventListener("pointerup",t=>{let n=Wi.end(t.pointerId);if(!n||!n.tap||!e||!Nn||Ei||qi()||Yn||bn||bt)return;let i=jt.getBoundingClientRect();Lm.set((t.clientX-i.left)/i.width*2-1,-(t.clientY-i.top)/i.height*2+1),md.setFromCamera(Lm,tr);let r=md.intersectObjects(Ue.props,!1)[0];if(Wt(),r){va(r.object.userData.target);return}tm(Lt.mode)&&md.ray.intersectPlane(AM,gd)&&jr({x:gd.x,z:gd.z})});for(let t of["pointercancel","lostpointercapture"])s.addEventListener(t,n=>Wi.end(n.pointerId))}$m(jt,!0);$m(de("#look-pad"),!1);de("#look-pad").addEventListener("keydown",s=>{let e=s.key.toLowerCase();["i","j","k","l"].includes(e)&&Nn&&!qi()&&(s.preventDefault(),Bt.add(e))});de("#look-pad").addEventListener("keyup",s=>Bt.delete(s.key.toLowerCase()));de("#look-pad").addEventListener("blur",()=>{for(let s of["i","j","k","l"])Bt.delete(s)});function Jm(s){if(requestAnimationFrame(Jm),!Nn||document.hidden)return;let e=vd?.begin(),t=ma?Math.min((s-ma)/1e3,.04):0;ma=s,Qc+=t;let n=qi()||Ei||Yn||!!bn||!!bt||location.hash==="#world-stories",i=0,r=0;if(!n&&!li&&!Xn){if(En.active){let u=En.value;({x:i,z:r}=Lt.movement(u.x,u.z))}else if(["up","down","left","right"].some(u=>Bt.has(u))){let u=Number(Bt.has("right"))-Number(Bt.has("left")),f=Number(Bt.has("down"))-Number(Bt.has("up"));({x:i,z:r}=Lt.movement(u,f))}else if(ai.length){let u=ai[0],f=Wr(Mt,u);if(f<.13){if(ai.shift(),!ai.length){bi={x:0,z:0};let d=Zi;Zi=null,d?.()}}else i=(u.x-Mt.x)/f,r=(u.z-Mt.z)/f}}let o=Math.hypot(i,r),a=2.55;if(o>1&&(i/=o,r/=o),bi=em(bi,{x:i*a,z:r*a},t),!n&&!li&&!Xn){let u={...Mt};Mt=Jp(Mt,bi,t,d=>Uh(d,Ue.bounds,Ue.obstacles)),vt.position.set(Mt.x,0,Mt.z),xd+=Wr(u,Mt),xd>.64&&(xd%=.64,ui("step"));let f=Wr(u,Mt)/Math.max(t,.001);f>.055?(vt.rotation.y=zc(vt.rotation.y,Math.atan2(bi.x,bi.z),12,t),ps("Walking"),xa.timeScale=js(xa.timeScale,Math.max(.1,Math.min(2.6,f/.95)),12,t)):Jr==="Walking"&&ps("Idle")}else!li&&Jr==="Walking"&&ps("Idle");if(Xn){Xn.time=Math.min(1,Xn.time+t);let u=Xn.time,f=u*u*(3-2*u);vt.position.lerpVectors(Xn.from,Xn.to,f),vt.rotation.y=zc(vt.rotation.y,0,9,t),u===1&&(Xn=null)}if(bt){bt.time+=t;let u=gt?1:Pt.smoothstep(bt.time,0,.25);Mt.x=Pt.lerp(bt.from.x,bt.to.x,u),Mt.z=Pt.lerp(bt.from.z,bt.to.z,u),vt.position.set(Mt.x,0,Mt.z);let f=Ue.targets.find(d=>d.id==="door");vt.rotation.y=zc(vt.rotation.y,Math.atan2(f.position.x-Mt.x,f.position.z-Mt.z),8,t),!bt.opened&&(gt||bt.time>.85)&&(bt.opened=!0,Ue.doorway.setOpen(!0),Ue.effects.trigger("door"),ui("door")),!bt.picker&&(gt||bt.time>2.05)&&(bt.picker=!0,de("#door-back").hidden=!0,Ti("#world-picker"))}if(Ue.doorway?.update(t,gt),Yc.update(Nm.step(t,{calm:gt,idle:Jr==="Idle"})),jc){let u=bt?.time??0,f=Pt.smoothstep(u,.25,.75),d=1-Pt.smoothstep(u,1,1.35);jc.update(bt&&!gt?Ue.doorway.handlePosition():null,gt?0:f*d)}n||Lt.look((Number(Bt.has("l"))-Number(Bt.has("j")))*t*260*Xi,(Number(Bt.has("k"))-Number(Bt.has("i")))*t*180*Xi),Lt.update(t,{position:{x:vt.position.x,y:li?-.28:0,z:vt.position.z},heading:vt.rotation.y,calm:gt,colliders:Ue.cameraColliders}),vt.visible=!Lt.isFirstPerson&&!Yn&&!bn;let l=Lt.mode==="first"||Lt.mode==="third";if(Dn.fog.near=js(Dn.fog.near,l?18:160,5,t),Dn.fog.far=js(Dn.fog.far,l?85:300,5,t),Ue.workstation?.updateView(tr,oi.clientHeight),Ue.workstation?.update(t,{calm:gt,near:an?.id==="build"}),Ue.updateEnvironment?.(t,{calm:gt,active:!n}),Qr==="islands"&&!n&&!gt){let u=Math.floor(Ue.ambientTime()/38);u!==Md&&(Md=u,ui("bird"))}let c=Qc<Sd;c&&!gt&&(Im+=t);for(let u of Ue.animated)u.type==="paper"&&!gt&&(c?u.object.position.x=-1.05+(Im*.55+u.phase)%1*2.1:n||(u.object.position.x=-.8+u.phase*1.8));jt.dataset.motion=gt?"calm":"full",jt.dataset.input=En.active?"joystick":Wi.active?"look":"idle",jt.dataset.movement=Jr.toLowerCase(),an=null;let h=1.35;for(let u of Ue.targets){let f=Wr(Mt,u.approach);f<h&&(an=u,h=f)}if(wM++%2===0){for(let f of Ue.targets){let d=f.position.clone().project(tr),m=(d.x*.5+.5)*oi.clientWidth,x=(-d.y*.5+.5)*oi.clientHeight,g=!Yn&&!bn&&d.z>=-1&&d.z<=1&&m>25&&m<oi.clientWidth-25&&x>190&&x<oi.clientHeight-120;f.button.hidden=!g,f.button.style.display=g?"flex":"none",f.button.style.left=`${m}px`,f.button.style.top=`${x}px`,f.button.classList.toggle("is-near",f===an)}let u=de("#interact");u.hidden=!an||n||li||!!Xn,an&&u.dataset.target!==an.id&&(u.dataset.target=an.id,u.setAttribute("aria-label",an.label),u.setAttribute("aria-keyshortcuts","E"),u.innerHTML=`${Om(Fm[an.id])}<span>${an.label}</span><kbd aria-hidden="true">E</kbd>`)}Ue.displays.update(t,gt),Ue.effects.update(t,{near:an?.id,calm:gt,hidden:n,walking:ai.length>0,position:Mt}),Jc.render(t),vd?.end(e,s,Ue,Qr)}var on,ga,$r;async function LM(){try{qn=new Uc({canvas:jt,antialias:!0,powerPreference:"high-performance"}),qn.shadowMap.enabled=!0,qn.shadowMap.type=Al,qn.outputColorSpace=Qe,qn.toneMapping=Ur,qn.toneMappingExposure=1,jt.addEventListener("webglcontextlost",t=>{t.preventDefault(),Nn=!1,document.body.classList.add("failed"),de("#loading").hidden=!1,de("#loading h2").textContent="The 3D view was interrupted",de("#load-message").textContent="Reload this page to reopen it, or use the portfolio links below.",de("#load-progress").hidden=!0,ci(),gs.context?.suspend()}),Dn=new Co,Lt=rm(),tr=Lt.camera,jt.dataset.camera="diorama",document.body.dataset.camera="diorama",Jc=am(qn,Dn,tr),vd=Kp(qn),ga=new qo(16183003,11905165,2.3),Dn.add(ga),on=new ks(16769459,3),on.position.set(-9,15,8),on.castShadow=!0,on.shadow.mapSize.set(2048,2048),on.shadow.camera.left=-18,on.shadow.camera.right=18,on.shadow.camera.top=13,on.shadow.camera.bottom=-13,on.shadow.camera.near=.5,on.shadow.camera.far=55,on.shadow.normalBias=.025,on.shadow.bias=-1e-4,on.shadow.radius=4,Dn.add(on);let s=await Rm(t=>{de("#load-progress").value=t*.65,de("#load-message").textContent="Preparing your surroundings\u2026"});Dm=s.models,de("#load-progress").value=.7,de("#load-message").textContent="Adding the finishing touches\u2026",$r=await new Bs().loadAsync("/assets/paper-texture.webp"),$r.colorSpace=Qe,$r.wrapS=$r.wrapT=un,$r.repeat.set(2,2),vt=s.explorer.scene;let e=new en().setFromObject(vt).getSize(new L);vt.scale.setScalar(1.62/e.y),vt.traverse(t=>{t.isMesh&&(t.castShadow=!0,t.material.name==="Main"&&t.material.color.set(11949114),t.material.name==="Grey"&&t.material.color.set(14208437))}),Yc=new Jo(vt);for(let t of s.explorer.animations)_d[t.name]=Yc.clipAction(t);if(Yc.addEventListener("finished",t=>{!li&&t.action===xa&&ps("Idle")}),Dn.add(vt),await Zm($s[location.hash.slice(1)]?location.hash.slice(1):"paper",!0),de("#load-progress").value=1,de("#load-message").textContent="Your world is ready.",Nn=!0,requestAnimationFrame(Jm),document.documentElement.classList.contains("portal-entry")){await new Promise(n=>requestAnimationFrame(()=>requestAnimationFrame(n)));let t=de("#loading");!gt&&t.animate&&await t.animate([{opacity:1},{opacity:0}],{duration:650,easing:"ease-in-out"}).finished.catch(()=>{}),document.documentElement.classList.remove("portal-entry")}de("#loading").hidden=!0,Um()}catch(s){console.error("My World could not start:",s),document.body.classList.add("failed"),de("#loading h2").textContent="The 3D world couldn\u2019t open",de("#load-message").textContent="You can still explore every role and project in the portfolio below.",de("#load-progress").hidden=!0,Jc?.dispose(),qn?.dispose()}}LM();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
