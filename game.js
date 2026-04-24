'use strict';

/* ══════════════════════════════════════
   GAME DATA
══════════════════════════════════════ */
const DATA = {
    rondas: [
        {
            titulo: "Ronda 1 — Reacciones Lumínicas",
            lugar: "TILACOIDES",
            desc: "Jefe, estamos en los TILACOIDES. Necesitamos FOTONES (680nm) y AGUA. No deje pasar radiación mala ni gases equivocados. ¡Produzca ATP y NADPH!",
            visitantes: [
                {
                    nombre: "Fotón Solar",
                    tipo: "Energía pura / Paquete luminoso",
                    origen: "Sol — 150 millones de km de viaje",
                    destino: "Centro de reacción — Fotosistemas",
                    func: "Excitar electrones a niveles de alta energía",
                    auth: "680nm ",
                    real: true,
                    imgSrc: "fotonsol.png",
                    faIcon: "fa-sun",
                    faColor: "icon-energy",
                    msg: "¡Hola! Soy la chispa del juego. Mi función es golpear a los pigmentos para excitar a los electrones y lanzarlos a niveles de energía más altos. Sin mi energía, nadie en este castillo se mueve.",
                    pista: null
                },
                {
                    nombre: "Clorofila",
                    tipo: "Pigmento fotosintético",
                    origen: "Complejo recolector de luz en los fotosistemas",
                    destino: "Centro de reacción",
                    func: "Captar energía luminosa y transferirla al centro de reacción",
                    auth: "Embudo de energía",
                    real: true,
                    imgSrc: "clorofila.png",
                    faIcon: "fa-leaf",
                    faColor: "icon-enzyme",
                    msg: "Soy el panel solar del castillo. Absorbo la luz y la canalizo hacia el centro de reacción para que el impacto energético sea lo suficientemente fuerte como para impulsar el proceso.",
                    pista: "Sin pigmentos como yo, la energía de la luz no puede ser aprovechada."
                },
                {
                    nombre: "Fotosistema II",
                    tipo: "Complejo proteína-pigmento",
                    origen: "Membrana del tilacoide (inicio de la fase luminosa)",
                    destino: "Cadena de transporte de electrones",
                    func: "Excitar electrones usando energía luminosa e iniciar la cadena de transporte",
                    auth: "Cañón de electrones",
                    real: true,
                    imgSrc: "fotosistemaII.png",
                    faIcon: "fa-solar-panel",
                    faColor: "icon-enzyme",
                    msg: "¡Atención! Soy el primero en la fila, aunque me llamen II. Necesito un fotón ahora mismo para disparar mi primer electrón. Y tú, agua, acércate... voy a necesitar que te rompas para no quedarme sin munición. ¡Aquí comienza todo el flujo de energía!",
                    pista: "Sin el Fotosistema II, no inicia la cadena de transporte de electrones."
                },
                {
                    nombre: "H₂O",
                    tipo: "Molécula de agua",
                    origen: "Raíces — transporte por el xilema",
                    destino: "Lumen del tilacoide — Fotosistema II (fotólisis)",
                    func: "Donar electrones, liberar protones y producir oxígeno durante la fotólisis",
                    auth: "Donante de repuestos",
                    real: true,
                    imgSrc: "agua.png",
                    faIcon: "fa-droplet",
                    faColor: "icon-water",
                    msg: "Vengo a sacrificarme. Cuando la luz me rompe en el Fotosistema II, libero electrones para reemplazar los que se pierden, y protones que ayudan a generar energía. De paso, dejo oxígeno como un pequeño regalo para que ustedes respiren.",
                    pista: "Sin agua, no hay reposición de electrones ni producción de oxígeno."
                },
                {
                    nombre: "O₂",
                    tipo: "Molécula de oxígeno",
                    origen: "Fotólisis del agua (sacrificio del H₂O)",
                    destino: "Difusión hacia el mesófilo y atmósfera",
                    func: "Subproducto de la fotosíntesis liberado al ambiente",
                    auth: "Subproducto",
                    real: false,
                    imgSrc: "co2.png",
                    faIcon: "fa-wind",
                    faColor: "icon-gas",
                    msg: "Nací del sacrificio del agua. No soy necesario para fabricar azúcar; de hecho, puedo interferir en ese proceso. Mi destino es salir de la planta… y convertirme en el aire que ustedes respiran.",
                    pista: "No todo lo que se produce en la fotosíntesis se usa directamente en la planta."
                },
                {
                    nombre: "Electrón",
                    tipo: "Portador de energía",
                    origen: "Fotólisis del agua (H₂O)",
                    destino: "Fotosistema I (a través de la cadena de transporte)",
                    func: "Transportar energía a lo largo de la cadena y permitir la generación de gradiente de protones",
                    auth: "Energía excitada por fotón",
                    real: true,
                    imgSrc: "electron.png",
                    faIcon: "fa-bolt",
                    faColor: "icon-energy",
                    msg: "Acabo de saltar del agua al Fotosistema II y estoy cargado de energía. Recorro la cadena de transporte como un tobogán, liberando potencia para que las bombas de protones trabajen. ¡No me detengas, el Fotosistema I me espera para recargarme!",
                    pista: "Sin electrones en movimiento, no hay transporte de energía en la fotosíntesis."
                },
                {
                    nombre: "Fotosistema I - P700",
                    tipo: "Complejo proteína-pigmento (segundo sistema de energía)",
                    origen: "Membrana del tilacoide",
                    destino: "Formación de NADPH",
                    func: "Re-excitar electrones con energía luminosa para su transferencia final hacia NADPH",
                    auth: "Recarga de energía",
                    real: true,
                    imgSrc: "fotosistemaI.png",
                    faIcon: "fa-bolt-lightning",
                    faColor: "icon-energy",
                    msg: "Soy el P700. Después del primer recorrido, recibo al electrón y, con una segunda absorción de luz, le doy un nuevo impulso. Lo convierto en un proyectil de alta energía listo para alcanzar la meta final: la formación de NADPH.",
                    pista: "El Fotosistema I da la segunda carga de energía antes de la producción de NADPH."
                },
                {
                    nombre: "Fotón Gamma",
                    tipo: "Energía de alta frecuencia / Radiación ionizante",
                    origen: "Eventos cósmicos — supernovas y rayos gamma",
                    destino: "Fotosistema I (interacción no controlada)",
                    func: "Transferir energía extrema; puede ionizar moléculas y alterar estructuras celulares",
                    auth: "00000.1nm",
                    real: false,
                    imgSrc: "fotonuv.png",
                    faIcon: "fa-radiation",
                    faColor: "icon-danger",
                    msg: "Vengo del universo profundo. No interactúo fácilmente, pero cuando lo hago, libero una cantidad enorme de energía. Puedo atravesar tejidos, alterar moléculas y despertar procesos… o destruirlos por completo.",
                    pista: "Demasiada energía puede ser peligrosa incluso para sistemas biológicos."
                },
            ]
        },
        {
            titulo: "Ronda 2 — Célula del Mesófilo",
            lugar: "MESÓFILO C4",
            desc: "Entramos a la Célula del Mesófilo. Aquí la PEP-carboxilasa atrapa CO₂ rápidamente. ¡Ojo con los que buscan a Rubisco — aquí no está, está oculta en la Vaina!",
            visitantes: [
                {
                    nombre: "Dióxido de Carbono (CO₂)",
                    tipo: "Gas / Materia prima de construcción",
                    origen: "Atmósfera exterior",
                    destino: "Célula de la vaina del haz",
                    func: "Aportar carbono para la síntesis de azúcares",
                    auth: "Cargamento de carbono",
                    real: true,
                    imgSrc: "co2.png",
                    faIcon: "fa-cloud",
                    faColor: "icon-gas",
                    msg: "Vengo del aire exterior y busco asilo en la planta. En el maíz no puedo ir directo a la fábrica de azúcar; primero debo registrarme aquí para que me transporten de forma segura.",
                    pista: "El CO₂ es la fuente de carbono para formar glucosa."
                },
                {
                    nombre: "PEP Carboxilasa (PEPC)",
                    tipo: "Enzima de alta afinidad",
                    origen: "Células del mesófilo",
                    destino: "Formación de oxalacetato",
                    func: "Capturar CO₂ y fijarlo en una molécula de 4 carbonos",
                    auth: "Super cargador C4",
                    real: true,
                    imgSrc: "pepc.png",
                    faIcon: "fa-shield",
                    faColor: "icon-enzyme",
                    msg: "¡Soy el guardia más eficiente! No me distraigo con el oxígeno impostor; atrapo al CO₂ apenas entra y lo convierto en un paquete sólido de 4 carbonos.",
                    pista: "PEPC evita que el oxígeno interfiera en la fijación del carbono."
                },
                {
                    nombre: "\"Carbono\" (O₂)",
                    tipo: "Gas",
                    origen: "Fotólisis del agua",
                    destino: "Fotorrespiración",
                    func: "Interferir con la fijación de carbono",
                    auth: "Gas restringido",
                    real: false,
                    imgSrc: "oxigeno.png",
                    faIcon: "fa-skull-crossbones",
                    faColor: "icon-danger",
                    msg: "Sé que parezco un poco diferente, pero soy una molécula eficiente. RuBisCO me está esperando; si me dejas pasar, prometo aumentar la producción… ¿o no?",
                    pista: "El oxígeno interfiere con la Rubisco y reduce la eficiencia fotosintética."
                },
                {
                    nombre: "PEP (Fosfoenolpiruvato)",
                    tipo: "Molécula aceptora de 3 carbonos",
                    origen: "Ciclos internos del mesófilo",
                    destino: "Formación de oxalacetato",
                    func: "Aceptar CO₂ para formar compuestos de 4 carbonos",
                    auth: "Base de reacción",
                    real: true,
                    imgSrc: "pepf.png",
                    faIcon: "fa-circle",
                    faColor: "icon-molecule",
                    msg: "Soy el asiento donde viaja el carbono. Cuando PEPC me une con CO₂, me transformo en un paquete poderoso listo para viajar.",
                    pista: "PEP es clave para iniciar la ruta C4."
                },
                {
                    nombre: "Malato",
                    tipo: "Ácido de 4 carbonos",
                    origen: "Unión de CO₂ + PEP",
                    destino: "Célula de la vaina del haz",
                    func: "Transportar carbono de forma segura",
                    auth: "Transporte seguro de carbono",
                    real: true,
                    imgSrc: "malato.png",
                    faIcon: "fa-truck",
                    faColor: "icon-enzyme",
                    msg: "Llevo el carbono en un paquete de 4 partes. Mi misión es cruzar hacia la vaina del haz y entregar el CO₂ directamente a la Rubisco sin interferencias.",
                    pista: "El malato transporta el carbono en plantas C4."
                },
                {
                    nombre: "Glucosa",
                    tipo: "Azúcar Simple",
                    origen: "Mesófilo (dice)",
                    destino: "Raíz",
                    func: "Energía",
                    auth: "GLU-99",
                    real: false,
                    imgSrc: "glucosa.png",
                    faIcon: "fa-candy-cane",
                    faColor: "icon-danger",
                    msg: "Ya soy glucosa terminada, déjenme pasar.",
                    pista: "¡La glucosa se fabrica en la Vaina (Ciclo de Calvin)! No viene del Mesófilo."
                }
            ]
        },
        {
            titulo: "Ronda 3 — Célula de la Vaina",
            lugar: "VAINA FASCICULAR",
            desc: "Esta es la zona VIP. Aquí liberamos CO₂ puro para RUBISCO. ¡Prohibido el paso al Oxígeno — o habrá fotorrespiración y la planta sufrirá!",
            visitantes: [
                {
                    nombre: "Malato",
                    tipo: "Ácido Orgánico de 3 carbonos",
                    origen: "Reacción de fijación en el Citoplasma del Mesófilo",
                    destino: "Centro de descarboxilación interno",
                    func: "Unidad de Transporte C4 no verificada",
                    auth: "PENDIENTE DE ESCÁNER",
                    real: false,
                    imgSrc: "MALATO FALSO.png",
                    faIcon: "fa-mask",
                    faColor: "icon-danger",
                    msg: "Aquí tiene mi registro: cuatro carbonos en regla, estructura estable y origen verificado en el mesófilo. Sé que el protocolo exige revisión, pero el flujo está saturado y si me detiene aquí para abrir mis enlaces, vamos a romper la cadena de suministro hacia la vaina. Si todo está en orden, me gustaría seguir mi camino; el ciclo no se va a completar solo ¿Podemos proceder?",
                    pista: "Ojo: un malato legítimo tiene 4 carbonos, no 3. Este no cuadra."
                },
                {
                    nombre: "Malato",
                    tipo: "Ácido orgánico de 4 carbonos",
                    origen: "Célula del mesófilo",
                    destino: "Descarboxilación — liberar su carga de CO₂",
                    func: "Transportar carbono blindado hacia la vaina del haz",
                    auth: "Transporte Seguro C4",
                    real: true,
                    imgSrc: "malato.png",
                    faIcon: "fa-truck-arrow-right",
                    faColor: "icon-molecule",
                    msg: "Traigo el carbono blindado desde el nivel anterior. Mi misión es soltar el CO₂ justo frente a la jefa para que la producción no se detenga.",
                    pista: "El malato es el transportador oficial de carbono en plantas C4."
                },
                {
                    nombre: "RuBisCO",
                    tipo: "Enzima fijadora principal",
                    origen: "Estroma del cloroplasto de la vaina",
                    destino: "Formación de 3-PGA",
                    func: "Fijar CO₂ en el Ciclo de Calvin",
                    auth: "Maestra de Fijación",
                    real: true,
                    imgSrc: "RUBISCO.png",
                    faIcon: "fa-crown",
                    faColor: "icon-enzyme",
                    msg: "Aquí en el maíz estoy protegida del oxígeno traidor. Con el carbono que me traen y la energía del Nivel 1, ¡crearé la riqueza de la planta!",
                    pista: "RuBisCO solo trabaja en la vaina, no en el mesófilo. Eso la protege del O₂."
                },
                {
                    nombre: "RuBP",
                    tipo: "Azúcar aceptora de 5 carbonos",
                    origen: "Ciclo de regeneración interna",
                    destino: "Unión con CO₂ para convertirse en 3-PGA",
                    func: "Recibir el CO₂ y arrancar el Ciclo de Calvin",
                    auth: "Receptor VIP",
                    real: true,
                    imgSrc: "RIBULOSA.png",
                    faIcon: "fa-circle-dot",
                    faColor: "icon-molecule",
                    msg: "Soy la base de 5 carbonos. Sin mí, el CO₂ no tiene dónde aterrizar para empezar la fabricación.",
                    pista: "Sin RuBP no hay punto de entrada para el CO₂ en el ciclo de Calvin."
                },
                {
                    nombre: "3-PGA",
                    tipo: "Primer producto estable de la fijación",
                    origen: "Unión de CO₂ + RuBP",
                    destino: "Transformación en G3P y luego glucosa",
                    func: "Primer paso sólido hacia el azúcar",
                    auth: "Producto de Construcción",
                    real: true,
                    imgSrc: "3PGA.png",
                    faIcon: "fa-gem",
                    faColor: "icon-energy",
                    msg: "Soy el primer paso sólido del azúcar. Solo necesito un poco de combustible del Nivel 1 para convertirme en el premio final.",
                    pista: "3-PGA es el primer compuesto estable que sale de la fijación del CO₂."
                },
                {
                    nombre: "Agente Amino-C4",
                    tipo: "Transportador Alternativo",
                    origen: "Vía metabólica secundaria",
                    destino: "Mitocondrias de la vaina",
                    func: "Sustitución por estrés hídrico — no autorizada",
                    auth: "Protocolo de emergencia",
                    real: false,
                    imgSrc: "amino.png",
                    faIcon: "fa-triangle-exclamation",
                    faColor: "icon-danger",
                    msg: "Ha habido un cambio en la regulación enzimática por estrés hídrico. Soy el de sustitución. Traigo el nitrógeno y el carbono necesarios para equilibrar la acidez de la vaina. No pierdas tiempo buscando el CO₂ en mis enlaces superficiales; mi carga está integrada de forma interna para mayor estabilidad. Si me bloqueas el paso, la RuBisCO no tendrá el ambiente adecuado para trabajar y la planta entrará en estado de marchitamiento. ¿Vas a arriesgar toda la producción por no conocer los protocolos de emergencia?",
                    pista: "Cuidado con el argumento de urgencia. Su destino son las mitocondrias, no el ciclo de Calvin."
                },
                {
                    nombre: "Glucosa",
                    tipo: "Carbohidrato / Energía almacenada",
                    origen: "Salida del Ciclo de Calvin",
                    destino: "Granos del maíz y el resto del cuerpo de la planta",
                    func: "Almacenar la energía solar como azúcar",
                    auth: "Producto Final Certificado",
                    real: true,
                    imgSrc: "glucosa.png",
                    faIcon: "fa-candy-cane",
                    faColor: "icon-energy",
                    msg: "¡Soy el trofeo! La energía del sol y el carbono del aire ahora son azúcar dulce lista para comer.",
                    pista: null
                },
             ]
        }
        
    ]
};

