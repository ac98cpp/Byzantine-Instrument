// samples-config.js
const sampleProfiles = {
    melodos: [
        { url: './assets/audio-samples/melodos/g3.wav', baseHz: 195.997 },
        { url: './assets/audio-samples/melodos/gs3.wav', baseHz: 207.652 },
        { url: './assets/audio-samples/melodos/a3.wav', baseHz: 220.0 },
        { url: './assets/audio-samples/melodos/as3.wav', baseHz: 233.082 },
        { url: './assets/audio-samples/melodos/b3.wav', baseHz: 246.942 },
        { url: './assets/audio-samples/melodos/c4.wav', baseHz: 261.626 },
        { url: './assets/audio-samples/melodos/cs4.wav', baseHz: 277.183 },
        { url: './assets/audio-samples/melodos/d4.wav', baseHz: 293.665 },
        { url: './assets/audio-samples/melodos/ds4.wav', baseHz: 311.127 },
        { url: './assets/audio-samples/melodos/e4.wav', baseHz: 339.628 },
        { url: './assets/audio-samples/melodos/f4.wav', baseHz: 349.228 },
        { url: './assets/audio-samples/melodos/fs4.wav', baseHz: 369.994 },
        { url: './assets/audio-samples/melodos/g4.wav', baseHz: 391.995 },
        { url: './assets/audio-samples/melodos/gs4.wav', baseHz: 415.305 },
        { url: './assets/audio-samples/melodos/a4.wav', baseHz: 440.0 },
        { url: './assets/audio-samples/melodos/as4.wav', baseHz: 466.164 },
        { url: './assets/audio-samples/melodos/b4.wav', baseHz: 493.883 },
        { url: './assets/audio-samples/melodos/c5.wav', baseHz: 523.251 },
        { url: './assets/audio-samples/melodos/cs5.wav', baseHz: 554.365 },
        { url: './assets/audio-samples/melodos/d5.wav', baseHz: 587.330 },
        { url: './assets/audio-samples/melodos/ds5.wav', baseHz: 622.254 },
        { url: './assets/audio-samples/melodos/e5.wav', baseHz: 659.255 },
        { url: './assets/audio-samples/melodos/f5.wav', baseHz: 698.456 }
    ],
    piano: [
        // Example piano samples – replace with your actual piano files
        { url: './samples/piano/c3.wav', baseHz: 130.81 },
        { url: './samples/piano/d3.wav', baseHz: 146.83 },
        { url: './samples/piano/e3.wav', baseHz: 164.81 },
        { url: './samples/piano/f3.wav', baseHz: 174.61 },
        { url: './samples/piano/g3.wav', baseHz: 196.00 },
        { url: './samples/piano/a3.wav', baseHz: 220.00 },
        { url: './samples/piano/b3.wav', baseHz: 246.94 },
        { url: './samples/piano/c4.wav', baseHz: 261.63 },
        { url: './samples/piano/d4.wav', baseHz: 293.66 },
        { url: './samples/piano/e4.wav', baseHz: 329.63 },
        { url: './samples/piano/f4.wav', baseHz: 349.23 },
        { url: './samples/piano/g4.wav', baseHz: 392.00 },
        { url: './samples/piano/a4.wav', baseHz: 440.00 },
        { url: './samples/piano/b4.wav', baseHz: 493.88 },
        { url: './samples/piano/c5.wav', baseHz: 523.25 }
    ],
    // Add more profiles as needed (e.g., 'choir', 'organ', etc.)
};

// Make it globally available (or use ES modules if preferred)
window.sampleProfiles = sampleProfiles;