/* ══════════════════════════════════════════════════════════════
   ENDING CINEMATIC — C3 vs C4  (v2 — animaciones mejoradas)
   Incluir ANTES de game.js:
   <script src="ending-cinematic.js"></script>
══════════════════════════════════════════════════════════════ */

(function injectEndingCSS() {
    const style = document.createElement('style');
    style.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

/* ══ OVERLAY ══ */
#ending-cinematic {
    position: fixed;
    inset: 0;
    z-index: 9500;
    display: none;
    background: #000;
    font-family: 'Press Start 2P', monospace;
    overflow: hidden;
}
#ending-cinematic.visible { display: block; }

/* ══ SCANLINES ══ */
#ending-cinematic::after {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
        0deg, transparent, transparent 3px,
        rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px
    );
    pointer-events: none;
    z-index: 100;
}

/* ══ STAGES ══ */
.ec-stage {
    position: absolute;
    inset: 0;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.ec-stage.active { display: flex; }

/* ══ FLASH DE TRANSICIÓN ══ */
#ec-flash {
    position: fixed;
    inset: 0;
    background: #fff;
    z-index: 9900;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.08s;
}
#ec-flash.on { opacity: 1; }

/* ══ STAGE 1 — INTRO TITLE ══ */
#ec-s1 { background: #000; gap: 20px; }
.ec-intro-eyebrow {
    font-family: 'VT323', monospace;
    font-size: 18px;
    color: #4adc20;
    letter-spacing: 6px;
    opacity: 0;
    animation: ecFadeIn 0.5s steps(3) 0.3s both;
}
.ec-intro-title {
    font-size: clamp(14px, 3vw, 22px);
    color: #f0e040;
    text-align: center;
    line-height: 1.8;
    text-shadow: 4px 4px 0 #8a6000;
    opacity: 0;
    animation: ecFadeIn 0.5s steps(3) 0.8s both;
}
.ec-intro-sub {
    font-family: 'VT323', monospace;
    font-size: 20px;
    color: rgba(74,220,32,0.7);
    letter-spacing: 3px;
    opacity: 0;
    animation: ecFadeIn 0.5s steps(3) 1.4s both;
}
.ec-s1-countdown {
    position: absolute;
    bottom: 30px;
    font-family: 'VT323', monospace;
    font-size: 15px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 2px;
}
@keyframes ecFadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
@keyframes ecBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }

/* ══ STAGE 2 — SPLIT SCREEN C3 vs C4 ══ */
#ec-s2 {
    flex-direction: row;
    align-items: stretch;
    gap: 0;
    background: #000;
}

/* Barra de progreso de la batalla */
#ec-battle-bar {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 5px;
    background: #111;
    z-index: 60;
}
#ec-battle-bar-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #ff4400, #f0e040, #4adc20);
    transition: width 0.2s linear;
}

