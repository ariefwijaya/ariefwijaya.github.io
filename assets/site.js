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
