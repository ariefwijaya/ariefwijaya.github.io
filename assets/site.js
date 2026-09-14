/* Progressive enhancement only. All content, links and disclosures work without JS. */
(() => {
  const copyButton = document.querySelector('[data-copy-email]');
  const status = document.querySelector('[data-copy-status]');
  if (copyButton && status && navigator.clipboard?.writeText) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      copyButton.disabled = true;
      try {
        await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
        status.textContent = 'Email address copied.';
      } catch {
        status.textContent = 'Could not copy automatically. Select the email address above to copy it.';
      } finally {
        copyButton.disabled = false;
      }
    });
  }

  // An indication, never a prerequisite for reading or navigating the page.
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.main-nav a[href^="#"]')];
    const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (!visible.length) return;
      const id = visible[0].target.id;
      links.forEach(link => {
        if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -55% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();

// The sheets are real HTML: selecting a chapter changes emphasis, not availability.
const chapterButtons = [...document.querySelectorAll('[data-chapter]')];
chapterButtons.forEach(button => button.addEventListener('click', () => {
  chapterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const sheets=[...document.querySelectorAll('[data-sheet]')];
  const ordered=[...sheets.filter(sheet=>sheet.dataset.sheet!==button.dataset.chapter),sheets.find(sheet=>sheet.dataset.sheet===button.dataset.chapter)];
  ordered.forEach((sheet,index)=>{sheet.classList.toggle('is-front',index===2);sheet.style.zIndex=String(index+1);sheet.style.transform=`translate(${index===1?-8:0}px,calc(var(--chapter-step) * ${index})) rotate(${index===1?-3:2}deg)`;});
}));
const demoButton = document.querySelector('[data-extract]');
demoButton?.addEventListener('click', () => {
  const active = !document.querySelector('.demo-section').classList.contains('demo-active');
  document.querySelector('.demo-section').classList.toggle('demo-active', active);
  document.querySelector('[data-output="invoice"]').textContent = active ? 'SAMPLE-001' : '—';
  document.querySelector('[data-output="total"]').textContent = active ? '120.00' : '—';
  document.querySelector('[data-demo-explanation]').textContent = active ? 'Invoice ID and total are mapped to named fields. This is a scripted example, not a live OCR model.' : 'See how fields from a document map into structured output.';
  demoButton.firstChild.textContent = active ? 'Reset the example ' : 'Explore the example ';
});

// A restrained entrance and pointer response at the doorway, without a second
// WebGL context or a render loop on the recruiter-facing page.
(() => {
 const invite=document.querySelector('.world-invite'),door=invite?.querySelector('img');
 if(!invite||!door)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let entrance;
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;
   if(!reduced.matches)entrance=door.animate([{opacity:.4,transform:'translateY(24px) rotate(-3deg)'},{opacity:1,transform:'translateY(0) rotate(0)'}],{duration:900,easing:'cubic-bezier(.2,.75,.25,1)'});
   observer.disconnect();
  },{threshold:.25});observer.observe(invite);
 }
 invite.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType!=='mouse')return;const r=invite.getBoundingClientRect();const x=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1)),y=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));door.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*3}deg) translateY(-4px)`;});
 const reset=()=>{door.style.transform='';};invite.addEventListener('pointerleave',reset);reduced.addEventListener('change',()=>{entrance?.cancel();reset();});
})();

// Small, interruptible interactions. Content stays readable without animation.
(() => {
  if (!Element.prototype.animate) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  const disclosures = new Map();
  const ease = 'cubic-bezier(.22,.75,.25,1)';
  function animate(element, frames, options) {
    const animation = element.animate(frames, options);
    active.add(animation);
    animation.finished.catch(() => {}).finally(() => active.delete(animation));
    return animation;
  }

  // Each section arrives once; no permanent opacity/visibility class is applied.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (reduced.matches) continue;
        animate(entry.target, [
          { opacity: .45, transform: 'translateY(14px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 480, easing: ease });
      }
    }, { threshold: .12 });
    document.querySelectorAll('.section-title, .impact-grid > *, .supporting-work article, .list-heading').forEach(item => observer.observe(item));
  }
  if (!reduced.matches) {
    document.querySelectorAll('.hero h1, .hero .role, .hero .intro, .hero .actions').forEach((element, index) => {
      // Avoid replaying the hero when opening a deep link halfway down the page.
      if (element.getBoundingClientRect().bottom < 0) return;
      animate(element, [{ opacity: .55, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 580, delay: index * 65, easing: ease, fill: 'backwards' });
    });
  }

  document.querySelectorAll('details.project, details.job').forEach(details => {
    const summary = details.querySelector('summary');
    if (!summary) return;
    summary.addEventListener('click', event => {
      if (reduced.matches || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
      event.preventDefault();
      const previous = disclosures.get(details);
      const opening = !(previous ? previous.opening : details.open);
      const from = details.getBoundingClientRect().height;
      previous?.animation.cancel();
      details.style.overflow = 'hidden';
      details.open = opening;
      const to = details.getBoundingClientRect().height;
      // Keep contents rendered during collapse; native semantics restored at end.
      details.open = true;
      const animation = animate(details, [{ height: `${from}px` }, { height: `${to}px` }],
        { duration: Math.min(380, 200 + Math.abs(to - from) * .25), easing: ease, fill: 'both' });
      const state = { animation, opening };
      disclosures.set(details, state);
      animation.onfinish = () => {
        if (disclosures.get(details) !== state) return;
        details.open = opening;
        animation.cancel();
        details.style.overflow = '';
        disclosures.delete(details);
      };
    });
  });

  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    for (const [details, state] of disclosures) {
      details.open = state.opening;
      details.style.overflow = '';
    }
    disclosures.clear();
    active.forEach(animation => animation.cancel());
  });
})();

// The final composition is also the destination's real loading screen.
(() => {
  const link = document.querySelector('.world-invite a[href="/world/"]');
  const door = document.querySelector('.world-invite img');
  if (!link || !door || !Element.prototype.animate) return;
  let overlay, animation, navigating = false;
  const clear = () => { animation?.cancel(); overlay?.remove(); overlay = null; navigating = false; door.style.visibility = ''; link.removeAttribute('aria-busy'); };
  window.addEventListener('pageshow', clear);
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && overlay) { clear(); link.focus(); } });
  link.addEventListener('click', async event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault(); if (navigating) return; navigating = true;
    link.setAttribute('aria-busy', 'true');
    const rect = door.getBoundingClientRect();
    overlay = document.createElement('div'); overlay.className = 'doorway-handoff'; overlay.setAttribute('role', 'status');
    const art = document.createElement('img'); art.src = door.currentSrc || door.src; art.alt = '';
    const text = document.createElement('p'); text.textContent = 'Entering My World…';
    const gate=document.createElement('div');gate.className='portal-gate';gate.setAttribute('aria-hidden','true');gate.innerHTML='<span class="portal-leaf"></span><span class="portal-leaf"></span>';
    overlay.append(art,gate,text); document.body.append(overlay);
    gate.animate([{opacity:0},{opacity:0,offset:.35},{opacity:1}],{duration:500,fill:'forwards'});
    requestAnimationFrame(()=>requestAnimationFrame(()=>gate.classList.add('is-open'))); door.style.visibility = 'hidden';
    const targetWidth = Math.min(innerWidth * .76, 420);
    overlay.animate([{backgroundColor:'#f8f7f100'},{backgroundColor:'#f8f7f1'}],{duration:280,fill:'forwards'});
    animation = art.animate([
      {left:`${rect.left + rect.width/2}px`,top:`${rect.top + rect.height/2}px`,transform:`translate(-50%,-50%) scale(${rect.width/targetWidth})`},
      {left:'50%',top:'50%',transform:'translate(-50%,-50%) scale(1)',offset:.45},
      {left:'50%',top:'50%',transform:'translate(-50%,-50%) scale(2.4)'},
    ],{duration:1150,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
    gate.animate([{transform:'translate(-50%,-50%) scale(.6)'},{transform:'translate(-50%,-50%) scale(1)',offset:.45},{transform:'translate(-50%,-50%) scale(2.4)'}],{duration:1150,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
    try { await animation.finished; if(navigating) location.assign('/world/?entrance=door'); } catch { /* Escape cancels navigation. */ }
  });
})();
