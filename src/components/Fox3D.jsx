import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function buildMan(T){
var M=function(c,r){return new T.MeshStandardMaterial({color:c,roughness:r==null?.6:r,metalness:0});};
var skin=M(0xf0691a,.72),skinL=M(0xff8a3d,.68),skinD=M(0xc4520f,.78),cream=M(0xf9f1e6,.85),paw=M(0x1d1d22,.65),pad=M(0x44444e,.5),lipM=M(0x2a1410,.4),jk=M(0x1c1c22,.7),jk2=M(0x2a2a33,.6),wh=M(0xf6f6f2,.75),blk=M(0x0a0a0b,.55),org=M(0xff6a13,.45),pant=M(0x14141a,.8),eyeW=M(0xffffff,.25),iris=M(0x4a210a,.25);
var G=new T.Group(),Y=new T.Vector3(0,1,0),RC=new T.Raycaster(),i,s;
function S(r,m,x,y,z,sx,sy,sz,p){var o=new T.Mesh(new T.SphereGeometry(r,32,24),m);o.position.set(x,y,z);o.scale.set(sx||1,sy||1,sz||1);(p||G).add(o);return o;}
function C(rt,rb,h,m,x,y,z,p){var o=new T.Mesh(new T.CylinderGeometry(rt,rb,h,32),m);o.position.set(x,y,z);(p||G).add(o);return o;}
function L(p,a,b,r1,r2,m){var d=b.clone().sub(a),n=d.length(),o=new T.Mesh(new T.CylinderGeometry(r2,r1,n,24),m);o.position.copy(a).addScaledVector(d,.5);o.quaternion.setFromUnitVectors(Y,d.clone().normalize());p.add(o);return o;}
function hit(mesh,x,y){for(var f=1;f>.15;f-=.12){RC.set(new T.Vector3(x*f,y,6),new T.Vector3(0,0,-1));var h=RC.intersectObject(mesh,true);if(h.length)return h[0].point.z;}return 0;}
function inside(poly,x,y){var c=false;for(var a=0,b=poly.length-1;a<poly.length;b=a++){var xi=poly[a][0],yi=poly[a][1],xj=poly[b][0],yj=poly[b][1];if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))c=!c;}return c;}
function patch(poly,m,mesh,off,st){st=st||.013;var xs=poly.map(function(a){return a[0];}),ys=poly.map(function(a){return a[1];}),x0=Math.min.apply(null,xs),x1=Math.max.apply(null,xs),y0=Math.min.apply(null,ys),y1=Math.max.apply(null,ys),nx=Math.ceil((x1-x0)/st),ny=Math.ceil((y1-y0)/st),vi={},pos=[],ind=[],i,j;function V(a,b){var k=a+','+b;if(vi[k]==null){var x=x0+a*st,y=y0+b*st;vi[k]=pos.length/3;pos.push(x,y,hit(mesh,x,y)+off);}return vi[k];}for(j=0;j<ny;j++)for(i=0;i<nx;i++){if(!inside(poly,x0+(i+.5)*st,y0+(j+.5)*st))continue;var a=V(i,j),b=V(i+1,j),c=V(i+1,j+1),d=V(i,j+1);ind.push(a,b,c,a,c,d);}var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setIndex(ind);g.computeVertexNormals();var o=new T.Mesh(g,m);G.add(o);return o;}
function shapeOf(pts){var sh=new T.Shape();sh.moveTo(pts[0][0],pts[0][1]);for(var k=1;k<pts.length;k++)sh.lineTo(pts[k][0],pts[k][1]);return sh;}
function conform(geo,mesh,off){var p=geo.attributes.position;for(var k=0;k<p.count;k++){p.setZ(k,hit(mesh,p.getX(k),p.getY(k))+p.getZ(k)+off);}p.needsUpdate=true;geo.computeVertexNormals();return geo;}
function tube(pts,mesh,off,r,m,p){var v=pts.map(function(q){return new T.Vector3(q[0],q[1],hit(mesh,q[0],q[1])+off);});var o=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(v),24,r,8,false),m);(p||G).add(o);return o;}
// jambes
for(s=-1;s<=1;s+=2){C(.23,.2,1.45,pant,s*.29,.9,0);S(.3,blk,s*.29,.14,.14,1,.5,1.55);}
// veste (lathe lisse)
var prof=new T.SplineCurve([[.001,1.4],[.7,1.4],[.74,1.75],[.64,2.45],[.78,3.0],[.62,3.3],[.3,3.42],[.001,3.46]].map(function(a){return new T.Vector2(a[0],a[1]);})).getPoints(48);
var jc=new T.Mesh(new T.LatheGeometry(prof,56),jk);jc.scale.z=.62;G.add(jc);G.updateMatrixWorld(true);
function sj(x,y){return hit(jc,x,y);}
function flat(pts,m,off){return patch(pts,m,jc,off);}
flat([[-.34,3.42],[.34,3.42],[0,2.15]],wh,.008);
flat([[-.07,3.3],[.07,3.3],[.12,2.45],[0,2.28],[-.12,2.45]],org,.03);
S(.095,org,0,3.28,sj(0,3.28)+.035,1,.8,.7);
for(s=-1;s<=1;s+=2){
var lp=[[-.10,3.42],[-.44,3.38],[-.56,3.12],[-.41,3.04],[-.12,2.15]].map(function(a){return [s*(-a[0]),a[1]];});
if(s>0)lp.reverse();
var eg0=new T.ExtrudeGeometry(shapeOf(lp),{depth:.035,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:2});
conform(eg0,jc,.012);G.add(new T.Mesh(eg0,jk2));
var cw=[[-.06,3.45],[-.34,3.5],[-.36,3.2],[-.1,3.3]].map(function(a){return [s*(-a[0]),a[1]];});if(s>0)cw.reverse();
flat(cw,wh,.03);
}
flat([[-.58,2.78],[-.38,2.8],[-.37,2.72],[-.57,2.7]],org,.022);
S(.04,blk,0,1.98,sj(0,1.98)+.012);
C(.2,.24,.5,skinD,0,3.5,0);
// bras (pattes)
var elbows=[];
for(s=-1;s<=1;s+=2){
var sh=new T.Group();sh.position.set(s*.84,3.1,0);G.add(sh);
S(.3,jk,0,0,0,1,.95,.95,sh);
var E=new T.Vector3(s*.34,-1.05,0);
L(sh,new T.Vector3(),E,.28,.25,jk);
var eg=new T.Group();eg.position.copy(E);sh.add(eg);elbows.push(eg);
S(.255,jk,0,0,0,1,1,1,eg);
var W=new T.Vector3(s*.66,.6,0),dir=W.clone().normalize();
L(eg,new T.Vector3(),W.clone().multiplyScalar(.9),.25,.21,jk);
L(eg,W.clone().multiplyScalar(.86),W.clone().multiplyScalar(.96),.215,.215,wh);
L(eg,W.clone().multiplyScalar(.94),W.clone().multiplyScalar(1.04),.14,.13,skin);
var hg=new T.Group();hg.position.copy(W);hg.quaternion.setFromUnitVectors(Y,dir);eg.add(hg);
S(.22,paw,0,.2,0,1,1.02,.46,hg);
S(.1,pad,0,.15,.1,1.25,.95,.45,hg);
var th=C(.058,.064,.22,paw,-s*.21,.15,.02,hg);th.rotation.z=s*.6;
S(.058,paw,-s*.27,.25,.02,1,1,1,hg);S(.03,pad,-s*.27,.25,.07,1,1,.5,hg);
var ln=[.2,.25,.24,.19];
for(i=0;i<4;i++){var fx=-s*(.14-.093*i),fl=ln[i],fg=C(.054,.058,fl,paw,fx,.33+fl/2,0,hg);fg.rotation.z=-fx*1.1;S(.058,paw,fx-fx*1.1*fl/2,.33+fl,0,1,1,1,hg);S(.032,pad,fx*.95,.33+fl*.45,.055,1,1.2,.5,hg);}
}
// ruff blanc + cou
S(.44,cream,0,3.42,.05,1,.38,1);
// tete de renard
var HG=new T.Group();G.add(HG);
var sk=S(.62,skin,0,0,0,1.12,.92,.95,HG);
var sn=new T.Group();HG.add(sn);
S(.3,skinL,0,-.15,.62,.95,.8,1.5,sn);S(.27,cream,0,-.3,.6,.9,.55,1.35,sn);
for(s=-1;s<=1;s+=2){
S(.34,cream,s*.4,-.26,.28,1,.78,.9,HG);
for(i=0;i<3;i++){var tf=new T.Mesh(new T.ConeGeometry(.13,.34,10),cream);tf.position.set(s*(.7),-.1-i*.17,.12-i*.03);tf.rotation.z=-s*(1.45+i*.2);HG.add(tf);}
}
G.updateMatrixWorld(true);
function sf(x,y){return hit(sk,x,y);}
function sn_(x,y){return hit(sn,x,y);}
S(.088,paw,0,-.07,sn_(0,-.07)-.03,1.15,.8,.95,HG);
tube([[0,-.14],[0,-.2],[0,-.26]],sn,.01,.014,lipM,HG);
tube([[0,-.26],[-.07,-.33],[-.15,-.35],[-.24,-.31],[-.3,-.24]],sn,.012,.015,lipM,HG);
tube([[0,-.26],[.07,-.33],[.15,-.35],[.24,-.31],[.3,-.24]],sn,.012,.015,lipM,HG);
var eyes=[],ears=[];
for(s=-1;s<=1;s+=2){
var ex=s*.3,ey=.14,ez=sf(ex,ey),e=new T.Group();e.position.set(ex,ey,0);e.rotation.z=-s*.12;HG.add(e);eyes.push(e);
S(.115,eyeW,0,0,ez-.05,1,1.12,.6,e);
S(.075,iris,0,-.005,ez+.012,1,1.05,.35,e);
S(.04,blk,0,-.005,ez+.028,1,1.05,.3,e);
S(.022,new T.MeshBasicMaterial({color:0xffffff}),-.025,.03,ez+.04,1,1,.6,e);
var lash=new T.Mesh(new T.TorusGeometry(.115,.016,6,20,Math.PI*.9),blk);lash.rotation.z=Math.PI*.05;lash.position.set(0,.005,ez+.02);e.add(lash);
tube([[s*.18,.335],[s*.28,.38],[s*.4,.34]],sk,.014,.032,skinD,HG);
var ea=new T.Group();ea.position.set(s*.42,.5,-.04);ea.rotation.z=-s*.36;ea.rotation.x=-.08;HG.add(ea);ears.push(ea);
var eo=new T.Mesh(new T.ConeGeometry(.35,.74,16),skin);eo.position.y=.36;eo.scale.z=.58;ea.add(eo);
var ei=new T.Mesh(new T.ConeGeometry(.25,.56,16),cream);ei.position.set(0,.3,.09);ei.scale.z=.38;ea.add(ei);
var et=new T.Mesh(new T.ConeGeometry(.15,.26,16),paw);et.position.set(0,.64,.01);et.scale.z=.55;ea.add(et);
}
HG.position.set(0,4.42,0);HG.scale.setScalar(1.18);
// queue touffue
var tail=new T.Group();tail.position.set(0,1.75,-.5);G.add(tail);
var cv=new T.CatmullRomCurve3([new T.Vector3(0,0,0),new T.Vector3(.5,-.5,-.45),new T.Vector3(1.3,-.6,-.5),new T.Vector3(1.85,.05,-.35),new T.Vector3(1.95,.9,-.3)]);
for(i=0;i<18;i++){var tt=i/17,p=cv.getPoint(tt),r=.13+.34*Math.pow(Math.sin(Math.PI*Math.min(1,tt*.97+.02)),.85);
S(tt>.72?Math.max(r,.24)*1.03:r,tt>.72?cream:(tt>.6?skinL:skin),p.x,p.y,p.z,1,1,1,tail);}
return {G:G,HG:HG,eyes:eyes,elbows:elbows,tail:tail,ears:ears};
}


