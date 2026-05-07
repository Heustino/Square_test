// Custom cursor
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
});
setInterval(() => {
  tx += (mx - tx) * 0.12; ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px'; trail.style.top = ty + 'px';
}, 16);

// Stars canvas
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
function initStars() {
  canvas.width = window.innerWidth; canvas.height = window.innerHeight; stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 + 0.3, speed: Math.random() * 0.3 + 0.05, opacity: Math.random(), pulse: Math.random() * Math.PI * 2 });
  }
}
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.pulse += 0.02; s.opacity = 0.3 + Math.sin(s.pulse) * 0.4;
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,240,255,${s.opacity})`; ctx.fill();
    s.y -= s.speed; if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
  });
  requestAnimationFrame(drawStars);
}
initStars(); drawStars();
window.addEventListener('resize', initStars);

// Counter animation
function animateCounter(el, target, suffix, duration = 2000) {
  let start = 0, step = target / 60;
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + (suffix || '');
    if (start >= target) clearInterval(timer);
  }, duration / 60);
}
const countersStarted = {};
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !countersStarted.done) {
      countersStarted.done = true;
      animateCounter(document.getElementById('c1'), 9, '+');
      animateCounter(document.getElementById('c2'), 150, '+');
      animateCounter(document.getElementById('c3'), 1000, '+');
      animateCounter(document.getElementById('c4'), 100, '%');
    }
  });
});
io.observe(document.querySelector('.stats-bar'));

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));