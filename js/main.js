(()=>{
const S=window.SITE,P=document.body.dataset.page,$=s=>document.querySelector(s);
const NAV=[["Home","index.html","home"],["About","about.html","about"],["Subjects","subjects.html","subjects"],["Resources","resources.html","resources"],["Contact","contact.html","contact"]];
const logo=`<img class="lg" data-fb="logo" src="assets/logo/logo.png" alt="Musthaq's Science" width="140" height="40">`;
const ph=t=>`<span class="ph">${t}</span>`;
const ext=(u,t,p)=>u?`<a href="${u}" target="_blank" rel="noopener">${t}</a>`:ph(p);
const tel="tel:+"+S.telIntl.replace(/\D/g,""),L=S.links, wa=L.whatsapp?(L.whatsapp.startsWith('http')?L.whatsapp:'https://wa.me/'+L.whatsapp.replace(/\D/g,'')):"", em=L.email?'mailto:'+L.email:"";
$('#site-header').innerHTML=`<div class="wrap nav"><a class="logo" href="index.html" aria-label="Musthaq's Science home">${logo}</a>
<button class="menu" aria-label="Open menu" aria-expanded="false" aria-controls="links">☰</button>
<nav class="links" id="links" aria-label="Main">${NAV.map(n=>`<a class="l${n[2]===P?' on':''}" href="${n[1]}"${n[2]===P?' aria-current="page"':''}>${n[0]}</a>`).join('')}<a class="btn lo" href="login.html">LOGIN</a><a class="btn p" href="subjects.html">Start Learning</a></nav></div>`;
$('#site-footer').innerHTML=`<div class="wrap"><div class="fg"><div><a class="logo" href="index.html">${logo}</a><p class="ta" lang="ta" style="color:var(--tx);max-width:30ch;margin:.6rem 0 .3rem">${S.tagline}</p><p style="color:var(--cy);letter-spacing:.18em;font-size:.85rem;margin:0">${S.places}</p></div>
<div><h4>Explore</h4>${NAV.map(n=>`<a href="${n[1]}">${n[0]}</a>`).join('')}</div>
<div><h4>Connect</h4>${ext(L.facebook,'Facebook','')}${ext(wa,'WhatsApp','')}${ext(em,'Email','')}<a href="${tel}">${S.tel}</a><a href="login.html">Login</a></div></div>
<small style="color:var(--mut)">© 2026 Musthaq's Science. All rights reserved.</small></div>`;
const fb=i=>{if(i.dataset.fb==='logo')i.outerHTML=`<b class="tl">MUSTHAQ'S<br><span>SCIENCE</span></b>`;else if(i.dataset.ph)i.outerHTML=`<div class="ph-box" role="img" aria-label="${i.dataset.ph} placeholder">[ ${i.dataset.ph} ]</div>`};
document.addEventListener('error',e=>e.target.tagName==='IMG'&&fb(e.target),true);
document.querySelectorAll('img').forEach(i=>i.complete&&!i.naturalWidth&&fb(i));
const h=$('#site-header');addEventListener('scroll',()=>h.classList.toggle('s',scrollY>20),{passive:true});
const mb=$('.menu'),lk=$('#links');mb.onclick=()=>{const o=lk.classList.toggle('open');mb.setAttribute('aria-expanded',o);mb.textContent=o?'✕':'☰'};
const im=(src,alt)=>`<img loading="lazy" data-ph="${alt.toUpperCase()}" src="${src}" alt="${alt}">`;
if($('#subj'))$('#subj').innerHTML=window.SUBJECTS.map(s=>`<article class="card rv"><div class="simg">${im(s.img,s.name+' image')}</div><div class="ico" aria-hidden="true">${s.icon}</div><h3>${s.name}</h3><p>${s.desc}</p><ul class="tp">${s.topics.map(t=>`<li>${t}</li>`).join('')}</ul><a class="btn" href="resources.html">Explore ${s.name}</a></article>`).join('');
if($('#res'))$('#res').innerHTML=window.RESOURCES.map(r=>{const b=t=>r.file?`<a class="btn" href="${r.file}" target="_blank" rel="noopener"${t==='Download'?' download':''}>${t}</a>`:`<span class="btn" aria-disabled="true">Coming Soon</span>`;
 return `<article class="card rv"><div class="simg">${im(r.thumb,'Resource thumbnail')}</div><span class="tag">${r.cat}</span><h3>${r.title}</h3><p>${r.desc}</p><div class="row">${r.file?b('View')+b('Download'):b()}</div></article>`}).join('');
const f=$('#cf');if(f)f.onsubmit=async e=>{e.preventDefault();const n=$('#fn');
 if(!f.n.value.trim()||!f.m.value.trim()||!/\S+@\S+\.\S+/.test(f.e.value)){n.textContent='Enter your name, a valid email and a message.';return}
 if(!S.supabase.url){n.textContent='Messages are not connected yet. Add Supabase details in data/site.js.';return}
 try{const {createClient}=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  const {error}=await createClient(S.supabase.url,S.supabase.key).from('messages').insert({name:f.n.value,email:f.e.value,message:f.m.value});
  n.textContent=error?'Could not send. Please try again.':'Message sent. Thank you!';if(!error)f.reset()}catch{n.textContent='Could not send. Please try again.'}};
if($('#cc'))$('#cc').innerHTML=`<p class="ta" lang="ta" style="color:var(--tx);font-size:1.2rem;margin:0 0 .3rem">${S.tagline}</p><p style="color:var(--cy);letter-spacing:.2em;margin:0 0 1.2rem">${S.places}</p><address style="font-style:normal;color:var(--mut);margin-bottom:1rem">${S.address.join('<br>')}</address><p>Phone: <a href="${tel}">${S.tel}</a><br>Email: <a href="${em}">${L.email}</a><br>Facebook: <a href="${L.facebook}" target="_blank" rel="noopener">Musthaq's Science</a></p><div class="row"><a class="btn p" href="${tel}">Call Now</a><a class="btn" href="${em}">Email</a><a class="btn" href="${L.facebook}" target="_blank" rel="noopener">Facebook</a><a class="btn" href="${wa}" target="_blank" rel="noopener">WhatsApp</a></div>`;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
})();
