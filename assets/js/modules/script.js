(function () {
    "use strict";

    // Strart centered
    function centerScroll(wrapperSelector) {
        const wrapper = document.querySelector(wrapperSelector);
        if (!wrapper) return;
        const container = wrapper.querySelector('.scale-container');
        if (!container) return;

        // Total scrollable width = container width - wrapper width
        const scrollWidth = container.scrollWidth - wrapper.clientWidth;
        if (scrollWidth > 0) {
            wrapper.scrollLeft = scrollWidth / 2;
        }
    }

    // Run on load and resize
    window.addEventListener('load', () => centerScroll('.scale-wrapper'));
    window.addEventListener('resize', () => centerScroll('.scale-wrapper'));

    // =========================================================================
    //  SAMPLE PLAYBACK STATE
    // =========================================================================
    let currentProfile = 'melodos';                // default profile name
    let currentSamples = [];                     // array of {url, baseHz} for active profile
    let loadedBuffers = {};                      // keyed by baseHz
    let samplesReady = false;

    // =========================================================================
    //  WEB AUDIO STATE
    // =========================================================================
    let audioContext = null;
    let masterGain = null;
    const FADE_SECONDS = 0.008;

    let activeElement = null;      // trigger div currently playing
    let activeOsc = null;          // holds BufferSource or Oscillator
    let activeGain = null;

    // Slider mode state
    let sliderOsc = null;
    let sliderGain = null;
    let sliderPlaying = false;

    // ----- High‑frequency cut compensation (flat response) -----
    function getLoudnessCompensation(freq) {
        return 1.0;
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
            const source = activeOsc;
            const gain = activeGain;
            if (gain && audioContext && audioContext.state !== 'closed') {
                const now = audioContext.currentTime;
                gain.gain.cancelScheduledValues(now);
                gain.gain.setValueAtTime(gain.gain.value, now);
                gain.gain.linearRampToValueAtTime(0.0, now + FADE_SECONDS);
                if (source) {
                    try { source.stop(now + FADE_SECONDS + 0.005); } catch (e) { }
                }
                setTimeout(() => {
                    try { source.disconnect(); } catch (e) { }
                    try { gain.disconnect(); } catch (e) { }
                }, (FADE_SECONDS + 0.01) * 1000);
            } else {
                if (source) {
                    try { source.stop(); } catch (e) { }
                    try { source.disconnect(); } catch (e) { }
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

    // ----- Legacy alias -----
    function stopCurrentTone() {
        stopAllTones();
    }

    // =========================================================================
    //  SAMPLE LOADING (PROFILE SWITCHING)
    // =========================================================================
    async function loadProfile(profileName) {
        if (!ensureContext()) return;

        // Get samples array from global config (window.sampleProfiles)
        const profiles = window.sampleProfiles;
        if (!profiles || !profiles[profileName]) {
            console.error(`Profile "${profileName}" not found.`);
            return;
        }

        // Stop any playback before switching
        stopAllTones();

        // Set new profile
        currentProfile = profileName;
        currentSamples = profiles[profileName];
        loadedBuffers = {};
        samplesReady = false;

        // Optional status element update
        const statusEl = document.getElementById('status');
        if (statusEl) statusEl.textContent = `Loading ${profileName} samples...`;

        try {
            const loadPromises = currentSamples.map(async (sample) => {
                const response = await fetch(sample.url);
                if (!response.ok) throw new Error(`Failed to fetch ${sample.url}`);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                loadedBuffers[sample.baseHz] = audioBuffer;
            });
            await Promise.all(loadPromises);
            samplesReady = true;
            console.log(`Profile "${profileName}" loaded.`);
            if (statusEl) statusEl.textContent = `Ready (${profileName})`;
        } catch (e) {
            console.error('Failed to load samples:', e);
            if (statusEl) statusEl.textContent = `Error loading ${profileName}`;
            samplesReady = false;
        }
    }

    // ----- Find closest sample (logarithmic pitch comparison) -----
    function getBestSample(targetHz) {
        return currentSamples.reduce((prev, curr) => {
            return Math.abs(Math.log2(targetHz / curr.baseHz)) <
                Math.abs(Math.log2(targetHz / prev.baseHz))
                ? curr
                : prev;
        });
    }

    // ----- Start tone for a trigger element (uses vocal/instrument samples) -----
    function startToneForElement(el) {
        if (!ensureContext() || !samplesReady) {
            console.warn('Samples not ready yet.');
            return;
        }

        const freqAttr = el.getAttribute('data-frequency');
        const targetFreq = freqAttr ? parseFloat(freqAttr) : 0;
        if (isNaN(targetFreq)) return;

        // If same element is already playing, stop it
        if (activeElement === el) {
            stopAllTones();
            return;
        }

        // Stop any currently playing tone
        stopAllTones();

        // 1. Find best sample and its buffer
        const bestSample = getBestSample(targetFreq);
        const buffer = loadedBuffers[bestSample.baseHz];
        if (!buffer) {
            console.error(`Buffer missing for ${bestSample.baseHz} Hz`);
            return;
        }

        // 2. Create source and gain nodes
        const source = audioContext.createBufferSource();
        const gain = audioContext.createGain();

        source.buffer = buffer;
        source.loop = true;
        source.playbackRate.value = targetFreq / bestSample.baseHz;

        // 3. Apply loudness compensation
        const compensation = getLoudnessCompensation(targetFreq);

        // 4. Connect: source -> gain -> masterGain -> destination
        source.connect(gain);
        gain.connect(masterGain);

        // 5. Fade in
        const now = audioContext.currentTime;
        gain.gain.setValueAtTime(0.0, now);
        gain.gain.linearRampToValueAtTime(compensation, now + FADE_SECONDS);

        // 6. Start playback
        source.start();

        // 7. Store references for later stopping
        activeElement = el;
        activeOsc = source;
        activeGain = gain;

        console.log(`Playing ${targetFreq.toFixed(2)} Hz using ${bestSample.baseHz} Hz sample.`);
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

    // =========================================================================
    //  SLIDER LOGIC (sine wave – unchanged)
    // =========================================================================
    function initSlider() {
        const slider = document.getElementById('freq-slider');
        const playBtn = document.getElementById('slider-play-btn');
        const freqDisplay = document.getElementById('freq-display');

        if (!slider || !playBtn || !freqDisplay) return;

        // Customize these values as needed
        const SLIDER_MIN = 261.6255653005986;
        const SLIDER_MAX = 523.2511306011972;
        const SLIDER_STEP = 0.1;
        const SLIDER_DEFAULT = 391.99543598174927;

        slider.min = SLIDER_MIN;
        slider.max = SLIDER_MAX;
        slider.step = SLIDER_STEP;
        slider.value = SLIDER_DEFAULT;
        freqDisplay.textContent = SLIDER_DEFAULT + ' Hz';

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

        freqDisplay.textContent = 'Di = ' + slider.value + ' Hz';
    }

    // =========================================================================
    //  PRESET BUTTONS (loaded from external config)
    // =========================================================================
    function initPresetButtons() {
        if (!window.presets || !Array.isArray(window.presets)) {
            console.warn('No presets found.');
            return;
        }

        window.presets.forEach(preset => {
            const btn = document.getElementById(preset.id);
            if (!btn) {
                console.warn(`Button with id "${preset.id}" not found.`);
                return;
            }

            btn.addEventListener('click', () => {
                // Get current slider frequency
                const slider = document.getElementById('freq-slider');
                const sliderFreq = slider ? parseFloat(slider.value) : 440;

                // Calculate frequencies for this preset
                const frequencies = preset.calculateFrequencies(sliderFreq);
                applyMultiRowPreset(frequencies);

                // Reset all images first
                const NO_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
                document.querySelectorAll('.martiria .center-png, .martiria .topright-png').forEach(img => img.src = NO_IMAGE);

                document.querySelectorAll('.martiria').forEach(el => {
                    el.style.backgroundColor = 'rgb(231, 231, 231)';
                });

                // Apply images
                preset.imageMap.forEach(entry => {
                    const row = entry.row;
                    const imageUrl = entry.image;

                    entry.columns.forEach(col => {
                        if (typeof window.setCenterImage === 'function') {
                            window.setCenterImage(row, col, imageUrl);
                        }
                    });
                });

                // Apply images
                preset.cornerMap.forEach(entry => {
                    const row = entry.row;
                    const imageUrl = entry.image;
                    entry.columns.forEach(col => {
                        if (typeof window.setTopRightImage === 'function') {
                            window.setTopRightImage(row, col, imageUrl);
                        }
                    });
                });

                // Apply colors
                preset.colorsPads.forEach(entry => {
                    const row = entry.row;
                    const color = entry.color;
                    entry.columns.forEach(col => {
                        if (typeof window.setMartiriaBackgroundColor === 'function') {
                            window.setMartiriaBackgroundColor(row, col, color);
                        }
                    });
                });
            });
        });
    }

    // =========================================================================
    //  INITIALIZATION
    // =========================================================================
    async function init() {
        if (!ensureContext()) return;

        // Load default profile (voice)
        await loadProfile(currentProfile);

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

        // Initialize preset buttons from external config
        initPresetButtons();

        initSlider();

        // Instrument dropdown handler
        const instrumentSelect = document.getElementById('instrument-select');
        if (instrumentSelect) {
            instrumentSelect.addEventListener('change', async (e) => {
                const newProfile = e.target.value;
                await loadProfile(newProfile);
            });
        }
    }

    // =========================================================================
    //  CLEANUP
    // =========================================================================
    window.addEventListener('beforeunload', () => {
        stopAllTones();
        if (audioContext && audioContext.state !== 'closed') {
            audioContext.close();
        }
    });

    init().catch(console.error);

})();

// ------------------------------------------------------------
//  CUSTOM IMAGE & MARTIRIA FUNCTIONS (outside IIFE)
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    window.setCenterImage = function (rowNumber, martiriaIndex, imageUrl) {
        const row = document.querySelector(`.tone-grid[data-row="${rowNumber}"]`);
        if (!row) return;
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

    window.setMartiriaBackgroundColor = function (rowNumber, martiriaIndex, color) {
        const row = document.querySelector(`.tone-grid[data-row="${rowNumber}"]`);
        if (!row) return;
        const container = row.querySelector(`[data-martiria="${martiriaIndex}"]`);
        if (container) {
            container.style.backgroundColor = color;   // ← sets background color
        }
    };

    // Martiria active‑state toggling
    const martiriaElements = document.querySelectorAll('.martiria, martiria-outside');
    function deactivateAll() {
        martiriaElements.forEach(el => el.classList.remove('active'));
    }
    martiriaElements.forEach(el => {
        el.addEventListener('click', function (e) {
            const isActive = this.classList.contains('active');
            if (isActive) {
                this.classList.remove('active');
            } else {
                deactivateAll();
                this.classList.add('active');
            }
        });
    });


});