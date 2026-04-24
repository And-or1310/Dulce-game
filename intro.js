'use strict';

/* ══════════════════════════════════════
   GUARDIA DE LA HOJA — INTRO CONTROLLER
   intro.js  — Secuencia de ~30 segundos
══════════════════════════════════════ */

/* ─── Timing plan (seconds)
   Scene 0: 0–8s   Exterior: sol → fotón → hoja
   Scene 1: 8–14s  Zoom células del mesófilo → cloroplastos
   Scene 2: 14–21s Interior cloroplasto: tilacoides, grana, fotosistemas
   Scene 3: 21–27s Close-up fotosistema: fotón impacta, electrón excitado
   Scene 4: 27–33s Tarjeta CTA → botón → redirige a index.html
─── */

const TOTAL_DURATION = 33; // segundos

let masterTimeline;
let progressInterval;
let currentScene = 0;
let startTime;

/* ══════════════════════════════════════
   GOTO GAME
══════════════════════════════════════ */
window.goToGame = function() {
  clearInterval(progressInterval);
  if (masterTimeline) masterTimeline.kill();

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;background:#000;
    z-index:9999;opacity:0;transition:opacity 0.5s;
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => { overlay.style.opacity = '1'; });
  setTimeout(() => { window.location.href = 'game.html'; }, 550);
};

window.skipIntro = function() {
  goToGame();
};

/* ══════════════════════════════════════
   KEYBOARD SKIP
══════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'Escape' || e.key === 'Enter') {
    skipIntro();
  }
});

/* ══════════════════════════════════════
   SCENE TRANSITIONS
══════════════════════════════════════ */
function switchToScene(index) {
  const scenes = document.querySelectorAll('.scene');
  scenes.forEach((s, i) => {
    s.style.transition = 'opacity 1s ease';
    if (i === index) {
      s.style.opacity = '1';
      s.style.pointerEvents = 'all';
      s.classList.add('active');
    } else {
      s.style.opacity = '0';
      s.style.pointerEvents = 'none';
      s.classList.remove('active');
    }
  });
  currentScene = index;
}

function showCaption(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('visible');
}
function hideCaption(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('visible');
}

/* ══════════════════════════════════════
   PROGRESS BAR
══════════════════════════════════════ */
function startProgressBar() {
  startTime = Date.now();
  progressInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const pct = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = pct + '%';
    if (elapsed >= TOTAL_DURATION) clearInterval(progressInterval);
  }, 100);
}

/* ══════════════════════════════════════
   PARTICLES — scene 4
══════════════════════════════════════ */
function spawnParticles() {
  const container = document.getElementById('particles-final');
  if (!container) return;
  const colors = ['#3AD028', '#5AB030', '#E8A030', '#FFE840', '#82B05A'];
  for (let i = 0; i < 24; i++) {
    const d = document.createElement('div');
    const sz = 4 + Math.random() * 8;
    const duration = 6 + Math.random() * 10;
    const delay = Math.random() * 5;
    d.className = 'particle-dot';
    d.style.cssText = `
      width:${sz}px;height:${sz}px;
      left:${Math.random() * 100}%;
      bottom:${Math.random() * 20}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${duration}s;
      animation-delay:${delay}s;
      opacity:0;
    `;
    container.appendChild(d);
  }
}

