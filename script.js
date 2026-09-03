// ==========================================================================
// УГОЛОК ВАЙБКОДЕРА АЛИКА — ИНТЕРАКТИВНЫЙ ЛОГИКА (SCRIPT.JS)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initGreeting();
    initCanvasVibes();
    initAudioSynth();
    initStatusUpdater();
    initCodeCopy();
});

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
// 2. АНИМИРОВАННЫЙ ФОНОВЫЙ ХОЛСТ (NEON FLOATING PARTICLES)
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
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 1,
            color: Math.random() > 0.5 ? 'rgba(168, 85, 247, ' : 'rgba(6, 182, 212, ',
            alpha: Math.random() * 0.5 + 0.2,
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
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color + '0.8)';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// --------------------------------------------------------------------------
// 3. ЗВУКОВОЙ СИНТЕЗАТОР ВАЙБА (WEB AUDIO API)
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

    // Синтезатор Synthwave
    function createSynthWave(ctx) {
        const freqs = [110, 164.81, 220, 329.63]; // A chord notes
        freqs.forEach(f => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sawtooth';
            osc.frequency.value = f;

            filter.type = 'lowpass';
            filter.frequency.value = 400;

            gain.gain.value = 0.08;

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(masterGain);

            osc.start();
            activeNodes.push(osc, gain, filter);
        });
    }

    // Генератор Шума Дождя
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
        filter.frequency.value = 800;

        const gain = ctx.createGain();
        gain.gain.value = 0.15;

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        whiteNoise.start();
        activeNodes.push(whiteNoise, gain, filter);
    }

    // Lo-Fi Пакет Пулсов
    function createLofiPulse(ctx) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = 130.81; // C3

        gain.gain.value = 0.12;

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start();
        activeNodes.push(osc, gain);
    }
}

// --------------------------------------------------------------------------
// 4. СТАТУС ВАЙБА И КОПИРОВАНИЕ КОДА
// --------------------------------------------------------------------------

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

function initCodeCopy() {
    const copyBtn = document.getElementById('copy-code-btn');
    const codeContent = document.getElementById('code-content');

    if (copyBtn && codeContent) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = codeContent.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Скопировано! ✅';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            });
        });
    }
}