/* ══════════════════════════════════════
   SFX
══════════════════════════════════════ */
const SFX = {
    ctx: null,
    init() { if (!this.ctx) this.ctx = new AudioContext(); },
    play(freq, type, duration, vol = 0.3) {
        this.init();
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.connect(g); g.connect(this.ctx.destination);
        o.type = type; o.frequency.value = freq;
        g.gain.setValueAtTime(vol, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        o.start(); o.stop(this.ctx.currentTime + duration);
    },
    approve() { this.play(523, 'sine', 0.15); setTimeout(() => this.play(784, 'sine', 0.2), 100); },
    reject()  { this.play(200, 'sawtooth', 0.3); },
    correct() { [523,659,784].forEach((f,i) => setTimeout(() => this.play(f,'sine',0.18), i*80)); },
    wrong()   { this.play(150, 'square', 0.4); },
    start()   { [392,440,523].forEach((f,i) => setTimeout(() => this.play(f,'triangle',0.25), i*120)); }
};

/* ══════════════════════════════════════
   STATE
══════════════════════════════════════ */
let state = { round: 0, vIndex: 0, score: 0, health: 100, errors: 0, busy: false };

/* ══════════════════════════════════════
   ROUND SUMMARY TRACKING
══════════════════════════════════════ */
let _rsRoundStartScore = 0;
let _rsRoundCorrect    = 0;
let _rsRoundTotal      = 0;

function rsStartRound() {
    _rsRoundStartScore = state.score;
    _rsRoundCorrect    = 0;
    _rsRoundTotal      = DATA.rondas[state.round].visitantes.length;
}

function rsTrackDecision(correct) {
    if (correct) _rsRoundCorrect++;
}

/* ══════════════════════════════════════
   DOM REFS
══════════════════════════════════════ */
const $ = id => document.getElementById(id);
const EL = {
    screenStart: $('screen-start'),
    screenInfo: $('screen-info'),
    screenEnd: $('screen-end'),
    mainGame: $('main-game'),
    infoTitle: $('info-title'),
    infoDesc: $('info-desc'),
    infoLugarSpan: document.querySelector('#info-lugar span'),
    roundLabel: $('round-label'),
    score: $('score'),
    healthFill: $('health-fill'),
    visitorCont: $('visitor-container'),
    visitorIcon: $('visitor-icon'),
    idCard: $('id-card'),
    docName: $('doc-name'),
    docType: $('doc-type'),
    docOrigin: $('doc-origin'),
    docDest: $('doc-dest'),
    docFunc: $('doc-func'),
    docAuth: $('doc-auth'),
    profTalk: $('prof-talk'),
    profName: $('prof-name'),
    stampVisual: $('stamp-visual'),
    stickyNote: $('sticky-note'),
    pistaText: $('pista-text'),
    stage: $('stage'),
    endTitle: $('end-title'),
    endBadge: $('end-badge'),
    finalScore: $('final-score'),
    progressDots: $('progress-dots'),
    wipe: $('wipe-overlay'),
    themeToggle: $('theme-toggle')
};

/* ══════════════════════════════════════
   THEME
══════════════════════════════════════ */
let currentTheme = 'light';
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    EL.themeToggle.innerHTML = currentTheme === 'dark'
        ? '<i class="fa-solid fa-sun"></i> Claro'
        : '<i class="fa-solid fa-moon"></i> Oscuro';
}