export default function Fox3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const T = THREE;
    const box = cv.parentNode;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let r;

    try {
      r = new T.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
    } catch (e) {
      return;
    }

    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const s = new T.Scene();
    const cam = new T.PerspectiveCamera(30, 500 / 570, 0.1, 100);
    cam.position.set(0, 3.1, 12.4);
    cam.lookAt(0, 3.0, 0);

    s.add(new T.HemisphereLight(0xffffff, 0x6a4a35, 0.55));
    const k1 = new T.DirectionalLight(0xfff1e6, 1);
    k1.position.set(3, 5, 7);
    s.add(k1);
    const f1 = new T.DirectionalLight(0xbfd4ff, 0.35);
    f1.position.set(-6, 2, 5);
    s.add(f1);
    const r1 = new T.DirectionalLight(0xff8a3a, 0.7);
    r1.position.set(-5, 3, -5);
    s.add(r1);
    const r2 = new T.DirectionalLight(0xffffff, 0.5);
    r2.position.set(5, 4, -4);
    s.add(r2);
    s.add(new T.AmbientLight(0xffffff, 0.12));

    const m = buildMan(T);
    s.add(m.G);

    const c2 = document.createElement('canvas');
    c2.width = c2.height = 64;
    const x = c2.getContext('2d');
    const gr = x.createRadialGradient(32, 32, 2, 32, 32, 32);
    gr.addColorStop(0, 'rgba(0,0,0,.45)');
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = gr;
    x.fillRect(0, 0, 64, 64);

    const sh = new T.Mesh(
      new T.PlaneGeometry(3.6, 1.4),
      new T.MeshBasicMaterial({
        map: new T.CanvasTexture(c2),
        transparent: true,
        depthWrite: false,
      })
    );
    sh.rotation.x = -Math.PI / 2;
    sh.position.set(0, 0.02, 0.1);
    s.add(sh);

    function size() {
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (!w || !h) return;
      r.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    }
    size();
    window.addEventListener('resize', size);
    if (box) box.classList.add('ok');

    let px = 0, py = 0, tx = 0, ty = 0, vis = true, nb = 2000;
    const handlePointerMove = (e) => {
      px = ((e.clientX / window.innerWidth) - 0.5) * 2;
      py = ((e.clientY / window.innerHeight) - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove);

    const observer = new IntersectionObserver((entries) => {
      vis = entries[0].isIntersecting;
    });
    if (box) observer.observe(box);

    function bl(v) {
      m.eyes.forEach((e) => {
        e.scale.y = v;
      });
    }

    let animId;
    function f(t) {
      animId = requestAnimationFrame(f);
      if (!vis) return;
      tx += (px - tx) * 0.06;
      ty += (py - ty) * 0.06;
      m.G.position.y = Math.sin(t * 0.0016) * 0.04;
      m.G.rotation.y = tx * 0.3;
      m.HG.rotation.y = tx * 0.35;
      m.HG.rotation.x = ty * 0.18;
      m.HG.rotation.z = tx * -0.05;
      m.tail.rotation.z = Math.sin(t * 0.0017) * 0.09;
      m.tail.rotation.y = Math.sin(t * 0.0013) * 0.1;
      m.ears[0].rotation.x = -0.08 + Math.sin(t * 0.004) * 0.03;
      m.ears[1].rotation.x = -0.08 + Math.sin(t * 0.0035 + 1) * 0.03;
      m.elbows[0].rotation.z = Math.sin(t * 0.002) * 0.12;
      m.elbows[1].rotation.z = Math.sin(t * 0.002 + 1.6) * 0.12;

      if (t > nb) {
        bl(0.12);
        if (t > nb + 130) {
          bl(1);
          nb = t + 2500 + Math.random() * 2500;
        }
      }
      r.render(s, cam);
    }

    if (rm) {
      r.render(s, cam);
    } else {
      animId = requestAnimationFrame(f);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', size);
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
      r.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="man"
      role="img"
      aria-label="Renard en 3D, en veste, les deux mains levées"
    />
  );
}
