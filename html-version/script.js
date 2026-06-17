/* =========================================================
   Armory — vanilla animation engine (no dependencies)
   - Scroll reveals with stagger (IntersectionObserver)
   - Number count-ups (requestAnimationFrame)
   - Animated progress bars
   - Hero panel parallax on scroll
   - FAQ accordion
   - Sticky nav shadow + mobile menu
   ========================================================= */

const EASE = t => 1 - Math.pow(1 - t, 3); // easeOutCubic, mirrors the Framer feel

/* ---------- 1. Scroll reveal + stagger ---------- */
const revealEls = document.querySelectorAll('[data-reveal]');
revealEls.forEach(el => {
  const d = parseInt(el.dataset.delay || '0', 10);
  el.style.setProperty('--rd', d * 0.09 + 's');
});

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ---------- 2. Count-up numbers ---------- */
function countUp(el) {
  const to = parseFloat(el.dataset.to);
  const dec = parseInt(el.dataset.dec || '0', 10);
  const dur = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = (to * EASE(p)).toFixed(dec);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = to.toFixed(dec);
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { countUp(entry.target); obs.unobserve(entry.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count').forEach(el => countObserver.observe(el));

/* ---------- 3. Progress bars ---------- */
const barObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const i = entry.target;
      requestAnimationFrame(() => { i.style.width = i.dataset.bar + '%'; });
      obs.unobserve(i);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('[data-bar]').forEach(i => { i.style.width = '0%'; barObserver.observe(i); });

/* ---------- 4. Hero panel parallax ---------- */
const heroPanel = document.getElementById('heroPanel');
let ticking = false;
function parallax() {
  if (heroPanel) {
    const y = window.scrollY;
    const offset = Math.min(y * 0.12, 120);
    const scale = Math.max(1 - y * 0.00018, 0.9);
    heroPanel.style.transform = `translateY(${offset}px) scale(${scale})`;
  }
  ticking = false;
}

/* ---------- 5. FAQ accordion ---------- */
document.querySelectorAll('.faq__item').forEach(item => {
  item.querySelector('.faq__q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ---------- 6. Sticky nav shadow ---------- */
const nav = document.getElementById('nav');
const navInner = nav?.querySelector('.nav__inner');

/* ---------- combined scroll handler ---------- */
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(parallax); ticking = true; }
  if (navInner) navInner.style.boxShadow = window.scrollY > 20 ? '0 12px 40px -16px rgba(0,0,0,.7)' : 'none';
}, { passive: true });

/* ---------- 7. Mobile menu ---------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);