/* ══════════════════════════════════════
   START SCREEN ANIMATION
══════════════════════════════════════ */
window.addEventListener('load', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.title-main', { y: -55, opacity: 0, duration: 0.8 })
        .from('.title-sub', { y: -15, opacity: 0, duration: 0.4 }, '-=0.3')
        .from('.specimen-label', { opacity: 0, duration: 0.35 }, '-=0.2')
        .from('.intro-box', { y: 22, opacity: 0, duration: 0.5 }, '-=0.2')
        .from('#screen-start .btn', { scale: 0.7, opacity: 0, duration: 0.45, ease: 'back.out(2)' }, '-=0.2')
        .from('.kb-hint', { opacity: 0, duration: 0.3 }, '-=0.1')
        .from('.start-plant', { opacity: 0, x: -20, duration: 0.5, stagger: 0.15 }, '-=0.4');
});

/* ══════════════════════════════════════
   WIPE TRANSITION
══════════════════════════════════════ */
function wipeTransition(onMidpoint) {
    return new Promise(resolve => {
        const wipe = EL.wipe;
        wipe.style.opacity = '0';
        wipe.style.transform = 'scaleY(0)';
        wipe.style.transformOrigin = 'top';
        wipe.style.pointerEvents = 'all';

        anime({
            targets: wipe,
            keyframes: [
                { scaleY: 0, opacity: 0, duration: 0 },
                { scaleY: 1, opacity: 1, duration: 200, easing: 'easeInQuart' },
                { scaleY: 1, opacity: 1, duration: 80 }
            ],
            complete: () => {
                if (onMidpoint) onMidpoint();
                anime({
                    targets: wipe,
                    scaleY: 0, opacity: 0,
                    transformOrigin: 'bottom',
                    duration: 200,
                    easing: 'easeOutQuart',
                    complete: () => {
                        wipe.style.pointerEvents = 'none';
                        resolve();
                    }
                });
            }
        });
    });
}

