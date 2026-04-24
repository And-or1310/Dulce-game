/* ══════════════════════════════════════════════════════════════
   ROUND SUMMARY — Guardia de la Hoja C4
   Pixel Art Videogame Style
   <script src="round-summary.js"></script> (ANTES de game.js)
══════════════════════════════════════════════════════════════ */

(function injectSummaryCSS() {
    const style = document.createElement('style');
    style.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&display=swap');

/* ══ PIXEL ART HELPERS ══ */
.px-border {
    image-rendering: pixelated;
    box-shadow:
        -4px 0 0 0 #000,
         4px 0 0 0 #000,
         0 -4px 0 0 #000,
         0  4px 0 0 #000,
        -4px -4px 0 0 #000,
         4px -4px 0 0 #000,
        -4px  4px 0 0 #000,
         4px  4px 0 0 #000;
}

/* ══ OVERLAY ══ */
#round-summary-overlay {
    position: fixed;
    inset: 0;
    z-index: 9000;
    display: none;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.88);
    font-family: 'Press Start 2P', monospace;
}
#round-summary-overlay.visible {
    display: flex;
}

/* ══ SCANLINES EFFECT ══ */
#round-summary-overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0,0,0,0.15) 2px,
        rgba(0,0,0,0.15) 4px
    );
    pointer-events: none;
    z-index: 1;
}

