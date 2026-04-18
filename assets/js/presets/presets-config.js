// presets-config.js
const presets = [
    {
        id: 'pl_D_Ni',
        name: 'IXOS PL. D NI',
        calculateFrequencies: (sliderFreq) => {
            const moria12 = 12;
            const moria10 = 10;
            const moria18 = 8;
            const moriaInCents_1 = 1200 / 72;
            const moriaInCents_12 = moriaInCents_1 * moria12;
            const moriaInCents_10 = moriaInCents_1 * moria10;
            const moriaInCents_8 = moriaInCents_1 * moria18;
            const dieseis_ifeseis_2 = 2 * moriaInCents_1;

            const getCents = (freq, ref = sliderFreq) => 1200 * Math.log2(freq / ref);
            const cents = getCents(sliderFreq);
            const getHzFromCents = (cents, ref = sliderFreq) => ref * 2 ** (cents / 1200);

            const dhi_Low = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10 + moriaInCents_12 + moriaInCents_8 + moriaInCents_10 + moriaInCents_12), sliderFreq);
            const ke_Low = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10 + moriaInCents_12 + moriaInCents_8 + moriaInCents_10), sliderFreq);
            const zo_Low = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10 + moriaInCents_12 + moriaInCents_8), sliderFreq);
            const ni = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10 + moriaInCents_12), sliderFreq);
            const pa = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10), sliderFreq);
            const vou = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8), sliderFreq);
            const gha = getHzFromCents(cents - (moriaInCents_12), sliderFreq);
            const dhi = getHzFromCents(cents);
            const ke = getHzFromCents(cents + (moriaInCents_12), sliderFreq);
            const zo = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10), sliderFreq);
            const ni_High = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10 + moriaInCents_8), sliderFreq);
            const pa_High = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10 + moriaInCents_8 + moriaInCents_12), sliderFreq);
            const vou_High = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10 + moriaInCents_8 + moriaInCents_12 + moriaInCents_10), sliderFreq);
            const gha_High = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10 + moriaInCents_8) + moriaInCents_12 + moriaInCents_10 + moriaInCents_8, sliderFreq);

            const ni2 = getHzFromCents(cents - dieseis_ifeseis_2, sliderFreq);
            const diffHz = sliderFreq - ni2;

            return [
                [dhi_Low + (diffHz * 2), ke_Low + (diffHz * 2), zo_Low + (diffHz * 2), ni + (diffHz * 2), pa + (diffHz * 2), vou + (diffHz * 2), gha + (diffHz * 2), dhi + (diffHz * 2), ke + (diffHz * 2), zo + (diffHz * 2), ni_High + (diffHz * 2), pa_High + (diffHz * 2), vou_High + (diffHz * 2), gha_High + (diffHz * 2)],
                [dhi_Low + diffHz, ke_Low + diffHz, zo_Low + diffHz, ni + diffHz, pa + diffHz, vou + diffHz, gha + diffHz, dhi + diffHz, ke + diffHz, zo + diffHz, ni_High + diffHz, pa_High + diffHz, vou_High + diffHz, gha_High + diffHz],
                [dhi_Low, ke_Low, zo_Low, ni, pa, vou, gha, dhi, ke, zo, ni_High, pa_High, vou_High, gha_High],
                [dhi_Low - diffHz, ke_Low - diffHz, zo_Low - diffHz, ni - diffHz, pa - diffHz, vou - diffHz, gha - diffHz, dhi - diffHz, ke - diffHz, zo - diffHz, ni_High - diffHz, pa_High - diffHz, vou_High - diffHz, gha_High - diffHz],
                [dhi_Low - (diffHz * 2), ke_Low - (diffHz * 2), zo_Low - (diffHz * 2), ni - (diffHz * 2), pa - (diffHz * 2), vou - (diffHz * 2), gha - (diffHz * 2), dhi - (diffHz * 2), ke - (diffHz * 2), zo - (diffHz * 2), ni_High - (diffHz * 2), pa_High - (diffHz * 2), vou_High - (diffHz * 2), gha_High - (diffHz * 2)]
            ];
        },
        imageMap: [
            // Row 1 – all 8 columns get dieseis_4

            // Row 2 – all 8 columns get dieseis_2

            // Row 3 – each column gets a specific diatonic symbol
            { row: 3, columns: [1], image: './assets/symbols/ichos/pl-d/ni/bNi_diL.png' },
            { row: 3, columns: [2], image: './assets/symbols/ichos/pl-d/ni/bNi_keL.png' },
            { row: 3, columns: [3], image: './assets/symbols/ichos/pl-d/ni/bNi_zoL.png' },
            { row: 3, columns: [4], image: './assets/symbols/ichos/pl-d/ni/bNi_ni.png' },
            { row: 3, columns: [5], image: './assets/symbols/ichos/pl-d/ni/bNi_pa.png' },
            { row: 3, columns: [6], image: './assets/symbols/ichos/pl-d/ni/bNi_vou.png' },
            { row: 3, columns: [7], image: './assets/symbols/ichos/pl-d/ni/bNi_gha.png' },
            { row: 3, columns: [8], image: './assets/symbols/ichos/pl-d/ni/bNi_di.png' },
            { row: 3, columns: [9], image: './assets/symbols/ichos/pl-d/ni/bNi_ke.png' },
            { row: 3, columns: [10], image: './assets/symbols/ichos/pl-d/ni/bNi_zoH.png' },
            { row: 3, columns: [11], image: './assets/symbols/ichos/pl-d/ni/bNi_niH.png' },
            { row: 3, columns: [12], image: './assets/symbols/ichos/pl-d/ni/bNi_paH.png' },
            { row: 3, columns: [13], image: './assets/symbols/ichos/pl-d/ni/bNi_vouH.png' },
            { row: 3, columns: [14], image: './assets/symbols/ichos/pl-d/ni/bNi_ghaH.png' }
            // Row 4 – all 8 columns get ifeseis_2

            // Row 5 – all 8 columns get ifeseis_4

        ],
        cornerMap: [
            // Row 1 – all 8 columns get dieseis_4
            { row: 1, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: './assets/symbols/dieseis/dieseis4.png' },
            // Row 2 – all 8 columns get dieseis_2
            { row: 2, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: './assets/symbols/dieseis/dieseis2.png' },
            // Row 3 – each column gets a specific diatonic symbol
            { row: 3, columns: [4], image: './assets/symbols/martiria/diatonicNIlow.png' },

            // Row 4 – all 8 columns get ifeseis_2
            { row: 4, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: './assets/symbols/ifeseis/ifeseis2.png' },
            // Row 5 – all 8 columns get ifeseis_4
            { row: 5, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: './assets/symbols/ifeseis/ifeseis4.png' }
        ]

    },
    {
        id: 'pl_D_Gha',
        name: 'IXOS PL. D GhaNi',
        calculateFrequencies: (sliderFreq) => {
            const moria12 = 12;
            const moria10 = 10;
            const moria18 = 8;
            const moriaInCents_1 = 1200 / 72;
            const moriaInCents_12 = moriaInCents_1 * moria12;
            const moriaInCents_10 = moriaInCents_1 * moria10;
            const moriaInCents_8 = moriaInCents_1 * moria18;
            const dieseis_ifeseis_2 = 2 * moriaInCents_1;

            const getCents = (freq, ref = sliderFreq) => 1200 * Math.log2(freq / ref);
            const cents = getCents(sliderFreq);
            const getHzFromCents = (cents, ref = sliderFreq) => ref * 2 ** (cents / 1200);

            const dhi_Low = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10 + moriaInCents_12 + moriaInCents_8 + moriaInCents_10 + moriaInCents_12), sliderFreq);
            const ke_Low = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10 + moriaInCents_12 + moriaInCents_8 + moriaInCents_10), sliderFreq);
            const zo_Low = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10 + moriaInCents_12 + moriaInCents_8), sliderFreq);
            const ni = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10 + moriaInCents_12), sliderFreq);
            const pa = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8 + moriaInCents_10), sliderFreq);
            const vou = getHzFromCents(cents - (moriaInCents_12 + moriaInCents_8), sliderFreq);
            const gha = getHzFromCents(cents - (moriaInCents_12), sliderFreq);
            const dhi = getHzFromCents(cents);
            const ke = getHzFromCents(cents + (moriaInCents_12), sliderFreq);
            const zo = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10), sliderFreq);
            const ni_High = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10 + moriaInCents_8), sliderFreq);
            const pa_High = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10 + moriaInCents_8 + moriaInCents_12), sliderFreq);
            const vou_High = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10 + moriaInCents_8 + moriaInCents_12 + moriaInCents_10), sliderFreq);
            const gha_High = getHzFromCents(cents + (moriaInCents_12 + moriaInCents_10 + moriaInCents_8) + moriaInCents_12 + moriaInCents_10 + moriaInCents_8, sliderFreq);

            const ni2 = getHzFromCents(cents - dieseis_ifeseis_2, sliderFreq);
            const diffHz = sliderFreq - ni2;

            return [
                [dhi_Low + (diffHz * 2), ke_Low + (diffHz * 2), zo_Low + (diffHz * 2), ni + (diffHz * 2), pa + (diffHz * 2), vou + (diffHz * 2), gha + (diffHz * 2), dhi + (diffHz * 2), ke + (diffHz * 2), zo + (diffHz * 2), ni_High + (diffHz * 2), pa_High + (diffHz * 2), vou_High + (diffHz * 2), gha_High + (diffHz * 2)],
                [dhi_Low + diffHz, ke_Low + diffHz, zo_Low + diffHz, ni + diffHz, pa + diffHz, vou + diffHz, gha + diffHz, dhi + diffHz, ke + diffHz, zo + diffHz, ni_High + diffHz, pa_High + diffHz, vou_High + diffHz, gha_High + diffHz],
                [dhi_Low, ke_Low, zo_Low, ni, pa, vou, gha, dhi, ke, zo, ni_High, pa_High, vou_High, gha_High],
                [dhi_Low - diffHz, ke_Low - diffHz, zo_Low - diffHz, ni - diffHz, pa - diffHz, vou - diffHz, gha - diffHz, dhi - diffHz, ke - diffHz, zo - diffHz, ni_High - diffHz, pa_High - diffHz, vou_High - diffHz, gha_High - diffHz],
                [dhi_Low - (diffHz * 2), ke_Low - (diffHz * 2), zo_Low - (diffHz * 2), ni - (diffHz * 2), pa - (diffHz * 2), vou - (diffHz * 2), gha - (diffHz * 2), dhi - (diffHz * 2), ke - (diffHz * 2), zo - (diffHz * 2), ni_High - (diffHz * 2), pa_High - (diffHz * 2), vou_High - (diffHz * 2), gha_High - (diffHz * 2)]
            ];
        },
        imageMap: [
            // Row 1 – all 8 columns get dieseis_4
            { row: 1, columns: [3], image: './assets/symbols/ichos/pl-d/gha/bGha_zoL.png' },
            // Row 2 – all 8 columns get dieseis_2

            { row: 2, columns: [2], image: './assets/symbols/ichos/pl-d/gha/bGha_keL.png' },

            // Row 3 – each column gets a specific diatonic symbol
            { row: 3, columns: [1], image: './assets/symbols/ichos/pl-d/gha/bGha_diL.png' },
            { row: 3, columns: [4], image: './assets/symbols/ichos/pl-d/gha/bGha_ni.png' },
            { row: 3, columns: [5], image: './assets/symbols/ichos/pl-d/gha/bGha_pa.png' },
            { row: 3, columns: [6], image: './assets/symbols/ichos/pl-d/gha/bGha_vou.png' },
            { row: 3, columns: [7], image: './assets/symbols/ichos/pl-d/gha/bGha_gha.png' },
            { row: 3, columns: [8], image: './assets/symbols/ichos/pl-d/gha/bGha_di.png' },
            { row: 3, columns: [11], image: './assets/symbols/ichos/pl-d/gha/bGha_niH.png' },
            { row: 3, columns: [12], image: './assets/symbols/ichos/pl-d/gha/bGha_paH.png' },
            { row: 3, columns: [13], image: './assets/symbols/ichos/pl-d/gha/bGha_vouH.png' },
            { row: 3, columns: [14], image: './assets/symbols/ichos/pl-d/gha/bGha_ghaH.png' },

            // Row 4 – all 8 columns get ifeseis_2
            { row: 4, columns: [9], image: './assets/symbols/ichos/pl-d/gha/bGha_ke.png' },
            // Row 5 – all 8 columns get ifeseis_4
            { row: 5, columns: [10], image: './assets/symbols/ichos/pl-d/gha/bGha_zoH.png' }
        ],
        cornerMap: [
            // Row 1 – all 8 columns get dieseis_4
            { row: 1, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: './assets/symbols/dieseis/dieseis4.png' },
            // Row 2 – all 8 columns get dieseis_2
            { row: 2, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: './assets/symbols/dieseis/dieseis2.png' },
            // Row 3 – each column gets a specific diatonic symbol
            { row: 3, columns: [7], image: './assets/symbols/martiria/diatonicNIlow.png' },

            // Row 4 – all 8 columns get ifeseis_2
            { row: 4, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: './assets/symbols/ifeseis/ifeseis2.png' },
            // Row 5 – all 8 columns get ifeseis_4
            { row: 5, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: './assets/symbols/ifeseis/ifeseis4.png' }
        ]

    }
    // ========== ADD MORE PRESETS BELOW ==========
    // Example:
    // {
    //     id: 'pl_A_Pa',
    //     name: 'IXOS PL. A PA',
    //     calculateFrequencies: (sliderFreq) => { ... },
    //     imageMap: [ ... ]
    // }
];


// Make available globally
window.presets = presets;