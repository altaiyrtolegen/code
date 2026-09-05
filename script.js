// ==========================================================================
// УГОЛОК ВАЙБКОДЕРА АЛИКА — ИНТЕРАКТИВНАЯ ЛОГИКА v2.0
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initGreeting();
    initCanvasVibes();
    initAudioSynth();
    initStatusUpdater();
    initCodeTabs();
    initQuoteGenerator();
    initThemeToggle();
    initAnimatedCounters();
});

// --------------------------------------------------------------------------
// 7. АНИМАЦИЯ СЧЕТЧИКОВ МЕТРИК
// --------------------------------------------------------------------------

function initAnimatedCounters() {
    const coffeeEl = document.getElementById('coffee-counter');
    const locEl = document.getElementById('loc-counter');

    function animateValue(obj, start, end, duration) {
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    animateValue(coffeeEl, 0, 42, 1500);
    animateValue(locEl, 0, 1337, 2000);
}

// --------------------------------------------------------------------------
// 1. ЧАСЫ И ДИНАМИЧЕСКОЕ ПРИВЕТСТВИЕ
// --------------------------------------------------------------------------

function initClock() {
    const clockEl = document.getElementById('live-clock');
    
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        if (clockEl) {
            clockEl.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);
}

function initGreeting() {
    const heading = document.getElementById('greeting-heading');
    const subtext = document.getElementById('greeting-subtext');
    const hour = new Date().getHours();

    let titleText = '';
    let subTextMsg = '';

    if (hour >= 5 && hour < 12) {
        titleText = '☕ Доброе утро, Алик!';
        subTextMsg = 'Время свежего кофе, вдохновения и написания элегантных алгоритмов.';
    } else if (hour >= 12 && hour < 18) {
        titleText = '⚡ Добрый день, Алик!';
        subTextMsg = 'Мощность вайба на максимуме. Готовы покорять новые задачи?';
    } else if (hour >= 18 && hour < 23) {
        titleText = '🌙 Добрый вечер, Алик!';
        subTextMsg = 'Зажигаем неоновые огни, включаем чиловую музыку и кодим в кайф.';
    } else {
        titleText = '🌌 Ночной вайб, Алик!';
        subTextMsg = 'Тишина, уют и самый продуктивный кодинг под звёздным небом.';
    }

    if (heading) heading.textContent = titleText;
    if (subtext) subtext.textContent = subTextMsg;
}

// --------------------------------------------------------------------------
// 2. АНИМИРОВАННЫЙ ФОНОВЫЙ ХОЛСТ (NEON FLOATING PARTICLES & LINES)
// --------------------------------------------------------------------------

function initCanvasVibes() {
    const canvas = document.getElementById('vibe-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 1,
            color: Math.random() > 0.5 ? 'rgba(0, 180, 216, ' : 'rgba(255, 255, 255, ',
            alpha: Math.random() * 0.5 + 0.25,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.shadowBlur = 12;
            ctx.shadowColor = p.color + '0.8)';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// --------------------------------------------------------------------------
// 3. ЗВУКОВОЙ СИНТЕЗАТОР ВАЙБА & ВИЗУАЛИЗАТОР (WEB AUDIO API)
// --------------------------------------------------------------------------

function initAudioSynth() {
    let audioCtx = null;
    let activeNodes = [];
    let currentSound = null;
    let masterGain = null;

    const soundBtns = document.querySelectorAll('.sound-btn');
    const volumeSlider = document.getElementById('volume-slider');

    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            masterGain = audioCtx.createGain();
            masterGain.gain.value = (volumeSlider ? volumeSlider.value : 40) / 100;
            masterGain.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            if (masterGain) {
                masterGain.gain.value = e.target.value / 100;
            }
        });
    }

    function stopCurrentSound() {
        activeNodes.forEach(node => {
            try {
                if (node.stop) node.stop();
                node.disconnect();
            } catch (e) {}
        });
        activeNodes = [];
        currentSound = null;
        soundBtns.forEach(btn => btn.classList.remove('active'));
    }

    soundBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const soundType = btn.dataset.sound;
            const ctx = getAudioContext();

            if (currentSound === soundType) {
                stopCurrentSound();
                return;
            }

            stopCurrentSound();
            currentSound = soundType;
            btn.classList.add('active');

            if (soundType === 'synth') {
                createSynthWave(ctx);
            } else if (soundType === 'rain') {
                createRainNoise(ctx);
            } else if (soundType === 'lofi') {
                createLofiPulse(ctx);
            }
        });
    });

    // Синтезатор Deep Navy Ambient Chords
    function createSynthWave(ctx) {
        const freqs = [98.00, 146.83, 196.00, 293.66, 392.00]; // G minor chord ocean vibes
        freqs.forEach(f => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.value = f;

            filter.type = 'lowpass';
            filter.frequency.value = 350;

            gain.gain.value = 0.08;

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(masterGain);

            osc.start();
            activeNodes.push(osc, gain, filter);
        });
    }

    // Генератор Шума Дождя & Грозы
    function createRainNoise(ctx) {
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 750;

        const gain = ctx.createGain();
        gain.gain.value = 0.16;

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        whiteNoise.start();
        activeNodes.push(whiteNoise, gain, filter);
    }

    // Lo-Fi Бит Импульс
    function createLofiPulse(ctx) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = 130.81;

        gain.gain.value = 0.12;

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start();
        activeNodes.push(osc, gain);
    }
}