/* ══ STAGE — pantalla fija sin scroll ══ */
.rs-stage {
    position: relative;
    width: min(900px, 96vw);
    height: min(580px, 94vh);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    animation: rsAppear 0.3s steps(4) both;
}
@keyframes rsAppear {
    from { transform: scale(0.85); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
}

/* ══ PERSONAJES LATERALES ══ */
.rs-char {
    position: absolute;
    bottom: 0;
    width: 180px;
    height: 220px;
    object-fit: contain;
    image-rendering: pixelated;
    filter: drop-shadow(0 0 18px rgba(74,220,32,0.5));
    z-index: 10;
    animation: rsCharBob 1.2s ease-in-out infinite alternate;
}
@keyframes rsCharBob {
    from { transform: translateY(0px); }
    to   { transform: translateY(-10px); }
}
.rs-char-left  {
    left: -60px;
    animation-delay: 0s;
    filter: drop-shadow(0 0 18px rgba(74,220,32,0.5)) scaleX(-1);
    transform-origin: center bottom;
}
.rs-char-right {
    right: -60px;
    animation-delay: 0.6s;
}
.rs-char-left.flip  { transform: scaleX(-1); }

/* ══ CARD PRINCIPAL ══ */
.rs-card {
    position: relative;
    width: 580px;
    max-width: 92vw;
    background: #0a1a06;
    border: 4px solid #4adc20;
    outline: 4px solid #000;
    z-index: 5;
    overflow: hidden;
    /* Pixel border effect */
    box-shadow:
        0 0 0 4px #000,
        0 0 0 8px #1a5a08,
        0 0 0 12px #000,
        0 0 60px rgba(74,220,32,0.3),
        inset 0 0 40px rgba(0,0,0,0.7);
}

/* Corner decorations pixel */
.rs-card::before, .rs-card::after {
    content: '';
    position: absolute;
    width: 16px; height: 16px;
    background: #4adc20;
    z-index: 20;
}
.rs-card::before { top: -4px; left: -4px; clip-path: polygon(0 0,100% 0,0 100%); }
.rs-card::after  { bottom: -4px; right: -4px; clip-path: polygon(100% 0,100% 100%,0 100%); }

/* ══ BANNER ══ */
.rs-banner {
    background: linear-gradient(180deg, #1a5a08 0%, #0d3004 100%);
    border-bottom: 4px solid #4adc20;
    text-align: center;
    padding: 18px 20px 14px;
    position: relative;
    overflow: hidden;
}
/* Pixel stripe bg */
.rs-banner::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        90deg,
        rgba(74,220,32,0.03) 0px, rgba(74,220,32,0.03) 8px,
        transparent 8px, transparent 16px
    );
}
.rs-eyebrow {
    font-family: 'VT323', monospace;
    font-size: 14px;
    color: #80ee50;
    letter-spacing: 3px;
    margin-bottom: 6px;
}
.rs-title {
    font-family: 'Press Start 2P', monospace;
    font-size: clamp(13px, 2.5vw, 18px);
    color: #f0e040;
    text-shadow:
        3px 3px 0 #8a6000,
        0 0 20px rgba(240,224,64,0.7);
    line-height: 1.3;
    margin: 0 0 8px;
    animation: rsTitleFlash 1.5s steps(2) infinite;
}
@keyframes rsTitleFlash {
    0%,100% { text-shadow: 3px 3px 0 #8a6000, 0 0 20px rgba(240,224,64,0.7); }
    50%     { text-shadow: 3px 3px 0 #8a6000, 0 0 35px rgba(240,224,64,1); }
}
.rs-sub {
    font-family: 'VT323', monospace;
    font-size: 16px;
    color: #80ee50;
    letter-spacing: 2px;
}

/* ══ STARS ══ */
.rs-stars {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 10px;
}
.rs-star {
    font-size: 22px;
    opacity: 0;
    animation: rsStar 0.15s steps(2) both;
    filter: drop-shadow(0 0 6px gold);
}
.rs-star:nth-child(1) { animation-delay: 0.4s; }
.rs-star:nth-child(2) { animation-delay: 0.65s; }
.rs-star:nth-child(3) { animation-delay: 0.9s; }
@keyframes rsStar {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
}

/* ══ BODY ══ */
.rs-body {
    padding: 14px 18px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

/* ══ SECTION LABEL ══ */
.rs-label {
    font-family: 'VT323', monospace;
    font-size: 13px;
    color: #4adc20;
    letter-spacing: 3px;
    border-bottom: 2px solid #1a5a08;
    padding-bottom: 4px;
    margin-bottom: 8px;
}

/* ══ TESOROS ══ */
.rs-treasures {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
}
.rs-tcard {
    background: #091503;
    border: 3px solid #2a6a10;
    outline: 2px solid #000;
    padding: 10px 12px 8px;
    text-align: center;
    flex: 1;
    min-width: 100px;
    max-width: 160px;
    position: relative;
    animation: rsCardIn 0.2s steps(3) both;
}
.rs-tcard:nth-child(1) { animation-delay: 0.2s; }
.rs-tcard:nth-child(2) { animation-delay: 0.35s; }
.rs-tcard:nth-child(3) { animation-delay: 0.5s; }
@keyframes rsCardIn {
    from { transform: translateY(16px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
}
.rs-tcard-badge {
    position: absolute;
    top: -2px; right: -2px;
    background: #4adc20;
    color: #000;
    font-family: 'VT323', monospace;
    font-size: 9px;
    padding: 1px 5px;
    letter-spacing: 1px;
}
.rs-tcard-icon {
    font-size: 32px;
    display: block;
    margin-bottom: 5px;
    filter: drop-shadow(0 0 8px currentColor);
    image-rendering: pixelated;
}
.rs-tcard-name {
    font-family: 'Press Start 2P', monospace;
    font-size: 9px;
    color: #f0e040;
    margin-bottom: 4px;
    line-height: 1.4;
}
.rs-tcard-desc {
    font-family: 'VT323', monospace;
    font-size: 12px;
    color: #5acc30;
    line-height: 1.3;
}

/* ══ STATS ══ */
.rs-stats {
    display: flex;
    gap: 6px;
}
.rs-stat {
    flex: 1;
    background: #050f02;
    border: 3px solid #1a4a08;
    outline: 2px solid #000;
    text-align: center;
    padding: 8px 4px;
    animation: rsCardIn 0.2s steps(3) both;
}
.rs-stat:nth-child(1) { animation-delay: 0.3s; }
.rs-stat:nth-child(2) { animation-delay: 0.45s; }
.rs-stat:nth-child(3) { animation-delay: 0.6s; }
.rs-stat-val {
    font-family: 'Press Start 2P', monospace;
    font-size: 16px;
    color: #f0e040;
    display: block;
    line-height: 1;
    text-shadow: 2px 2px 0 #8a6000;
}
.rs-stat-lbl {
    font-family: 'VT323', monospace;
    font-size: 11px;
    color: #4adc20;
    letter-spacing: 1px;
    display: block;
    margin-top: 4px;
}

/* ══ NEXT ZONE ══ */
.rs-next {
    background: #050f02;
    border: 3px solid #3a8a18;
    outline: 2px solid #000;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: rsCardIn 0.2s steps(3) 0.7s both;
}
.rs-next-icon {
    font-size: 28px;
    flex-shrink: 0;
    animation: rsPulse 0.8s steps(2) infinite;
}
@keyframes rsPulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.1); }
}
.rs-next-lbl {
    font-family: 'VT323', monospace;
    font-size: 11px;
    color: rgba(240,224,64,0.5);
    letter-spacing: 2px;
}
.rs-next-title {
    font-family: 'Press Start 2P', monospace;
    font-size: 9px;
    color: #f0e040;
    margin: 3px 0 2px;
    line-height: 1.4;
}
.rs-next-desc {
    font-family: 'VT323', monospace;
    font-size: 13px;
    color: #5acc30;
}
.rs-next-arrow {
    margin-left: auto;
    font-family: 'Press Start 2P', monospace;
    font-size: 16px;
    color: #4adc20;
    flex-shrink: 0;
    animation: rsArrow 0.6s steps(2) infinite;
}
@keyframes rsArrow {
    0%,100% { transform: translateX(0); }
    50%      { transform: translateX(5px); }
}

/* ══ BUTTON ══ */
.rs-cta {
    padding: 14px 18px 16px;
    display: flex;
    justify-content: center;
}
.rs-btn {
    font-family: 'Press Start 2P', monospace;
    font-size: 13px;
    background: #1a6008;
    color: #c8ff80;
    border: 4px solid #4adc20;
    outline: 3px solid #000;
    padding: 12px 32px;
    cursor: pointer;
    letter-spacing: 2px;
    position: relative;
    text-transform: uppercase;
    box-shadow: 4px 4px 0 #000, 0 0 20px rgba(74,220,32,0.3);
    transition: none;
    image-rendering: pixelated;
    animation: rsBtnPulse 1s steps(2) infinite 1.2s;
}
@keyframes rsBtnPulse {
    0%,100% { background: #1a6008; box-shadow: 4px 4px 0 #000, 0 0 20px rgba(74,220,32,0.3); }
    50%      { background: #2a8010; box-shadow: 4px 4px 0 #000, 0 0 30px rgba(74,220,32,0.6); }
}
.rs-btn:hover {
    background: #2a8010;
    transform: translate(-2px,-2px);
    box-shadow: 6px 6px 0 #000, 0 0 30px rgba(74,220,32,0.5);
}
.rs-btn:active {
    transform: translate(4px,4px);
    box-shadow: 0 0 0 #000;
}
/* Blinking cursor decoration */
.rs-btn::after {
    content: '▶';
    margin-left: 10px;
    animation: rsBlink 0.7s steps(1) infinite;
}
@keyframes rsBlink {
    0%,49% { opacity: 1; }
    50%,100% { opacity: 0; }
}

/* ══ PIXEL CORNER ORNAMENTS ══ */
.rs-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    background: #4adc20;
    z-index: 20;
}
.rs-corner.tl { top: 0; left: 0; }
.rs-corner.tr { top: 0; right: 0; }
.rs-corner.bl { bottom: 0; left: 0; }
.rs-corner.br { bottom: 0; right: 0; }

/* ══ COINS DECORATION ══ */
.rs-coin {
    position: absolute;
    font-size: 20px;
    animation: rsCoinFloat linear infinite;
    pointer-events: none;
    z-index: 3;
    filter: drop-shadow(0 0 6px gold);
}
@keyframes rsCoinFloat {
    0%   { transform: translateY(0)   rotate(0deg);   opacity: 1; }
    100% { transform: translateY(-80px) rotate(360deg); opacity: 0; }
}

/* ══ HEALTH BAR STYLE PROGRESS ══ */
.rs-xpbar-wrap {
    height: 14px;
    background: #050f02;
    border: 3px solid #1a5a08;
    outline: 2px solid #000;
    margin-top: 6px;
    overflow: hidden;
}
.rs-xpbar {
    height: 100%;
    background: repeating-linear-gradient(
        90deg,
        #4adc20 0px, #4adc20 8px,
        #2a9010 8px, #2a9010 16px
    );
    transition: width 1s steps(20);
    box-shadow: 0 0 8px rgba(74,220,32,0.6);
}

/* ══ MOBILE ══ */
@media (max-width: 640px) {
    .rs-char { width: 100px; height: 130px; }
    .rs-char-left  { left: -20px; }
    .rs-char-right { right: -20px; }
    .rs-card { width: 98vw; }
    .rs-title { font-size: 11px; }
    .rs-btn { font-size: 10px; padding: 10px 20px; }
    .rs-stat-val { font-size: 13px; }
    .rs-tcard { min-width: 80px; }
    .rs-tcard-name { font-size: 7px; }
}
    `;
    document.head.appendChild(style);
})();

/* ══════════════════════════════════════════════════════════════
   DATOS DE CADA RONDA
══════════════════════════════════════════════════════════════ */
const ROUND_SUMMARIES = [
    {
        eyebrow: "▸ ZONA 1 COMPLETADA ◂",
        title: "¡NIVEL\nCOMPLETADO!",
        sub: "ENERGÍA CAPTURADA · ENLACES CREADOS",
        tesoros: [
            { icon: "⚡", iconColor: "#f0e040", name: "ATP",   desc: "Energía lista para el Calvin", badge: "ENERGÍA" },
            { icon: "🔵", iconColor: "#40a0f0", name: "NADPH", desc: "Poder reductor para glucosa",  badge: "REDUCTOR" },
            { icon: "💨", iconColor: "#80d0ff", name: "O₂",    desc: "Regalo a la atmósfera",        badge: "OUTPUT" }
        ],
        chars: [
            { src: "fotonsol.png",     side: "left",  delay: "0s" },
            { src: "fotosistemaI.png", side: "right", delay: "0.3s" }
        ],
        next: {
            icon: "🌿",
            lugar: "MESÓFILO C4",
            titulo: "Célula del Mesófilo",
            desc: "PEP-carboxilasa te espera para atrapar CO₂"
        }
    },
    {
        eyebrow: "▸ ZONA 2 COMPLETADA ◂",
        title: "¡CARBONO\nCAPTURADO!",
        sub: "EL C4 CONCENTRA · LA VAINA ESPERA",
        tesoros: [
            { icon: "🧪", iconColor: "#c040f0", name: "OAA",    desc: "Oxalacetato — 4 carbonos",         badge: "C4" },
            { icon: "🚚", iconColor: "#f09020", name: "MALATO", desc: "Transporta carbono a la Vaina",    badge: "MOVER" }
        ],
        chars: [
            { src: "clorofila.png", side: "left",  delay: "0s" },
            { src: "co2.png",       side: "right", delay: "0.3s" }
        ],
        next: {
            icon: "🏰",
            lugar: "VAINA FASCICULAR",
            titulo: "Célula de la Vaina",
            desc: "Rubisco recibe CO₂ concentrado y puro"
        }
    },
    {
        eyebrow: "▸ ZONA 3 COMPLETADA ◂",
        title: "¡GLUCOSA\nEN CAMINO!",
        sub: "CALVIN HIZO SU MAGIA",
        tesoros: [
            { icon: "💎", iconColor: "#40d0a0", name: "G3P",    desc: "Esqueleto del azúcar",  badge: "CALVIN" },
            { icon: "🍬", iconColor: "#f04080", name: "GLUCOSA", desc: "Combustible final",     badge: "WIN" }
        ],
        chars: [
            { src: "electron.png",      side: "left",  delay: "0s" },
            { src: "fotosistemaII.png", side: "right", delay: "0.3s" }
        ],
        next: {
            icon: "🌽",
            lugar: "CAMPO EXTERIOR",
            titulo: "Ecosistema del Maíz",
            desc: "Última ronda — protege la planta"
        }
    }
];

/* ══════════════════════════════════════════════════════════════
   MOSTRAR PANTALLA
══════════════════════════════════════════════════════════════ */
function showRoundSummary(roundIndex, currentScore, roundStartScore, roundCorrect, roundTotal, onContinue) {
    const data = ROUND_SUMMARIES[roundIndex];
    if (!data) { onContinue(); return; }

    const roundScore = currentScore - roundStartScore;
    const accuracy   = roundTotal > 0 ? Math.round((roundCorrect / roundTotal) * 100) : 100;
    const stars      = accuracy >= 80 ? 3 : accuracy >= 50 ? 2 : 1;

    /* ── overlay ── */
    let overlay = document.getElementById('round-summary-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'round-summary-overlay';
        document.body.appendChild(overlay);
    }

    /* ── estrellas ── */
    const starHTML = [0,1,2].map(i =>
        `<span class="rs-star">${i < stars ? '⭐' : '☆'}</span>`
    ).join('');

    /* ── tesoros ── */
    const tesHTML = data.tesoros.map(t => `
        <div class="rs-tcard">
            <div class="rs-tcard-badge">${t.badge}</div>
            <span class="rs-tcard-icon" style="color:${t.iconColor}">${t.icon}</span>
            <div class="rs-tcard-name">${t.name}</div>
            <div class="rs-tcard-desc">${t.desc}</div>
        </div>
    `).join('');

    /* ── xp bar width ── */
    const xpPct = Math.min(100, Math.max(0, accuracy));

    /* ── personajes ── */
    const charsHTML = (data.chars || []).map(c => `
        <img
            class="rs-char rs-char-${c.side}"
            src="${c.src}"
            alt=""
            style="animation-delay:${c.delay}"
            onerror="this.style.display='none'"
        />
    `).join('');

    /* ── next zone ── */
    const n = data.next;
    const nextHTML = `
        <div class="rs-next">
            <span class="rs-next-icon">${n.icon}</span>
            <div>
                <div class="rs-next-lbl">PRÓXIMO NIVEL · ${n.lugar}</div>
                <div class="rs-next-title">${n.titulo}</div>
                <div class="rs-next-desc">${n.desc}</div>
            </div>
            <div class="rs-next-arrow">&gt;&gt;</div>
        </div>
    `;

    /* ── titulo con saltos ── */
    const titleLines = data.title.split('\n').join('<br>');

    overlay.innerHTML = `
        <div class="rs-stage">

            ${charsHTML}

            <!-- MONEDAS DECORATIVAS -->
            <div class="rs-coin" style="left:30%;top:10%;animation-duration:2.1s;animation-delay:0.2s">💰</div>
            <div class="rs-coin" style="left:60%;top:5%;animation-duration:1.8s;animation-delay:0.8s">⭐</div>
            <div class="rs-coin" style="left:75%;top:15%;animation-duration:2.4s;animation-delay:0.4s">💰</div>
            <div class="rs-coin" style="left:20%;top:8%;animation-duration:2s;animation-delay:1s">⭐</div>

            <div class="rs-card">
                <!-- CORNER ORNAMENTS -->
                <div class="rs-corner tl"></div>
                <div class="rs-corner tr"></div>
                <div class="rs-corner bl"></div>
                <div class="rs-corner br"></div>

                <!-- BANNER -->
                <div class="rs-banner">
                    <div class="rs-eyebrow">${data.eyebrow}</div>
                    <div class="rs-title">${titleLines}</div>
                    <div class="rs-sub">${data.sub}</div>
                    <div class="rs-stars">${starHTML}</div>
                    <div class="rs-xpbar-wrap">
                        <div class="rs-xpbar" id="rs-xpbar" style="width:0%"></div>
                    </div>
                </div>

                <div class="rs-body">
                    <!-- TESOROS -->
                    <div>
                        <div class="rs-label">▸ TESOROS OBTENIDOS</div>
                        <div class="rs-treasures">${tesHTML}</div>
                    </div>

                    <!-- STATS -->
                    <div>
                        <div class="rs-label">▸ TU PUNTUACIÓN</div>
                        <div class="rs-stats">
                            <div class="rs-stat">
                                <span class="rs-stat-val">+${roundScore}</span>
                                <span class="rs-stat-lbl">PUNTOS</span>
                            </div>
                            <div class="rs-stat">
                                <span class="rs-stat-val">${accuracy}%</span>
                                <span class="rs-stat-lbl">PRECISIÓN</span>
                            </div>
                            <div class="rs-stat">
                                <span class="rs-stat-val">${currentScore}</span>
                                <span class="rs-stat-lbl">TOTAL</span>
                            </div>
                        </div>
                    </div>

                    <!-- NEXT ZONE -->
                    <div>
                        <div class="rs-label">▸ SIGUIENTE ZONA</div>
                        ${nextHTML}
                    </div>
                </div>

                <!-- BOTÓN -->
                <div class="rs-cta">
                    <button class="rs-btn" id="rs-continue-btn">CONTINUAR</button>
                </div>
            </div>
        </div>
    `;

    overlay.classList.add('visible');

    /* Animar XP bar */
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const bar = document.getElementById('rs-xpbar');
            if (bar) bar.style.width = xpPct + '%';
        });
    });

    /* Keyboard */
    const keyHandler = e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); close(); }
    };

    function close() {
        document.removeEventListener('keydown', keyHandler);
        overlay.classList.remove('visible');
        setTimeout(onContinue, 80);
    }

    document.getElementById('rs-continue-btn').addEventListener('click', close);
    document.addEventListener('keydown', keyHandler);
}

window.showRoundSummary = showRoundSummary;