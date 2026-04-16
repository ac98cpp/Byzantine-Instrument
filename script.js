(function () {
    "use strict";

    // ----- Web Audio state -----
    let audioContext = null;
    let masterGain = null;
    const FADE_SECONDS = 0.008;

    let activeElement = null;      // for trigger divs
    let activeOsc = null;
    let activeGain = null;

    // Slider mode state
    let sliderOsc = null;
    let sliderGain = null;
    let sliderPlaying = false;

    // ----- High‑frequency cut compensation -----
    function getLoudnessCompensation(freq) {
        return 1.0;   // no boost, no cut – flat response
    }

    // ----- Ensure AudioContext & masterGain -----
    function ensureContext() {
        if (!audioContext) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                masterGain = audioContext.createGain();
                masterGain.gain.value = 0.4;
                masterGain.connect(audioContext.destination);
            } catch (e) {
                console.warn('Web Audio not supported');
                return false;
            }
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume().catch(e => console.warn('resume error', e));
        }
        return true;
    }

    // ----- Stop ALL tones (trigger + slider) -----
    function stopAllTones() {
        // Stop trigger tone
        if (activeElement) {
            const osc = activeOsc;
            const gain = activeGain;
            if (gain && audioContext && audioContext.state !== 'closed') {
                const now = audioContext.currentTime;
                gain.gain.cancelScheduledValues(now);
                gain.gain.setValueAtTime(gain.gain.value, now);
                gain.gain.linearRampToValueAtTime(0.0, now + FADE_SECONDS);
                if (osc) {
                    try { osc.stop(now + FADE_SECONDS + 0.005); } catch (e) { }
                }
                setTimeout(() => {
                    try { osc.disconnect(); } catch (e) { }
                    try { gain.disconnect(); } catch (e) { }
                }, (FADE_SECONDS + 0.01) * 1000);
            } else {
                if (osc) {
                    try { osc.stop(); } catch (e) { }
                    try { osc.disconnect(); } catch (e) { }
                }
            }
            activeElement = null;
            activeOsc = null;
            activeGain = null;
        }

        // Stop slider tone
        if (sliderPlaying) {
            const osc = sliderOsc;
            const gain = sliderGain;
            if (gain && audioContext && audioContext.state !== 'closed') {
                const now = audioContext.currentTime;
                gain.gain.cancelScheduledValues(now);
                gain.gain.setValueAtTime(gain.gain.value, now);
                gain.gain.linearRampToValueAtTime(0.0, now + FADE_SECONDS);
                if (osc) {
                    try { osc.stop(now + FADE_SECONDS + 0.005); } catch (e) { }
                }
                setTimeout(() => {
                    try { osc.disconnect(); } catch (e) { }
                    try { gain.disconnect(); } catch (e) { }
                }, (FADE_SECONDS + 0.01) * 1000);
            } else {
                if (osc) {
                    try { osc.stop(); } catch (e) { }
                    try { osc.disconnect(); } catch (e) { }
                }
            }
            sliderOsc = null;
            sliderGain = null;
            sliderPlaying = false;
        }
    }

    // ----- Stop current tone (legacy, used by triggers) -----
    function stopCurrentTone() {
        stopAllTones();
    }

    // ----- Start tone for a trigger element -----
    function startToneForElement(el) {
        if (!ensureContext()) return;

        const freqAttr = el.getAttribute('data-frequency');
        const freq = freqAttr ? parseFloat(freqAttr) : 0;
        if (isNaN(freq)) return;

        if (activeElement === el) {
            stopAllTones();
            return;
        }

        stopAllTones();

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const compensation = getLoudnessCompensation(freq);

        osc.connect(gain);
        gain.connect(masterGain);

        const now = audioContext.currentTime;
        gain.gain.setValueAtTime(0.0, now);
        gain.gain.linearRampToValueAtTime(compensation, now + FADE_SECONDS);
        osc.start();

        activeElement = el;
        activeOsc = osc;
        activeGain = gain;
    }

    // ----- Click handler for triggers -----
    function handleTriggerClick(el) {
        if (activeElement === el) {
            stopAllTones();
        } else {
            startToneForElement(el);
        }
    }

    // ----- Bind all triggers -----
    function bindTriggers() {
        document.querySelectorAll('.tone-trigger').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                handleTriggerClick(el);
            });
        });
    }

    // ----- Apply multi‑row preset -----
    function applyMultiRowPreset(rowsFrequencies) {
        const rows = document.querySelectorAll('.tone-grid');
        rows.forEach((row, rowIndex) => {
            const triggers = row.querySelectorAll('.tone-trigger');
            const freqs = rowsFrequencies[rowIndex] || [];
            triggers.forEach((trigger, i) => {
                if (i < freqs.length) {
                    const freq = freqs[i];
                    trigger.setAttribute('data-frequency', freq);
                    trigger.title = `${freq.toFixed(2)} Hz · click to play/stop`;
                }
            });
        });
        stopAllTones();
    }

    // ----- Read current frequencies from DOM -----
    function getCurrentFrequenciesFromDOM() {
        const rows = document.querySelectorAll('.tone-grid');
        const allFreqs = [];
        rows.forEach(row => {
            const triggers = row.querySelectorAll('.tone-trigger');
            const rowFreqs = [];
            triggers.forEach(t => {
                const f = parseFloat(t.getAttribute('data-frequency'));
                rowFreqs.push(isNaN(f) ? 440 : f);
            });
            allFreqs.push(rowFreqs);
        });
        return allFreqs;
    }

    // ----- Slider logic -----
    function initSlider() {
        const slider = document.getElementById('freq-slider');
        const playBtn = document.getElementById('slider-play-btn');
        const freqDisplay = document.getElementById('freq-display');

        if (!slider || !playBtn || !freqDisplay) return;

        // ----- CUSTOMIZE THESE VALUES -----
        const SLIDER_MIN = 261.6255653005986;
        const SLIDER_MAX = 523.2511306011972;
        const SLIDER_STEP = 0.1;
        const SLIDER_DEFAULT = 391.99543598174927;
        // ---------------------------------

        slider.min = SLIDER_MIN;
        slider.max = SLIDER_MAX;
        slider.step = SLIDER_STEP;
        slider.value = SLIDER_DEFAULT;
        freqDisplay.textContent = SLIDER_DEFAULT + ' Hz';

        // Update display when slider moves
        slider.addEventListener('input', () => {
            const freq = parseFloat(slider.value);
            freqDisplay.textContent = 'Di = ' + freq.toFixed(0) + ' Hz';
            if (sliderPlaying && sliderOsc) {
                sliderOsc.frequency.value = freq;
                if (sliderGain) {
                    const compensation = getLoudnessCompensation(freq);
                    const now = audioContext.currentTime;
                    sliderGain.gain.cancelScheduledValues(now);
                    sliderGain.gain.setValueAtTime(sliderGain.gain.value, now);
                    sliderGain.gain.linearRampToValueAtTime(compensation, now + 0.01);
                }
            }
        });

        // Play/stop button
        playBtn.addEventListener('click', () => {
            if (!ensureContext()) return;

            if (sliderPlaying) {
                stopAllTones();
                slider.disabled = true;
                playBtn.textContent = '▶ Play';
            } else {
                stopAllTones();

                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.type = 'sine';
                const freq = parseFloat(slider.value);
                osc.frequency.value = freq;

                const compensation = getLoudnessCompensation(freq);

                osc.connect(gain);
                gain.connect(masterGain);

                const now = audioContext.currentTime;
                gain.gain.setValueAtTime(0.0, now);
                gain.gain.linearRampToValueAtTime(compensation, now + FADE_SECONDS);
                osc.start();

                sliderOsc = osc;
                sliderGain = gain;
                sliderPlaying = true;
                slider.disabled = false;
                playBtn.textContent = '⏹ Stop';
            }
        });

        // Initial display
        freqDisplay.textContent = 'Di = ' + slider.value + ' Hz';
    }

    // ----- Initialize -----
    function init() {
        bindTriggers();

        document.querySelectorAll('.tone-trigger').forEach(el => {
            const freq = parseFloat(el.getAttribute('data-frequency'));
            if (!isNaN(freq)) el.title = `${freq.toFixed(2)} Hz · click to play/stop`;
        });

        const volumeSlider = document.getElementById('master-volume');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                if (masterGain) {
                    masterGain.gain.value = parseFloat(e.target.value);
                }
            });
        }



        const presetBtn = document.getElementById('pl_D_Ni');
        if (presetBtn) {
            presetBtn.addEventListener('click', () => {
                // 1. Get the current slider frequency
                const slider = document.getElementById('freq-slider');
                const sliderFreq = slider ? parseFloat(slider.value) : 440;

                //IXOS PL. D BASIS NI
                const moria12 = 12;
                const moria10 = 10;
                const moria18 = 8;

                const moriaInCents_1 = 1200 / 72;

                const moriaInCents_12 = moriaInCents_1 * moria12;
                const moriaInCents_10 = moriaInCents_1 * moria10;
                const moriaInCents_8 = moriaInCents_1 * moria18;

                //dieseis and ifeseis CENTS
                const dieseis_ifeseis_2 = 2 * moriaInCents_1;
                const dieseis_ifeseis_4 = 4 * moriaInCents_1;
                const dieseis_ifeseis_6 = 6 * moriaInCents_1;
                const dieseis_ifeseis_8 = 8 * moriaInCents_1;


                const getCents = (freq, ref = sliderFreq) => 1200 * Math.log2(freq / ref);
                const cents = getCents(sliderFreq);

                const getHzFromCents = (cents, ref = sliderFreq) => ref * 2 ** (cents / 1200);
                const ni = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10 + moriaInCents_12), sliderFreq);
                const pa = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10), sliderFreq);
                const vou = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8), sliderFreq);
                const gha = getHzFromCents(cents - (moriaInCents_12), sliderFreq);
                const dhi = getHzFromCents(cents);
                const ke = getHzFromCents(cents + (moriaInCents_12), sliderFreq);
                const zo = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10), sliderFreq);
                const ni_High = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10 + moriaInCents_8), sliderFreq);

                //dieseis and ifeseis CENTS in HZ
                const ni2 = getHzFromCents(cents - dieseis_ifeseis_2, sliderFreq);

                const diffHz = sliderFreq - ni2;


                // 2. Build the preset – use sliderFreq wherever you want.
                //    Example: first note of first row becomes the slider frequency.



                const customPreset = [
                    //ROW 1
                    [ni + (diffHz * 2), pa + (diffHz * 2), vou + (diffHz * 2), gha + (diffHz * 2), dhi + (diffHz * 2), ke + (diffHz * 2), zo + (diffHz * 2), ni_High + (diffHz * 2)],
                    //ROW 2
                    [ni + diffHz, pa + diffHz, vou + diffHz, gha + diffHz, dhi + diffHz, ke + diffHz, zo + diffHz, ni_High + diffHz],
                    //ROW 3
                    [ni, pa, vou, gha, dhi, ke, zo, ni_High],
                    //ROW 4
                    [ni - diffHz, pa - diffHz, vou - diffHz, gha - diffHz, dhi - diffHz, ke - diffHz, zo - diffHz, ni_High - diffHz],
                    //ROW 5
                    [ni - (diffHz * 2), pa - (diffHz * 2), vou - (diffHz * 2), gha - (diffHz * 2), dhi - (diffHz * 2), ke - (diffHz * 2), zo - (diffHz * 2), ni_High - (diffHz * 2)]


                ];
                applyMultiRowPreset(customPreset);

                // 3. Set images for martiria (unchanged)
                const dieseis_2 = './symbols/dieseis/dieseis2.png';
                const dieseis_4 = './symbols/dieseis/dieseis4.png';

                const ifeseis_2 = './symbols/ifeseis/ifeseis2.png';
                const ifeseis_4 = './symbols/ifeseis/ifeseis4.png';

                const diatonicNI = './symbols/diatonic/diatonicNI.png';
                const diatonicPA = './symbols/diatonic/diatonicPA.png';
                const diatonicVOU = './symbols/diatonic/diatonicVOU.png';
                const diatonicGHA = './symbols/diatonic/diatonicGHA.png';
                const diatonicDI = './symbols/diatonic/diatonicDI.png';
                const diatonicKE = './symbols/diatonic/diatonicKE.png';
                const diatonicZO = './symbols/diatonic/diatonicZO.png';
                const diatonicNI_1 = './symbols/diatonic/diatonicNI_1.png';



                // ROW 1

                setCenterImage(1, 1, dieseis_4);
                setCenterImage(1, 2, dieseis_4);
                setCenterImage(1, 3, dieseis_4);
                setCenterImage(1, 4, dieseis_4);
                setCenterImage(1, 5, dieseis_4);
                setCenterImage(1, 6, dieseis_4);
                setCenterImage(1, 7, dieseis_4);
                setCenterImage(1, 8, dieseis_4);

                // ROW 2
                setCenterImage(2, 1, dieseis_2);
                setCenterImage(2, 2, dieseis_2);
                setCenterImage(2, 3, dieseis_2);
                setCenterImage(2, 4, dieseis_2);
                setCenterImage(2, 5, dieseis_2);
                setCenterImage(2, 6, dieseis_2);
                setCenterImage(2, 7, dieseis_2);
                setCenterImage(2, 8, dieseis_2);

                // ROW 3
                setCenterImage(3, 1, diatonicNI);
                setCenterImage(3, 2, diatonicPA);
                setCenterImage(3, 3, diatonicVOU);
                setCenterImage(3, 4, diatonicGHA);
                setCenterImage(3, 5, diatonicDI);
                setCenterImage(3, 6, diatonicKE);
                setCenterImage(3, 7, diatonicZO);
                setCenterImage(3, 8, diatonicNI_1);
                //setCenterImage(3, 1, imageUrl);
                //setTopRightImage(3, 1, imageUrl);

                // ROW 4
                setCenterImage(4, 1, ifeseis_2);
                setCenterImage(4, 2, ifeseis_2);
                setCenterImage(4, 3, ifeseis_2);
                setCenterImage(4, 4, ifeseis_2);
                setCenterImage(4, 5, ifeseis_2);
                setCenterImage(4, 6, ifeseis_2);
                setCenterImage(4, 7, ifeseis_2);
                setCenterImage(4, 8, ifeseis_2);

                // ROW 5
                setCenterImage(5, 1, ifeseis_4);
                setCenterImage(5, 2, ifeseis_4);
                setCenterImage(5, 3, ifeseis_4);
                setCenterImage(5, 4, ifeseis_4);
                setCenterImage(5, 5, ifeseis_4);
                setCenterImage(5, 6, ifeseis_4);
                setCenterImage(5, 7, ifeseis_4);
                setCenterImage(5, 8, ifeseis_4);

            });
        }

        initSlider();
    }

    // Cleanup on unload
    window.addEventListener('beforeunload', () => {
        stopAllTones();
        if (audioContext && audioContext.state !== 'closed') {
            audioContext.close();
        }
    });

    init();
})();

