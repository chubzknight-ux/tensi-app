const N='tensi-v1',A=['./','index.html','manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(N).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==N).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
const put=(r,x)=>{const y=x.clone();caches.open(N).then(c=>c.put(r,y)).catch(()=>{});return x};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
const u=new URL(r.url),cdn=/jsdelivr\.net|googleapis\.com/.test(u.host);
if(u.origin!==location.origin&&!cdn)return;
e.respondWith(cdn
?caches.match(r).then(m=>m||fetch(r).then(x=>put(r,x)))
:fetch(r).then(x=>put(r,x)).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});