// --------------------------------------------------------------------------
// 4. ТАБЫ ТЕРМИНАЛА КОДА И КОПИРОВАНИЕ
// --------------------------------------------------------------------------

function initCodeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const copyBtn = document.getElementById('copy-code-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const activeTab = document.getElementById(target);
            if (activeTab) activeTab.classList.add('active');
        });
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const activeTab = document.querySelector('.tab-content.active code');
            if (activeTab) {
                navigator.clipboard.writeText(activeTab.textContent).then(() => {
                    const original = copyBtn.textContent;
                    copyBtn.textContent = 'Скопировано! ✅';
                    setTimeout(() => {
                        copyBtn.textContent = original;
                    }, 2000);
                });
            }
        });
    }

    const runBtn = document.getElementById('run-code-btn');
    const consoleOutput = document.getElementById('terminal-console-output');
    const outputText = document.getElementById('output-text');

    if (runBtn && consoleOutput && outputText) {
        runBtn.addEventListener('click', () => {
            const activeTab = document.querySelector('.tab-content.active');
            if (!activeTab) return;
            const tabId = activeTab.id;

            consoleOutput.style.display = 'block';
            outputText.textContent = 'Выполнение...';

            setTimeout(() => {
                if (tabId === 'tab-py') {
                    outputText.textContent = 'Алик (18 лет, CS) | Час: ' + new Date().getHours() + ':00 | Вайб: Кодим на максимуме без ошибок!';
                } else if (tabId === 'tab-js') {
                    outputText.textContent = 'Алик и кодинг-пёс работают без багов! 🚀';
                } else {
                    outputText.textContent = 'JSON Parsed: { coder: "Alik", age: 18, vibeLevel: "Over 9000" } ✅';
                }
            }, 500);
        });
    }
}

// --------------------------------------------------------------------------
// 5. ГЕНЕРАТОР ЦИТАТ И ОБНОВЛЕНИЕ СТАТУСА
// --------------------------------------------------------------------------

function initQuoteGenerator() {
    const quotes = [
        '«Хороший код говорит сам за себя. Вайбовый код дарит вдохновение каждым!»',
        '«Кодинг в 2 часа ночи под Lo-Fi — это особый вид медитации.» ☕',
        '«Если твой алгоритм работает с первого раза — ты в правильном вайбе!» 🚀',
        '«100% кофеина + 0% багов = идеальный день вайбкодера.» ⚡',
        '«Каждая строка кода — это шаг к созданию собственной цифровой вселенной.» ✨'
    ];

    const quoteBtn = document.getElementById('new-quote-btn');
    const quoteDisplay = document.getElementById('quote-display');

    if (quoteBtn && quoteDisplay) {
        quoteBtn.addEventListener('click', () => {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteDisplay.textContent = randomQuote;
        });
    }
}

function initStatusUpdater() {
    const input = document.getElementById('user-status-input');
    const btn = document.getElementById('update-status-btn');

    if (btn && input) {
        btn.addEventListener('click', () => {
            const val = input.value.trim();
            if (val) {
                btn.textContent = 'Сохранено! ✨';
                setTimeout(() => {
                    btn.textContent = 'Обновить';
                }, 2000);
            }
        });
    }
}

// --------------------------------------------------------------------------
// 6. СМЕНА ТЕМЫ (CYBERPUNK MODE)
// --------------------------------------------------------------------------

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('mode-cyberpunk');
            if (document.body.classList.contains('mode-cyberpunk')) {
                themeBtn.textContent = '🔥 Cyberpunk Active';
            } else {
                themeBtn.textContent = '⚡ Cyberpunk Mode';
            }
        });
    }
}
