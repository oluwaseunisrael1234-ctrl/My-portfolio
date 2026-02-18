(function initTheme() {
  const isDark = localStorage.getItem('theme') === 'dark';
  const themeBtn = document.getElementById('themeToggle');
  if (!themeBtn) return;

  const applyTheme = (dark) => {
    if (dark) {
      document.body.classList.add('dark');
      themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      document.body.classList.remove('dark');
      themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  applyTheme(isDark);

  themeBtn.addEventListener('click', () => {
    const currentlyDark = document.body.classList.contains('dark');
    applyTheme(!currentlyDark);
  });
})();

// ---------- PARTICLES (global background) ----------
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  let ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w; canvas.height = h;

  const particles = Array(50).fill().map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.1,
    radius: Math.random() * 2.5 + 1
  }));

  function draw() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, w, h);
    const isDark = document.body.classList.contains('dark');
    ctx.fillStyle = isDark ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.1)';
    
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  });
})();