/* ══════════════════════════════════════
   KEYBOARD
══════════════════════════════════════ */
document.addEventListener('keydown', e => {
    if (EL.mainGame.style.display !== 'grid') return;
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === 'a' || e.key === 'A') decide(true);
    if (e.key === 'ArrowLeft' || e.key === 'Escape' || e.key === 'd' || e.key === 'D') decide(false);
});

/* ══════════════════════════════════════
   FLOW
══════════════════════════════════════ */
function startGame() {
    wipeTransition(() => {
        SFX.start();
        document.body.classList.add('game-running');
        EL.screenStart.classList.remove('active');
        showRoundInfo();
    });
}

function showRoundInfo() {
    state.busy = true;
    rsStartRound(); /* ← registra score inicial y total de visitantes */

    const r = DATA.rondas[state.round];
    EL.infoTitle.textContent = r.titulo;
    EL.infoDesc.textContent  = r.desc;
    if (EL.infoLugarSpan) EL.infoLugarSpan.textContent = r.lugar;
    EL.mainGame.style.display = 'none';
    EL.screenInfo.classList.add('active');
    buildProgressDots();

    gsap.set(['#info-lugar', '#info-title', '#info-desc', '#progress-dots', '#screen-info .btn'],
        { opacity: 0, y: 28 });
    gsap.to('#info-lugar',      { opacity: 1, y: 0, duration: 0.38, delay: 0.05 });
    gsap.to('#info-title',      { opacity: 1, y: 0, duration: 0.48, delay: 0.14, ease: 'back.out(1.6)' });
    gsap.to('#info-desc',       { opacity: 1, y: 0, duration: 0.48, delay: 0.26 });
    gsap.to('#progress-dots',   { opacity: 1, y: 0, duration: 0.38, delay: 0.40 });
    gsap.to('#screen-info .btn',{ opacity: 1, y: 0, duration: 0.38, delay: 0.52, ease: 'back.out(1.5)' });
}

