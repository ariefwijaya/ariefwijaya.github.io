/* Progressive enhancement: real image links remain the no-JavaScript fallback. */
(() => {
  const dialog = document.querySelector('#project-viewer');
  const links = [...document.querySelectorAll('[data-gallery-image]')];
  if (!dialog || !links.length || typeof dialog.showModal !== 'function') return;

  const canvas = dialog.querySelector('.viewer-canvas');
  const caption = dialog.querySelector('#viewer-caption');
  const counter = dialog.querySelector('[data-viewer-counter]');
  const original = dialog.querySelector('[data-viewer-original]');
  const zoom = dialog.querySelector('[data-viewer-action="zoom"]');
  let index = 0, trigger, image, previousOverflow;

  function fit() {
    canvas.classList.remove('is-zoomed');
    canvas.scrollTo(0, 0);
    zoom.setAttribute('aria-pressed', 'false');
    zoom.textContent = 'Actual size';
  }

  function show(next) {
    index = (next + links.length) % links.length;
    const link = links[index];
    fit();
    zoom.disabled = true;
    caption.textContent = link.dataset.caption;
    counter.textContent = `${index + 1} / ${links.length}`;
    original.href = link.href;
    canvas.setAttribute('aria-busy', 'true');
    image = new Image();
    const current = image;
    image.alt = link.querySelector('img').alt;
    image.onload = () => {
      if (image !== current) return;
      canvas.setAttribute('aria-busy', 'false');
      zoom.disabled = false;
    };
    image.onerror = () => {
      if (image !== current) return;
      canvas.setAttribute('aria-busy', 'false');
      caption.textContent = 'This image could not load. Use Open original to try it directly.';
    };
    image.src = link.href;
    canvas.replaceChildren(image);
  }

  links.forEach((link, i) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-controls', dialog.id);
    link.setAttribute('aria-label', `Enlarge ${link.querySelector('img').alt}`);
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      try { dialog.showModal(); } catch { return; }
      event.preventDefault();
      trigger = link;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      show(i);
      dialog.querySelector('[data-viewer-action="close"]').focus();
    });
  });

  function cleanup() {
    if (!trigger) return;
    image = null;
    canvas.replaceChildren();
    canvas.removeAttribute('aria-busy');
    fit();
    document.body.style.overflow = previousOverflow;
    const previousTrigger = trigger;
    trigger = null;
    if (previousTrigger.isConnected) previousTrigger.focus({preventScroll: true});
  }

  function close() {
    dialog.close();
    cleanup();
  }

  dialog.querySelector('[data-viewer-action="close"]').addEventListener('click', close);
  dialog.querySelector('[data-viewer-action="previous"]').addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-viewer-action="next"]').addEventListener('click', () => show(index + 1));
  zoom.addEventListener('click', () => {
    if (zoom.getAttribute('aria-pressed') === 'true') { fit(); return; }
    canvas.classList.add('is-zoomed');
    zoom.setAttribute('aria-pressed', 'true');
    zoom.textContent = 'Fit image';
    canvas.focus();
  });
  dialog.addEventListener('keydown', event => {
    if (zoom.getAttribute('aria-pressed') === 'true') return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) close();
  });
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener('close', () => {
    // Native close events are queued; an earlier event must not clear a reopened viewer.
    if (!dialog.open) cleanup();
  });
})();
