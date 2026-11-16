// NOCLIPPED service worker — offline play
const CACHE='noclipped-0b5d056913';
const FILES=['./', 'index.html', 'three.min.js', 'manifest.webmanifest', 'fonts/vt323.woff2', 'fonts/anton.woff2', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png', 'assets/guns/ak.glb', 'assets/guns/gren.glb', 'assets/guns/gren2.glb', 'assets/guns/gustaf.glb', 'assets/guns/ks23.glb', 'assets/guns/m16.glb', 'assets/guns/m1911.glb', 'assets/guns/m21.glb', 'assets/guns/rpg.glb', 'assets/guns/spas.glb', 'assets/guns/svd.glb', 'assets/guns/tt.glb', 'assets/guns/uzi.glb', 'assets/guns/vz61.glb', 'assets/mon/angler_abyss.glb', 'assets/mon/brute_barnacle.glb', 'assets/mon/crab_rust.glb', 'assets/mon/diver_brass.glb', 'assets/mon/drowned_deckhand.glb', 'assets/mon/drowned_oilskin.glb', 'assets/mon/eel_moray.glb', 'assets/mon/elk.glb', 'assets/mon/gutter_apron.glb', 'assets/mon/gutter_oilcloth.glb', 'assets/mon/hag_kelp.glb', 'assets/mon/isopod_pale.glb', 'assets/mon/jelly_glass.glb', 'assets/mon/keeper_salt.glb', 'assets/mon/lurker_rot.glb', 'assets/mon/mutant_infested.glb', 'lib/GLTFLoader.js', 'lib/SkeletonUtils.js'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url); if(url.origin!==location.origin) return;
  // the game page: network first so new versions arrive, cache when offline
  if(e.request.mode==='navigate'){ e.respondWith(fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(CACHE).then(c=>c.put('index.html',cp)); return r; }).catch(()=>caches.match('index.html'))); return; }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