/* ══════════════════════════════════════
   RENDER VISITOR ICON / IMAGE
══════════════════════════════════════ */
function renderVisitorIcon(v) {
    const cont = EL.visitorCont;
    const oldImg = cont.querySelector('.visitor-img');
    if (oldImg) oldImg.remove();
    EL.visitorIcon.style.display = '';

    if (v.imgSrc) {
        const img = document.createElement('img');
        img.src = v.imgSrc;
        img.alt = v.nombre;
        img.className = 'visitor-img';
        img.style.cssText = `
            width:280px;height:280px;object-fit:contain;
            position:relative;z-index:2;
            filter:drop-shadow(0 3px 8px rgba(0,0,0,0.2));
        `;
        img.onerror = () => {
            img.remove();
            EL.visitorIcon.className = `fa-solid ${v.faIcon} ${v.faColor}`;
            EL.visitorIcon.style.display = '';
        };
        EL.visitorIcon.style.display = 'none';
        cont.appendChild(img);
    } else {
        EL.visitorIcon.className = `fa-solid ${v.faIcon} ${v.faColor}`;
    }
}

function nextVisitor() {
    EL.screenInfo.classList.remove('active');
    EL.mainGame.style.display = 'grid';

    EL.stickyNote.style.display = 'none';
    gsap.set(EL.stickyNote, { opacity: 0, scale: 0 });

    const round = DATA.rondas[state.round];
    const v     = round.visitantes[state.vIndex];

    EL.roundLabel.textContent = `${round.lugar}  ·  ${state.vIndex + 1} / ${round.visitantes.length}`;

    renderVisitorIcon(v);

    EL.docName.textContent   = v.nombre;
    EL.docType.textContent   = v.tipo;
    EL.docOrigin.textContent = v.origen;
    EL.docDest.textContent   = v.destino;
    EL.docFunc.textContent   = v.func;
    EL.docAuth.textContent   = v.auth;

    if (EL.profName) {
        EL.profName.innerHTML = `<i class="fa-solid fa-comment-dots"></i> ${v.nombre} dice:`;
    }

    gsap.killTweensOf([EL.visitorCont, EL.visitorIcon, EL.idCard]);
    gsap.set(EL.idCard, { clearProps: "transform" });

    gsap.set(EL.visitorCont, { y: 360, opacity: 0, rotation: -8, scale: 0.88 });
    gsap.to(EL.visitorCont, {
        y: 0, opacity: 1, rotation: 0, scale: 1,
        duration: 0.65, ease: 'back.out(1.5)',
        onComplete: () => {
            const img    = EL.visitorCont.querySelector('.visitor-img');
            const target = img || EL.visitorIcon;
            gsap.to(target, { y: -8, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        }
    });

    if (!(state.vIndex === 0 && state.round === 0)) {
        gsap.to(EL.idCard, {
            scale: 0.97, duration: 0.08, ease: 'power2.in',
            onComplete: () => {
                gsap.to(EL.idCard, { scale: 1, rotation: 1.5, duration: 0.22, ease: 'back.out(2)' });
            }
        });
    }

    setTimeout(() => {
        gsap.fromTo('.field-value',
            { x: 10, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.18, stagger: 0.045, ease: 'power2.out' }
        );
        typeText(EL.profTalk, `"${v.msg}"`);
        updateProgressDots();
        state.busy = false;
    }, state.vIndex === 0 && state.round === 0 ? 380 : 120);
}

/* ══════════════════════════════════════
   DECIDE
══════════════════════════════════════ */
function decide(approve) {
    if (state.busy) return;
    state.busy = true;

    if (_typingInterval) {
        clearInterval(_typingInterval);
        _typingInterval = null;
        EL.profTalk.classList.remove('typing');
    }

    const v       = DATA.rondas[state.round].visitantes[state.vIndex];
    const correct = (approve === v.real);

    /* ── sonido: UN solo sonido basado en acierto ── */
    if (correct) SFX.correct(); else SFX.wrong();

    /* ── tracking para el resumen ── */
    rsTrackDecision(correct);

    gsap.killTweensOf(EL.visitorIcon);
    showStamp(approve);

    const flashColor = correct ? 'rgba(61,128,24,0.1)' : 'rgba(184,40,40,0.1)';
    gsap.fromTo(EL.stage,
        { backgroundColor: flashColor },
        { backgroundColor: 'transparent', duration: 0.55, ease: 'power2.out' }
    );

    if (correct) {
        state.score += 10;
        state.errors = 0;
        const img = EL.visitorCont.querySelector('.visitor-img');
        gsap.to(img || EL.visitorIcon, { scale: 1.28, duration: 0.12, ease: 'power2.out', yoyo: true, repeat: 1 });
    } else {
        state.score -= 5;
        state.health -= 25;
        state.errors++;
        gsap.to('#stage', { x: [-7,7,-5,5,-3,3,-1,1,0], duration: 0.38, ease: 'none' });
        if (state.errors >= 2 && v.pista) showPista(v.pista);
    }

    animateStats(correct);
    spawnScorePop(correct);

    if (state.health <= 0) {
        setTimeout(() => endGame(false), 820);
        return;
    }

    setTimeout(() => {
        gsap.to(EL.visitorCont, {
            y: approve ? -340 : 340, opacity: 0,
            duration: 0.4, ease: 'power2.in'
        });
        gsap.to(EL.idCard, {
            x: approve ? 500 : -500,
            rotation: approve ? 24 : -24, opacity: 0,
            duration: 0.45, ease: 'power2.in'
        });
    }, 820);

    setTimeout(() => {
        gsap.set(EL.stampVisual, { opacity: 0 });
        gsap.set(EL.idCard, { clearProps: 'all' });
        gsap.set(EL.idCard, { rotateY: 0, opacity: 1, y: 0, x: 0 });

        state.vIndex++;
        const round = DATA.rondas[state.round];

        if (state.vIndex >= round.visitantes.length) {
            /* ── fin de ronda ── */
            const completedRound = state.round;
            state.vIndex = 0;
            state.round++;

            if (state.round >= DATA.rondas.length) {
                showEndingCinematic(state.score, () => endGame(true));
            } else {
                /* Mostrar resumen antes de pasar a la siguiente ronda */
                showRoundSummary(completedRound, state.score, _rsRoundStartScore, _rsRoundCorrect, _rsRoundTotal, () => {
                    wipeTransition(() => showRoundInfo());
                });
            }
        } else {
            nextVisitor();
        }
    }, 1380);
}

/* ══════════════════════════════════════
   SHOW PISTA
══════════════════════════════════════ */
function showPista(texto) {
    EL.pistaText.textContent = texto;
    EL.stickyNote.style.display = 'block';
    gsap.fromTo(EL.stickyNote,
        { rotation: -10, scale: 0, opacity: 0 },
        { rotation: -3, scale: 1, opacity: 1, duration: 0.42, ease: 'back.out(2.2)' }
    );
}

/* ══════════════════════════════════════
   STAMP
══════════════════════════════════════ */
function showStamp(approve) {
    const el = EL.stampVisual;
    if (approve) {
        el.innerHTML = `<i class="fa-solid fa-stamp"></i> APROBADO`;
        el.style.color = 'var(--green-leaf)';
    } else {
        el.innerHTML = `<i class="fa-solid fa-ban"></i> RECHAZADO`;
        el.style.color = 'var(--red-mid)';
    }
    const rot = approve ? -7 : 7;
    gsap.set(el, { opacity: 0, y: -90, rotation: rot * 3, scale: 2.4 });
    gsap.to(el, {
        opacity: 1, y: 0, rotation: rot, scale: 1,
        duration: 0.28, ease: 'back.out(2)',
        onComplete: () => {
            gsap.to(el, { opacity: 0, y: 18, duration: 0.28, delay: 0.85, ease: 'power2.in' });
        }
    });
}

/* ══════════════════════════════════════
   STATS
══════════════════════════════════════ */
function animateStats(correct) {
    const prev = correct ? state.score - 10 : state.score + 5;
    anime({
        targets: { val: prev },
        val: state.score,
        round: 1,
        easing: 'easeOutQuart',
        duration: 500,
        update(anim) {
            EL.score.textContent = Math.round(anim.animations[0].currentValue);
        }
    });

    gsap.fromTo(EL.score,
        { scale: 1.6, color: correct ? 'var(--green-leaf)' : 'var(--red-mid)' },
        { scale: 1, color: 'var(--amber-light)', duration: 0.4, ease: 'back.out(2)' }
    );

    const h     = Math.max(0, state.health);
    const color = h <= 25
        ? 'linear-gradient(90deg,var(--red-mid),#E06060)'
        : h <= 50
            ? 'linear-gradient(90deg,var(--amber),var(--amber-light))'
            : 'linear-gradient(90deg,var(--green-leaf),var(--green-light))';

    gsap.to(EL.healthFill, {
        width: h + '%', duration: 0.5, ease: 'power2.out',
        onUpdate() { EL.healthFill.style.background = color; }
    });

    if (!correct) {
        gsap.fromTo(EL.healthFill,
            { filter: 'brightness(2.5) saturate(0)' },
            { filter: 'brightness(1) saturate(1)', duration: 0.55 }
        );
    }
}

/* ══════════════════════════════════════
   SCORE POP & BURST
══════════════════════════════════════ */
function spawnScorePop(correct) {
    const pop = document.createElement('div');
    pop.className   = 'score-pop';
    pop.textContent = correct ? '+10' : '-5';
    pop.style.color = correct ? 'var(--green-mid)' : 'var(--red-mid)';
    pop.style.left  = (120 + Math.random() * 100) + 'px';
    pop.style.top   = (100 + Math.random() * 80)  + 'px';
    EL.stage.appendChild(pop);

    gsap.fromTo(pop,
        { y: 0, scale: 0.6, opacity: 1 },
        { y: -68, scale: 1.4, opacity: 0, duration: 0.78, ease: 'power2.out',
          onComplete: () => pop.remove() }
    );

    if (correct) spawnBurst(pop);
}

function spawnBurst(anchor) {
    const rect   = anchor.getBoundingClientRect();
    const colors = ['#3D8018','#B86A10','#72B038','#BDD892','#E09820'];
    for (let i = 0; i < 8; i++) {
        const p  = document.createElement('div');
        const sz = 5 + Math.random() * 6;
        p.style.cssText = `position:fixed;width:${sz}px;height:${sz}px;
            border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
            background:${colors[i % colors.length]};
            left:${rect.left + rect.width / 2}px;top:${rect.top}px;
            pointer-events:none;z-index:9998;`;
        document.body.appendChild(p);
        const angle = (i / 8) * Math.PI * 2;
        const dist  = 38 + Math.random() * 50;
        gsap.to(p, {
            x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
            opacity: 0, scale: 0,
            duration: 0.48 + Math.random() * 0.25, ease: 'power2.out',
            onComplete: () => p.remove()
        });
    }
}

/* ══════════════════════════════════════
   PROGRESS DOTS
══════════════════════════════════════ */
function buildProgressDots() {
    if (!EL.progressDots) return;
    EL.progressDots.innerHTML = '';
    DATA.rondas.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'progress-dot' + (i < state.round ? ' done' : i === state.round ? ' current' : '');
        EL.progressDots.appendChild(d);
    });
}