/* Lados */
.ec-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 0 0 30px;
    position: relative;
    overflow: hidden;
}
.ec-side-c3 {
    background: linear-gradient(180deg, #3a1a00 0%, #1a0800 60%, #0a0400 100%);
    border-right: 4px solid #ff4400;
}
.ec-side-c4 {
    background: linear-gradient(180deg, #0a2a00 0%, #062000 60%, #021000 100%);
    border-left: 4px solid #4adc20;
}

/* Sky */
.ec-sky-c3 {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #ff6600 0%, #cc3300 40%, #3a1a00 100%);
    opacity: 0.6;
    animation: ecHeatPulse 1.2s ease-in-out infinite alternate;
}
@keyframes ecHeatPulse {
    from { opacity: 0.45; filter: brightness(0.85); }
    to   { opacity: 0.8;  filter: brightness(1.2); }
}
.ec-sky-c4 {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #004400 0%, #002200 40%, #021000 100%);
    opacity: 0.7;
    animation: ecSkyGrow 9s linear both;
}
@keyframes ecSkyGrow {
    0%   { opacity: 0.4; }
    100% { opacity: 0.85; }
}

/* Sol */
.ec-sun {
    position: absolute;
    top: 20px;
    width: 60px; height: 60px;
    border-radius: 50%;
    left: 50%; transform: translateX(-50%);
}
.ec-side-c3 .ec-sun {
    background: #fff200;
    box-shadow: 0 0 0 8px rgba(255,180,0,0.4), 0 0 0 20px rgba(255,100,0,0.2), 0 0 0 36px rgba(255,60,0,0.1);
    animation: ecSunBurn 0.6s steps(2) infinite;
}
@keyframes ecSunBurn {
    from { box-shadow: 0 0 0 8px rgba(255,180,0,0.4), 0 0 0 20px rgba(255,100,0,0.2); }
    to   { box-shadow: 0 0 0 14px rgba(255,200,0,0.5), 0 0 0 30px rgba(255,80,0,0.3); }
}
.ec-side-c4 .ec-sun {
    background: #ffee88;
    opacity: 0.55;
    box-shadow: 0 0 0 6px rgba(255,220,100,0.2);
}

/* Rayos de sol C3 */
.ec-sunrays {
    position: absolute;
    top: 0; left: 50%;
    width: 100%; height: 160px;
    transform: translateX(-50%);
    background: repeating-conic-gradient(
        from 0deg at 50% 0%,
        rgba(255,120,0,0.08) 0deg 8deg,
        transparent 8deg 18deg
    );
    animation: ecRaysRotate 4s linear infinite;
    z-index: 2;
}
@keyframes ecRaysRotate { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(360deg); } }

/* Ondas de calor C3 */
.ec-heat {
    position: absolute;
    bottom: 80px; left: 0; right: 0;
    height: 120px;
    background: repeating-linear-gradient(
        0deg,
        transparent, transparent 6px,
        rgba(255,100,0,0.07) 6px, rgba(255,100,0,0.07) 7px
    );
    animation: ecHeatWave 0.35s steps(3) infinite;
    z-index: 3;
}
@keyframes ecHeatWave {
    0%   { transform: skewX(0deg)  scaleY(1);    opacity: 0.6; }
    33%  { transform: skewX(1.5deg) scaleY(1.03); opacity: 0.9; }
    66%  { transform: skewX(-1deg) scaleY(0.97); opacity: 0.7; }
    100% { transform: skewX(0deg)  scaleY(1);    opacity: 0.6; }
}

/* Partículas de fuego C3 */
.ec-ember {
    position: absolute;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: #ff6600;
    animation: ecEmberRise linear infinite;
    z-index: 4;
}
@keyframes ecEmberRise {
    0%   { transform: translateY(0) translateX(0)   scale(1);   opacity: 1; }
    60%  { opacity: 0.8; }
    100% { transform: translateY(-140px) translateX(var(--edx, 12px)) scale(0.3); opacity: 0; }
}

/* Partículas verdes C4 */
.ec-particle {
    position: absolute;
    border-radius: 2px;
    background: #4adc20;
    animation: ecParticleFloat linear infinite;
    z-index: 8;
}
@keyframes ecParticleFloat {
    0%   { transform: translateY(0) translateX(0) rotate(0deg);   opacity: 1; }
    100% { transform: translateY(-130px) translateX(var(--dx,12px)) rotate(180deg); opacity: 0; }
}

/* Plantas */
.ec-plant {
    position: relative;
    z-index: 10;
    width: 120px;
    image-rendering: pixelated;
}
.ec-plant-c3 {
    animation: ecWilt 0.9s ease-in-out infinite alternate;
    transform-origin: bottom center;
}
@keyframes ecWilt {
    0%   { transform: rotate(-2deg) scaleY(0.97); filter: sepia(0.5) saturate(0.4) brightness(0.9); }
    50%  { transform: rotate(-6deg) scaleY(0.91); filter: sepia(0.8) saturate(0.25) brightness(0.75); }
    100% { transform: rotate(-10deg) scaleY(0.85); filter: sepia(1) saturate(0.15) brightness(0.65); }
}
.ec-plant-c4 {
    animation: ecGrow 1.4s ease-in-out infinite alternate;
    transform-origin: bottom center;
    filter: drop-shadow(0 0 12px rgba(74,220,32,0.45));
}
@keyframes ecGrow {
    from { transform: rotate(0deg)  scaleY(1);    filter: drop-shadow(0 0 8px rgba(74,220,32,0.3)) brightness(1); }
    to   { transform: rotate(1.5deg) scaleY(1.05); filter: drop-shadow(0 0 20px rgba(74,220,32,0.7)) brightness(1.1); }
}

/* Personajes flotantes */
.ec-chars {
    position: absolute;
    bottom: 150px; left: 0; right: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    z-index: 15;
}
.ec-char-img {
    width: 55px; height: 55px;
    object-fit: contain;
    image-rendering: pixelated;
}
/* Bounce independiente para cada personaje — ritmos distintos */
.ec-char-img:nth-child(1) { animation: ecBounce1 0.85s ease-in-out infinite alternate; }
.ec-char-img:nth-child(2) { animation: ecBounce2 1.1s  ease-in-out infinite alternate; }
.ec-char-img:nth-child(3) { animation: ecBounce3 0.7s  ease-in-out infinite alternate; }
@keyframes ecBounce1 {
    0%   { transform: translateY(0)    scale(1); }
    40%  { transform: translateY(-10px) scale(1.05) rotate(-2deg); }
    100% { transform: translateY(-14px) scale(1.08) rotate(1deg); }
}
@keyframes ecBounce2 {
    0%   { transform: translateY(0)    scale(1); }
    60%  { transform: translateY(-8px)  scale(1.04) rotate(2deg); }
    100% { transform: translateY(-12px) scale(1.07) rotate(-1deg); }
}
@keyframes ecBounce3 {
    0%   { transform: translateY(0)    scale(1); }
    50%  { transform: translateY(-11px) scale(1.06) rotate(1.5deg); }
    100% { transform: translateY(-7px)  scale(1.03) rotate(-2deg); }
}
.ec-char-img.sad { filter: grayscale(0.85) sepia(0.5); }
.ec-char-img.sad:nth-child(1) { animation: ecSad1 0.6s steps(2) infinite alternate; }
.ec-char-img.sad:nth-child(2) { animation: ecSad2 0.8s steps(2) infinite alternate; }
@keyframes ecSad1 {
    from { transform: translateY(0)  rotate(-5deg) scale(0.94); }
    to   { transform: translateY(6px) rotate(4deg)  scale(0.9); }
}
@keyframes ecSad2 {
    from { transform: translateY(2px) rotate(3deg)  scale(0.92); }
    to   { transform: translateY(7px) rotate(-5deg) scale(0.88); }
}

/* Etiquetas laterales */
.ec-side-label {
    position: absolute;
    top: 0; left: 0; right: 0;
    padding: 12px 8px;
    text-align: center;
    z-index: 20;
}
.ec-side-label-c3 { background: rgba(180,40,0,0.88); border-bottom: 3px solid #ff4400; }
.ec-side-label-c4 { background: rgba(10,80,0,0.88);  border-bottom: 3px solid #4adc20; }
.ec-label-title {
    font-size: clamp(7px, 1.5vw, 11px);
    color: #fff;
    display: block;
    line-height: 1.6;
}
.ec-label-sub {
    font-family: 'VT323', monospace;
    font-size: clamp(12px, 2vw, 16px);
    color: rgba(255,255,255,0.7);
    letter-spacing: 2px;
    display: block;
}

/* Status en tiempo real */
.ec-status {
    position: absolute;
    bottom: 30px; left: 8px; right: 8px;
    background: rgba(0,0,0,0.85);
    border: 3px solid currentColor;
    padding: 8px;
    z-index: 20;
}
.ec-status-c3 { color: #ff4400; }
.ec-status-c4 { color: #4adc20; }
.ec-status-row {
    font-family: 'VT323', monospace;
    font-size: clamp(11px, 1.8vw, 15px);
    display: flex;
    justify-content: space-between;
    line-height: 1.75;
}
.ec-status-bad  { color: #ff4400; }
.ec-status-good { color: #4adc20; }

/* Animación de aparición de filas de status */
.ec-status-row { opacity: 0; animation: ecFadeIn 0.3s steps(2) both; }
.ec-status-row:nth-child(1) { animation-delay: 0.5s; }
.ec-status-row:nth-child(2) { animation-delay: 1.2s; }
.ec-status-row:nth-child(3) { animation-delay: 2.2s; }
.ec-status-row:nth-child(4) { animation-delay: 3.5s; }

/* VS central */
.ec-vs {
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
    background: #000;
    border: 4px solid #f0e040;
    outline: 3px solid #000;
    padding: 8px 12px;
    font-size: clamp(14px, 3vw, 22px);
    color: #f0e040;
    text-shadow: 3px 3px 0 #8a6000;
    white-space: nowrap;
    animation: ecVsPulse 0.55s steps(2) infinite;
}
@keyframes ecVsPulse {
    from { transform: translate(-50%,-50%) scale(1);    border-color: #f0e040; }
    to   { transform: translate(-50%,-50%) scale(1.1);  border-color: #fff700; }
}

/* Narrador central de batalla */
#ec-narrator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 80;
    pointer-events: none;
    text-align: center;
    width: 70%;
    max-width: 400px;
}
#ec-narrator-text {
    display: inline-block;
    font-family: 'VT323', monospace;
    font-size: clamp(20px, 3.5vw, 30px);
    color: #fff;
    text-shadow: 0 0 12px rgba(255,220,80,0.9), 2px 2px 0 #000, -1px -1px 0 #000;
    letter-spacing: 2px;
    line-height: 1.4;
    padding: 10px 18px;
    background: rgba(0,0,0,0.55);
    border: 2px solid rgba(255,220,80,0.4);
    opacity: 0;
    transition: opacity 0.45s ease;
    white-space: nowrap;
}
#ec-narrator-text.visible  { opacity: 1; }
#ec-narrator-text.fading   { opacity: 0; }

/* ══ STAGE 3 — COMPARACIÓN ══ */
#ec-s3 {
    background: #050f02;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
}
.ec-msg-title {
    font-size: clamp(10px, 2vw, 16px);
    color: #f0e040;
    text-align: center;
    text-shadow: 3px 3px 0 #8a6000;
    margin-bottom: 4px;
    opacity: 0;
    animation: ecFadeIn 0.4s steps(3) 0.2s both;
}
.ec-cards-row {
    display: flex;
    gap: 16px;
    width: 100%;
    max-width: 900px;
    opacity: 0;
    animation: ecFadeIn 0.4s steps(3) 0.6s both;
}
.ec-card {
    flex: 1;
    border: 3px solid currentColor;
    outline: 2px solid #000;
    background: #020802;
    padding: 14px 16px;
    position: relative;
}
.ec-card-c3 { color: #ff4400; }
.ec-card-c4 { color: #4adc20; }
.ec-card-header {
    font-size: clamp(8px, 1.5vw, 11px);
    color: inherit;
    border-bottom: 2px solid currentColor;
    padding-bottom: 8px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.ec-card-icon { font-size: 20px; }
.ec-card-body {
    font-family: 'VT323', monospace;
    font-size: clamp(13px, 2vw, 17px);
    line-height: 1.7;
    color: rgba(255,255,255,0.8);
}
.ec-card-body li { list-style: none; padding: 2px 0; }
.ec-card-body li::before { content: '▸ '; color: inherit; }
.ec-card-result {
    margin-top: 10px;
    padding: 6px 10px;
    background: rgba(0,0,0,0.5);
    border-left: 4px solid currentColor;
    font-family: 'VT323', monospace;
    font-size: clamp(14px, 2vw, 18px);
    color: inherit;
    font-weight: bold;
}

/* ══ STAGE 4 — MENSAJE ECOLÓGICO ══ */
#ec-s4 {
    background: #000;
    flex-direction: column;
    gap: 24px;
    padding: 30px 20px;
    text-align: center;
}
.ec-eco-badge {
    font-size: 64px;
    animation: ecCharFloat 1s ease-in-out infinite alternate;
    filter: drop-shadow(0 0 20px rgba(74,220,32,0.8));
}
.ec-eco-title {
    font-size: clamp(11px, 2.2vw, 17px);
    color: #4adc20;
    text-shadow: 3px 3px 0 #1a5a08;
    line-height: 1.8;
    opacity: 0;
    animation: ecFadeIn 0.5s steps(3) 0.4s both;
}
.ec-eco-quote {
    font-family: 'VT323', monospace;
    font-size: clamp(16px, 2.5vw, 22px);
    color: rgba(255,255,255,0.75);
    max-width: 680px;
    line-height: 1.7;
    border: 2px dashed rgba(74,220,32,0.3);
    outline: 2px solid #000;
    padding: 16px 20px;
    background: rgba(74,220,32,0.05);
    opacity: 0;
    animation: ecFadeIn 0.5s steps(3) 0.9s both;
}
.ec-chars-parade {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0;
    animation: ecFadeIn 0.5s steps(3) 1.4s both;
}
.ec-parade-char {
    width: 64px; height: 64px;
    object-fit: contain;
    image-rendering: pixelated;
    filter: drop-shadow(0 0 10px rgba(74,220,32,0.5));
    animation: ecCharFloat 1s ease-in-out infinite alternate;
}
.ec-parade-char:nth-child(2) { animation-delay: 0.2s; }
.ec-parade-char:nth-child(3) { animation-delay: 0.4s; }
.ec-parade-char:nth-child(4) { animation-delay: 0.6s; }
.ec-parade-char:nth-child(5) { animation-delay: 0.8s; }

/* ══ BOTÓN CONTINUAR ══ */
.ec-continue-btn {
    font-family: 'Press Start 2P', monospace;
    font-size: clamp(9px, 1.8vw, 13px);
    background: #1a6008;
    color: #c8ff80;
    border: 4px solid #4adc20;
    outline: 3px solid #000;
    padding: 12px 28px;
    cursor: pointer;
    letter-spacing: 2px;
    box-shadow: 4px 4px 0 #000;
    margin-top: 8px;
    opacity: 0;
    animation: ecFadeIn 0.4s steps(3) 1.8s both, ecBtnPulse 1s steps(2) infinite 2.2s;
    position: relative;
    z-index: 200;
}
@keyframes ecBtnPulse {
    from { background: #1a6008; }
    to   { background: #2a8a10; }
}
.ec-continue-btn::after { content: ' ▶'; animation: ecBlink 0.7s steps(1) infinite; }
.ec-continue-btn:hover  { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #000; }
.ec-continue-btn:active { transform: translate(4px,4px);  box-shadow: 0 0 0 #000; }

/* ══ MOBILE ══ */
@media (max-width: 600px) {
    .ec-cards-row { flex-direction: column; gap: 10px; }
    .ec-side { padding-bottom: 16px; }
    .ec-plant { width: 70px; }
    .ec-char-img { width: 36px; height: 36px; }
    .ec-parade-char { width: 44px; height: 44px; }
    .ec-eco-badge { font-size: 42px; }
    #ec-s2 { flex-direction: column; }
    .ec-side-c3 { border-right: none; border-bottom: 4px solid #ff4400; }
    .ec-side-c4 { border-left:  none; border-top:    4px solid #4adc20; }
}
    `;
    document.head.appendChild(style);
})();

/* ══════════════════════════════════════════════════════════════
   SFX
══════════════════════════════════════════════════════════════ */
const EC_SFX = {
    _ctx: null,
    ctx() { if (!this._ctx) this._ctx = new (window.AudioContext || window.webkitAudioContext)(); return this._ctx; },
    tone(freq, type, start, dur, vol = 0.2) {
        try {
            const c = this.ctx(), o = c.createOscillator(), g = c.createGain();
            o.connect(g); g.connect(c.destination);
            o.type = type; o.frequency.value = freq;
            g.gain.setValueAtTime(vol, c.currentTime + start);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
            o.start(c.currentTime + start); o.stop(c.currentTime + start + dur);
        } catch(e) {}
    },
    dramatic() {
        [[110,0],[165,0.12],[220,0.25]].forEach(([f,t]) => this.tone(f,'sawtooth',t,0.5,0.15));
        setTimeout(() => this.tone(55,'square',0,0.7,0.22), 600);
    },
    battleTick(pct) {
        /* Tensión creciente conforme avanza la barra */
        const freq = 80 + pct * 1.2;
        this.tone(freq, 'square', 0, 0.06, 0.06);
    },
    battleEnd() {
        /* Resolución dramática */
        [[330,0],[440,0.1],[220,0.2],[330,0.35],[550,0.5],[440,0.65]].forEach(([f,t]) =>
            this.tone(f,'sawtooth',t,0.12,0.12));
    },
    victory() {
        [[523,0],[659,0.1],[784,0.2],[1047,0.35],[784,0.5],[1047,0.65],[1319,0.8]].forEach(([f,t]) =>
            this.tone(f,'square',t,0.15,0.2));
    },
    click() {
        this.tone(440,'square',0,0.06,0.18);
        this.tone(880,'square',0.07,0.1,0.12);
    }
};

/* ══════════════════════════════════════════════════════════════
   CINEMATIC ENGINE
══════════════════════════════════════════════════════════════ */
function showEndingCinematic(finalScore, onComplete) {

    /* Flash de transición */
    let flashEl = document.getElementById('ec-flash');
    if (!flashEl) {
        flashEl = document.createElement('div');
        flashEl.id = 'ec-flash';
        document.body.appendChild(flashEl);
    }
    function flashTransition(cb) {
        flashEl.classList.add('on');
        setTimeout(() => { flashEl.classList.remove('on'); if(cb) cb(); }, 120);
    }

    let overlay = document.getElementById('ending-cinematic');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'ending-cinematic';
        document.body.appendChild(overlay);
    }

    /* ── Partículas ── */
    function makeParticles(container, count, type) {
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            if (type === 'ember') {
                p.className = 'ec-ember';
                p.style.cssText = `
                    left:${5+Math.random()*90}%;
                    bottom:${60+Math.random()*60}px;
                    animation-duration:${0.8+Math.random()*1}s;
                    animation-delay:${Math.random()*2}s;
                    --edx:${(Math.random()-0.5)*28}px;
                    width:${3+Math.random()*4}px; height:${3+Math.random()*4}px;
                    background:${Math.random()>0.5?'#ff6600':'#ffcc00'};
                    opacity:${0.5+Math.random()*0.5};
                `;
            } else {
                p.className = 'ec-particle';
                p.style.cssText = `
                    left:${8+Math.random()*84}%;
                    bottom:${70+Math.random()*90}px;
                    animation-duration:${1.1+Math.random()*1.6}s;
                    animation-delay:${Math.random()*2.2}s;
                    --dx:${(Math.random()-0.5)*32}px;
                    width:${4+Math.random()*5}px; height:${4+Math.random()*5}px;
                    opacity:${0.4+Math.random()*0.6};
                    background:${Math.random()>0.4?'#4adc20':'#f0e040'};
                `;
            }
            container.appendChild(p);
        }
    }

    /* ── HTML ── */
    overlay.innerHTML = `

        <!-- STAGE 1: INTRO -->
        <div class="ec-stage active" id="ec-s1">
            <div class="ec-intro-eyebrow">▸ CINEMÁTICA FINAL ◂</div>
            <div class="ec-intro-title">LA BATALLA POR<br>LA SUPERVIVENCIA</div>
            <div class="ec-intro-sub">C3 VS C4 — EL VEREDICTO</div>
            <div class="ec-s1-countdown" id="ec-s1-cd">COMENZANDO EN <span id="ec-cd-num">3</span>...</div>
        </div>

        <!-- STAGE 2: SPLIT BATTLE -->
        <div class="ec-stage" id="ec-s2">

            <!-- C3 — muriendo -->
            <div class="ec-side ec-side-c3" id="ec-c3-side">
                <div class="ec-sky-c3"></div>
                <div class="ec-sunrays"></div>
                <div class="ec-sun"></div>
                <div class="ec-heat"></div>
                <div class="ec-side-label ec-side-label-c3">
                    <span class="ec-label-title">PLANTA C3</span>
                    <span class="ec-label-sub">TRIGO · ARROZ · SOJA</span>
                </div>
                <div class="ec-chars">
                    <img class="ec-char-img sad" src="fotonuv.png"  alt="" onerror="this.style.display='none'">
                    <img class="ec-char-img sad" src="co2.png"      alt="" onerror="this.style.display='none'">
                </div>
                <img class="ec-plant ec-plant-c3" src="fotonsol.png" alt="planta c3"
                     onerror="this.outerHTML='<div style=&quot;font-size:80px;position:relative;z-index:10&quot;>🌾</div>'">
                <div class="ec-status ec-status-c3">
                    <div class="ec-status-row"><span>ESTOMAS</span>   <span class="ec-status-bad">CERRADOS ✗</span></div>
                    <div class="ec-status-row"><span>O₂ INTERNO</span><span class="ec-status-bad">ALTO ✗</span></div>
                    <div class="ec-status-row"><span>FOTORRESP.</span> <span class="ec-status-bad">ACTIVA ✗</span></div>
                    <div class="ec-status-row"><span>GLUCOSA</span>    <span class="ec-status-bad">0 ✗</span></div>
                </div>
            </div>

            <!-- VS -->
            <div class="ec-vs">VS</div>

            <!-- Narrador central con fade -->
            <div id="ec-narrator">
                <span id="ec-narrator-text"></span>
            </div>

            <!-- C4 — ganando -->
            <div class="ec-side ec-side-c4" id="ec-c4-side">
                <div class="ec-sky-c4"></div>
                <div class="ec-sun"></div>
                <div class="ec-side-label ec-side-label-c4">
                    <span class="ec-label-title">PLANTA C4</span>
                    <span class="ec-label-sub">MAÍZ · CAÑA · SORGO</span>
                </div>
                <div class="ec-chars">
                    <img class="ec-char-img" src="fotonsol.png"     alt="" onerror="this.style.display='none'">
                    <img class="ec-char-img" src="electron.png"     alt="" onerror="this.style.display='none'">
                    <img class="ec-char-img" src="fotosistemaI.png" alt="" onerror="this.style.display='none'">
                </div>
                <img class="ec-plant ec-plant-c4" src="clorofila.png" alt="planta c4"
                     onerror="this.outerHTML='<div style=&quot;font-size:80px;position:relative;z-index:10&quot;>🌽</div>'">
                <div class="ec-status ec-status-c4">
                    <div class="ec-status-row"><span>BÓVEDA CO₂</span> <span class="ec-status-good">ACTIVA ✓</span></div>
                    <div class="ec-status-row"><span>RUBISCO</span>    <span class="ec-status-good">PROTEGIDA ✓</span></div>
                    <div class="ec-status-row"><span>FOTORRESP.</span> <span class="ec-status-good">BLOQUEADA ✓</span></div>
                    <div class="ec-status-row"><span>GLUCOSA</span>    <span class="ec-status-good">MAX ✓</span></div>
                </div>
            </div>

            <!-- Barra de progreso -->
            <div id="ec-battle-bar"><div id="ec-battle-bar-fill"></div></div>
        </div>

        <!-- STAGE 3: COMPARACIÓN -->
        <div class="ec-stage" id="ec-s3">
            <div class="ec-msg-title">¿QUÉ PASÓ EN EL CAMPO?</div>
            <div class="ec-cards-row">
                <div class="ec-card ec-card-c3">
                    <div class="ec-card-header"><span class="ec-card-icon">☠️</span><span>PLANTA C3 — FRACASO</span></div>
                    <ul class="ec-card-body">
                        <li>Sol fuerte → estomas cerrados</li>
                        <li>O₂ se acumula dentro</li>
                        <li>RuBisCO fija O₂ por error</li>
                        <li>Fotorrespiración activa</li>
                        <li>Gasta energía sin producir</li>
                    </ul>
                    <div class="ec-card-result">RESULTADO: MARCHITA 🌾</div>
                </div>
                <div class="ec-card ec-card-c4">
                    <div class="ec-card-header"><span class="ec-card-icon">🏆</span><span>PLANTA C4 — VICTORIA</span></div>
                    <ul class="ec-card-body">
                        <li>Sol fuerte → sin problema</li>
                        <li>Malato guarda CO₂ en la vaina</li>
                        <li>RuBisCO recibe CO₂ puro</li>
                        <li>Fotorrespiración = cero</li>
                        <li>Glucosa máxima con calor</li>
                    </ul>
                    <div class="ec-card-result">RESULTADO: COSECHA 🌽</div>
                </div>
            </div>
            <button class="ec-continue-btn" id="ec-btn-s3">SIGUIENTE</button>
        </div>

        <!-- STAGE 4: MENSAJE ECOLÓGICO -->
        <div class="ec-stage" id="ec-s4">
            <div class="ec-eco-badge">🌍</div>
            <div class="ec-eco-title">EL IMPACTO REAL</div>
            <div class="ec-eco-quote">
                "Gracias al sistema C4, plantas como el maíz pueden alimentar al mundo
                en lugares donde otras morirían de sed. Cada molécula que defendiste
                hoy es real — y vital para el planeta."
            </div>
            <div class="ec-chars-parade">
                <img class="ec-parade-char" src="fotonsol.png"     alt="" onerror="this.style.display='none'">
                <img class="ec-parade-char" src="clorofila.png"    alt="" onerror="this.style.display='none'">
                <img class="ec-parade-char" src="electron.png"     alt="" onerror="this.style.display='none'">
                <img class="ec-parade-char" src="fotosistemaI.png" alt="" onerror="this.style.display='none'">
                <img class="ec-parade-char" src="agua.png"         alt="" onerror="this.style.display='none'">
            </div>
            <button class="ec-continue-btn" id="ec-btn-s4">VER MI PUNTUACIÓN FINAL</button>
        </div>
    `;

    overlay.classList.add('visible');

    /* ── Partículas ── */
    setTimeout(() => {
        const c3 = document.getElementById('ec-c3-side');
        const c4 = document.getElementById('ec-c4-side');
        if (c3) makeParticles(c3, 14, 'ember');
        if (c4) makeParticles(c4, 16, 'particle');
    }, 60);

    /* ══════════════════════════════════════
       NAVEGACIÓN — sin skip con teclado
       Stage 1 auto-avanza con countdown
       Stage 2 dura exactamente 9s (batalla)
       Botones son el único control
    ══════════════════════════════════════ */
    let currentStage = 1;
    const stages = [null, 'ec-s1', 'ec-s2', 'ec-s3', 'ec-s4'];

    function goTo(n) {
        EC_SFX.click();
        flashTransition(() => {
            const prev = document.getElementById(stages[currentStage]);
            if (prev) prev.classList.remove('active');
            currentStage = n;
            const next = document.getElementById(stages[n]);
            if (next) next.classList.add('active');
            if (n === 2) startBattle();
            if (n === 4) EC_SFX.victory();
        });
    }

    /* ── Stage 1: countdown 3-2-1 automático (3s) ── */
    let cdVal = 3;
    const cdEl = document.getElementById('ec-cd-num');
    const cdInterval = setInterval(() => {
        cdVal--;
        if (cdEl) cdEl.textContent = cdVal;
        if (cdVal <= 0) {
            clearInterval(cdInterval);
            goTo(2);
        }
    }, 1000);

    /* ── Stage 2: Batalla — 9 segundos exactos ── */
    function startBattle() {
        EC_SFX.dramatic();
        const barFill = document.getElementById('ec-battle-bar-fill');
        const narratorEl = document.getElementById('ec-narrator-text');
        const DURATION = 9000;
        const start = Date.now();

        /* Fases narrativas */
        const phases = [
            { at: 0,    msg: '⚔  BATALLA COMIENZA' },
            { at: 1500, msg: '☀  CALOR EXTREMO...' },
            { at: 3000, msg: '🌿  C4 ACTIVA BÓVEDA' },
            { at: 5000, msg: '☠  C3 PIERDE AGUA...' },
            { at: 6500, msg: '🏆  C4 SIGUE FUERTE' },
            { at: 8000, msg: '✔  RESULTADO FINAL' },
        ];
        let phaseIdx = 0;

        /* Muestra una frase con fade-in, la mantiene y luego hace fade-out antes de la siguiente */
        function showPhrase(msg, holdMs) {
            if (!narratorEl) return;
            narratorEl.textContent = msg;
            narratorEl.classList.remove('fading');
            narratorEl.classList.add('visible');
            setTimeout(() => {
                narratorEl.classList.add('fading');
                setTimeout(() => narratorEl.classList.remove('visible'), 450);
            }, holdMs - 450);
        }

        /* Programar cada fase con su ventana de tiempo */
        for (let i = 0; i < phases.length; i++) {
            const hold = (i < phases.length - 1)
                ? phases[i + 1].at - phases[i].at - 100
                : DURATION - phases[i].at - 300;
            const delay = phases[i].at;
            setTimeout(() => showPhrase(phases[i].msg, Math.max(hold, 600)), delay);
        }

        /* SFX ticks de tensión + barra de progreso */
        let sfxCount = 0;
        const tickInterval = setInterval(() => {
            const elapsed = Date.now() - start;
            const pct = Math.min(100, (elapsed / DURATION) * 100);
            if (barFill) barFill.style.width = pct + '%';
            sfxCount++;
            if (sfxCount % 2 === 0) EC_SFX.battleTick(pct);
            if (elapsed >= DURATION) {
                clearInterval(tickInterval);
                if (barFill) barFill.style.width = '100%';
                EC_SFX.battleEnd();
                setTimeout(() => goTo(3), 600);
            }
        }, 350);
    }

    /* ── Stage 3 → 4 con botón ── */
    setTimeout(() => {
        const btn3 = document.getElementById('ec-btn-s3');
        if (btn3) btn3.addEventListener('click', (e) => {
            e.stopPropagation();
            goTo(4);
        });
    }, 200);

    /* ── Stage 4 → fin con botón ── */
    setTimeout(() => {
        const btn4 = document.getElementById('ec-btn-s4');
        if (btn4) btn4.addEventListener('click', (e) => {
            e.stopPropagation();
            EC_SFX.click();
            flashTransition(() => {
                overlay.classList.remove('visible');
                setTimeout(onComplete, 120);
            });
        });
    }, 200);
}

window.showEndingCinematic = showEndingCinematic;