// ------------------------------------------------------------
// YOUR CUSTOM CODE – safely added after the main IIFE
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    // New functions – accept row number, martiria index, and image URL
    window.setCenterImage = function (rowNumber, martiriaIndex, imageUrl) {
        // Find the row by its data-row attribute
        const row = document.querySelector(`.tone-grid[data-row="${rowNumber}"]`);
        if (!row) return;
        // Inside that row, find the container with the matching data-martiria
        const container = row.querySelector(`[data-martiria="${martiriaIndex}"]`);
        if (container) {
            const img = container.querySelector('.center-png');
            if (img) img.src = imageUrl;
        }
    };

    window.setTopRightImage = function (rowNumber, martiriaIndex, imageUrl) {
        const row = document.querySelector(`.tone-grid[data-row="${rowNumber}"]`);
        if (!row) return;
        const container = row.querySelector(`[data-martiria="${martiriaIndex}"]`);
        if (container) {
            const img = container.querySelector('.topright-png');
            if (img) img.src = imageUrl;
        }
    };



});

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Get all .martiria elements
    const martiriaElements = document.querySelectorAll('.martiria');

    // Function to remove 'active' class from all
    function deactivateAll() {
        martiriaElements.forEach(el => {
            el.classList.remove('active');
        });
    }

    // Add click listener to each
    martiriaElements.forEach(el => {
        el.addEventListener('click', function (e) {
            // Check if this element is already active (yellow)
            const isActive = this.classList.contains('active');

            if (isActive) {
                // If active, just remove its own active class (deselect)
                this.classList.remove('active');
            } else {
                // Otherwise, deactivate all others, then activate this one
                deactivateAll();
                this.classList.add('active');
            }
        });
    });
});