function updateProgressDots() {
    if (!EL.progressDots) return;
    EL.progressDots.querySelectorAll('.progress-dot').forEach((d, i) => {
        d.className = 'progress-dot' + (i < state.round ? ' done' : i === state.round ? ' current' : '');
    });
}

/* ══════════════════════════════════════
   TYPING
══════════════════════════════════════ */
let _typingInterval = null;

function typeText(el, text, speed = 24) {
    if (_typingInterval) { clearInterval(_typingInterval); _typingInterval = null; }
    el.classList.remove('typing');
    el.textContent = '';
    el.classList.add('typing');
    let i = 0;
    _typingInterval = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) {
            clearInterval(_typingInterval);
            _typingInterval = null;
            el.classList.remove('typing');
        }
    }, speed);
}

/* ══════════════════════════════════════
   END GAME
══════════════════════════════════════ */
function endGame(won) {
    wipeTransition(() => {
        document.body.classList.remove('game-running');

        EL.mainGame.style.display = 'none';
        EL.screenInfo.classList.remove('active');
        EL.screenEnd.classList.add('active');

        EL.endTitle.textContent  = won ? '¡Cosecha Exitosa!' : '¡La Hoja Murió!';
        EL.endTitle.style.color  = won ? 'var(--green-deep)' : 'var(--red-dark)';
        if (EL.endBadge) EL.endBadge.textContent = won ? '🌽' : '🍂';

        let grade, gradeColor;
        if      (state.score >= 160) { grade = 'A+ — Maíz Supremo';  gradeColor = 'var(--green-mid)';  }
        else if (state.score >= 120) { grade = 'B  — Buena Cosecha'; gradeColor = 'var(--green-leaf)'; }
        else if (state.score >= 70)  { grade = 'C  — Supervivencia'; gradeColor = 'var(--amber)';      }
        else                         { grade = 'D  — Fotorrespiración'; gradeColor = 'var(--red-mid)'; }

        const counter = { val: 0 };
        anime({
            targets: counter, val: state.score,
            round: 1, easing: 'easeOutExpo',
            duration: 1200, delay: 350,
            update() {
                EL.finalScore.innerHTML = `
                    <span style="color:${gradeColor};font-family:'Rye',serif;font-size:22px;">${grade}</span><br>
                    <span style="color:var(--amber);font-family:'Courier Prime',monospace;letter-spacing:3px;font-size:13px;">
                        ✦ PUNTUACIÓN FINAL: ${Math.round(counter.val)} PTS ✦
                    </span>`;
            }
        });

        gsap.set([EL.endBadge, EL.endTitle, '.final-score-box', '.credits-box', '#screen-end .btn'],
            { opacity: 0, y: 38 });
        gsap.to(EL.endBadge,         { opacity: 1, y: 0, duration: 0.6,  delay: 0.10, ease: 'back.out(2.5)' });
        gsap.to(EL.endTitle,         { opacity: 1, y: 0, duration: 0.5,  delay: 0.24 });
        gsap.to('.final-score-box',  { opacity: 1, y: 0, duration: 0.48, delay: 0.40 });
        gsap.to('.credits-box',      { opacity: 1, y: 0, duration: 0.44, delay: 0.58 });
        gsap.to('#screen-end .btn',  { opacity: 1, y: 0, duration: 0.44, delay: 0.75, ease: 'back.out(1.5)' });
    });
}

/* ══════════════════════════════════════
   GLOBALS
══════════════════════════════════════ */
window.startGame   = startGame;
window.nextVisitor = nextVisitor;
window.decide      = decide;
window.toggleTheme = toggleTheme;