/* ══════════════════════════════════════
   GSAP ANIMATION TIMELINE
══════════════════════════════════════ */
function buildTimeline() {
  const tl = gsap.timeline({ onComplete: () => { /* auto-complete handled at scene 4 */ } });
  masterTimeline = tl;

  /* ─── SCENE 0: 0–8s Exterior ─── */
  tl.call(() => {
    switchToScene(0);
  }, null, 0);

  tl.call(() => {
    showCaption('cap-0');
  }, null, 0.8);

  // Leaf enters from bottom
  tl.from('#corn-leaf', {
    y: 120, opacity: 0, duration: 1.8, ease: 'power2.out'
  }, 0.3);

  // Sun brightens
  tl.from('.sun-core', {
    scale: 0, opacity: 0, duration: 1.2, ease: 'back.out(2)'
  }, 0.5);

  tl.call(() => hideCaption('cap-0'), null, 7.5);

  /* ─── SCENE 1: 8–14s Células ─── */
  tl.call(() => {
    switchToScene(1);
    showCaption('cap-1');
  }, null, 8);

  // Cell walls appear
  tl.from('#cells-group ellipse', {
    scale: 0, opacity: 0,
    transformOrigin: 'center center',
    duration: 1.2, ease: 'back.out(1.4)',
    stagger: 0.1
  }, 8.3);

  // Chloroplasts fade in with delay
  tl.to('#chloroplasts-group', {
    opacity: 1, duration: 1.2, ease: 'power2.out'
  }, 11);

  tl.call(() => hideCaption('cap-1'), null, 13.8);

  /* ─── SCENE 2: 14–21s Tilacoides ─── */
  tl.call(() => {
    switchToScene(2);
    showCaption('cap-2');
  }, null, 14);

  // Grana stack in from below
  tl.from('#granum-1', {
    y: 80, opacity: 0, duration: 1.0, ease: 'back.out(1.3)'
  }, 14.4);
  tl.from('#granum-2', {
    y: 80, opacity: 0, duration: 1.0, ease: 'back.out(1.3)'
  }, 14.7);
  tl.from('#granum-3', {
    y: 80, opacity: 0, duration: 1.0, ease: 'back.out(1.3)'
  }, 15.0);

  // Photon travels through thylakoids (SVG circle)
  tl.to('#photon-in, #photon-in-glow', {
    attr: { cx: 400 },
    duration: 2.5, ease: 'power1.inOut'
  }, 16.5);

  // Products appear
  tl.to('#products-label', {
    opacity: 1, duration: 0.8, ease: 'power2.out'
  }, 19.5);

  // Electron flow
  tl.to('#electron-flow', {
    opacity: 1, duration: 0.5
  }, 20);

  tl.call(() => hideCaption('cap-2'), null, 21);

  /* ─── SCENE 3: 21–27s Fotosistema close-up ─── */
  tl.call(() => {
    switchToScene(3);
    showCaption('cap-3');
  }, null, 21);

  // PSII complex appears
  tl.from('#psii-complex', {
    scale: 0.4, opacity: 0, y: 30,
    duration: 1.2, ease: 'back.out(1.5)',
    transformOrigin: '50% 50%'
  }, 21.4);

  // Photon travels from left to PSII
  tl.to('#ph-main, #ph-glow1, #ph-glow2, #ph-text', {
    attr: { cx: 280, x: 280 },
    duration: 1.8, ease: 'power2.inOut'
  }, 22.5);

  // Impact flash on PSII
  tl.to('#psii-complex', {
    filter: 'brightness(2.5)', duration: 0.12, ease: 'power4.out',
    yoyo: true, repeat: 1
  }, 24.3);

  // Photon disappears (absorbed)
  tl.to('#photon-arrive', {
    opacity: 0, duration: 0.2
  }, 24.35);

  // OEC (water splitting) appears
  tl.to('#oec', {
    opacity: 1, duration: 0.7, ease: 'power2.out'
  }, 24.6);

  // Excited electron shoots out
  tl.to('#excited-electron', {
    opacity: 1, duration: 0.4
  }, 24.8);
  tl.to('#excited-electron', {
    attr: { transform: 'translate(120, -60)' },
    duration: 1.2, ease: 'power2.out'
  }, 25);

  // Energy label
  tl.to('#energy-label', {
    opacity: 1, duration: 0.6, ease: 'power2.out'
  }, 25.5);

  tl.call(() => hideCaption('cap-3'), null, 26.8);

  /* ─── SCENE 4: 27–33s CTA ─── */
  tl.call(() => {
    switchToScene(4);
    spawnParticles();
  }, null, 27);

  // Notebook card entrance
  tl.from('.notebook-card', {
    y: 50, opacity: 0, scale: 0.88,
    duration: 0.9, ease: 'back.out(1.6)'
  }, 27.3);

  // Auto-redirect after scene 4 shown for ~5s
  tl.call(() => {
    const hint = document.querySelector('.nb-hint');
    if (hint) {
      let countdown = 5;
      hint.textContent = `Redirigiendo en ${countdown}s…`;
      const iv = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
          clearInterval(iv);
          goToGame();
        } else {
          hint.textContent = `Redirigiendo en ${countdown}s…`;
        }
      }, 1000);
    }
  }, null, 28);

  return tl;
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
window.addEventListener('load', () => {

  // Ensure all scenes start hidden except 0
  document.querySelectorAll('.scene').forEach((s, i) => {
    s.style.opacity = i === 0 ? '1' : '0';
    s.style.pointerEvents = i === 0 ? 'all' : 'none';
  });

  startProgressBar();
  buildTimeline();
});