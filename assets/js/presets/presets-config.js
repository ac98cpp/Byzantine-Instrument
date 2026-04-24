
// Colors
const PRIMARY_COLOR = 'rgb(231, 231, 231)';
const HIGHLIGHT_COLOR = '#ff990033';
const SECONDARY_COLOR = 'rgb(187, 173, 173)';
const OUTSIDE_COLOR = 'rgb(151, 153, 161)';

// Paths
const path_dieseis_plus_2 = './assets/symbols/dieseis/dieseis2.png';
const path_dieseis_plus_4 = './assets/symbols/dieseis/dieseis4.png';
const path_ifeseis_minus_2 = './assets/symbols/ifeseis/ifeseis2.png';
const path_ifeseis_minus_4 = './assets/symbols/ifeseis/ifeseis4.png';

const path_pl_D_Ni = './assets/symbols/ichos/pl-d/ni/bNi_';
const path_pl_D_Gha = './assets/symbols/ichos/pl-d/gha/bGha_';
const path_ichos_b_di_soft_chromatic = './assets/symbols/ichos/b/di-soft-chromatic/bDi_SC_';
const path_pl_B_Pa_hard_chromatic = './assets/symbols/ichos/pl-b/pa-hard-chromatic/bPa_HC_';
const path_ichos_g_Gha = './assets/symbols/ichos/g/gha/enharmonic_';

const presets = [
    {
        id: 'pl_D_Ni',
        name: 'IXOS PL. D NI',
        calculateFrequencies: (sliderFreq) => {

            const frequency_moria_12 = 2 ** ((16.66666667 * 12) / 1200);
            const frequency_moria_10 = 2 ** ((16.66666667 * 10) / 1200);
            const frequency_moria_8 = 2 ** ((16.66666667 * 8) / 1200);

            const dieseis_ifeseis_2 = 2 ** ((16.66666667 * 2) / 1200);
            const dieseis_ifeseis_4 = 2 ** ((16.66666667 * 4) / 1200);

            const dhi_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const ke_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const zo_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8;
            const ni = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const pa = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const vou = sliderFreq / frequency_moria_12 / frequency_moria_8;
            const gha = sliderFreq / frequency_moria_12;
            const dhi = sliderFreq;
            const ke = sliderFreq * frequency_moria_12;
            const zo = sliderFreq * frequency_moria_12 * frequency_moria_10;
            const ni_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;
            const pa_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12;
            const vou_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10;
            const gha_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;

            return [
                [dhi_Low * dieseis_ifeseis_4, ke_Low * dieseis_ifeseis_4, zo_Low * dieseis_ifeseis_4, ni * dieseis_ifeseis_4, pa * dieseis_ifeseis_4, vou * dieseis_ifeseis_4, gha * dieseis_ifeseis_4, dhi * dieseis_ifeseis_4, ke * dieseis_ifeseis_4, zo * dieseis_ifeseis_4, ni_High * dieseis_ifeseis_4, pa_High * dieseis_ifeseis_4, vou_High * dieseis_ifeseis_4, gha_High * dieseis_ifeseis_4],
                [dhi_Low * dieseis_ifeseis_2, ke_Low * dieseis_ifeseis_2, zo_Low * dieseis_ifeseis_2, ni * dieseis_ifeseis_2, pa * dieseis_ifeseis_2, vou * dieseis_ifeseis_2, gha * dieseis_ifeseis_2, dhi * dieseis_ifeseis_2, ke * dieseis_ifeseis_2, zo * dieseis_ifeseis_2, ni_High * dieseis_ifeseis_2, pa_High * dieseis_ifeseis_2, vou_High * dieseis_ifeseis_2, gha_High * dieseis_ifeseis_2],
                [dhi_Low, ke_Low, zo_Low, ni, pa, vou, gha, dhi, ke, zo, ni_High, pa_High, vou_High, gha_High],
                [dhi_Low / dieseis_ifeseis_2, ke_Low / dieseis_ifeseis_2, zo_Low / dieseis_ifeseis_2, ni / dieseis_ifeseis_2, pa / dieseis_ifeseis_2, vou / dieseis_ifeseis_2, gha / dieseis_ifeseis_2, dhi / dieseis_ifeseis_2, ke / dieseis_ifeseis_2, zo / dieseis_ifeseis_2, ni_High / dieseis_ifeseis_2, pa_High / dieseis_ifeseis_2, vou_High / dieseis_ifeseis_2, gha_High / dieseis_ifeseis_2],
                [dhi_Low / dieseis_ifeseis_4, ke_Low / dieseis_ifeseis_4, zo_Low / dieseis_ifeseis_4, ni / dieseis_ifeseis_4, pa / dieseis_ifeseis_4, vou / dieseis_ifeseis_4, gha / dieseis_ifeseis_4, dhi / dieseis_ifeseis_4, ke / dieseis_ifeseis_4, zo / dieseis_ifeseis_4, ni_High / dieseis_ifeseis_4, pa_High / dieseis_ifeseis_4, vou_High / dieseis_ifeseis_4, gha_High / dieseis_ifeseis_4]
            ];
        },
        imageMap: [
            // Row 1 – all 8 columns get dieseis_4

            // Row 2 – all 8 columns get dieseis_2

            // Row 3 – each column gets a specific diatonic symbol
            { row: 3, columns: [1], image: path_pl_D_Ni + 'diL.png' },
            { row: 3, columns: [2], image: path_pl_D_Ni + 'keL.png' },
            { row: 3, columns: [3], image: path_pl_D_Ni + 'zoL.png' },
            { row: 3, columns: [4], image: path_pl_D_Ni + 'ni.png' },
            { row: 3, columns: [5], image: path_pl_D_Ni + 'pa.png' },
            { row: 3, columns: [6], image: path_pl_D_Ni + 'vou.png' },
            { row: 3, columns: [7], image: path_pl_D_Ni + 'gha.png' },
            { row: 3, columns: [8], image: path_pl_D_Ni + 'di.png' },
            { row: 3, columns: [9], image: path_pl_D_Ni + 'ke.png' },
            { row: 3, columns: [10], image: path_pl_D_Ni + 'zoH.png' },
            { row: 3, columns: [11], image: path_pl_D_Ni + 'niH.png' },
            { row: 3, columns: [12], image: path_pl_D_Ni + 'paH.png' },
            { row: 3, columns: [13], image: path_pl_D_Ni + 'vouH.png' },
            { row: 3, columns: [14], image: path_pl_D_Ni + 'ghaH.png' }
            // Row 4 – all 8 columns get ifeseis_2

            // Row 5 – all 8 columns get ifeseis_4

        ],
        cornerMap: [
            // Row 1 – all 8 columns get dieseis_4
            { row: 1, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_4 },
            // Row 2 – all 8 columns get dieseis_2
            { row: 2, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_2 },
            // Row 3 – each column gets a specific diatonic symbol
            { row: 3, columns: [4], image: './assets/symbols/martiria/diatonicNIlow.png' },

            // Row 4 – all 8 columns get ifeseis_2
            { row: 4, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_2 },
            // Row 5 – all 8 columns get ifeseis_4
            { row: 5, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_4 }
        ],
        colorsPads: [
            // Row 1 
            { row: 1, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 1, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 2 
            { row: 2, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 2, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 3
            { row: 3, columns: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], color: PRIMARY_COLOR },
            { row: 3, columns: [4], color: HIGHLIGHT_COLOR },

            { row: 4, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 4, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 2 
            { row: 5, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 5, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
        ]

    },
    {
        id: 'pl_D_Gha',
        name: 'IXOS PL. D GhaNi',
        calculateFrequencies: (sliderFreq) => {

            const frequency_moria_12 = 2 ** ((16.66666667 * 12) / 1200);
            const frequency_moria_10 = 2 ** ((16.66666667 * 10) / 1200);
            const frequency_moria_8 = 2 ** ((16.66666667 * 8) / 1200);

            const dieseis_ifeseis_2 = 2 ** ((16.66666667 * 2) / 1200);
            const dieseis_ifeseis_4 = 2 ** ((16.66666667 * 4) / 1200);

            const dhi_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const ke_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const zo_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8;
            const ni = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const pa = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const vou = sliderFreq / frequency_moria_12 / frequency_moria_8;
            const gha = sliderFreq / frequency_moria_12;
            const dhi = sliderFreq;
            const ke = sliderFreq * frequency_moria_12;
            const zo = sliderFreq * frequency_moria_12 * frequency_moria_10;
            const ni_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;
            const pa_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12;
            const vou_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10;
            const gha_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;

            return [
                [dhi_Low * dieseis_ifeseis_4, ke_Low * dieseis_ifeseis_4, zo_Low * dieseis_ifeseis_4, ni * dieseis_ifeseis_4, pa * dieseis_ifeseis_4, vou * dieseis_ifeseis_4, gha * dieseis_ifeseis_4, dhi * dieseis_ifeseis_4, ke * dieseis_ifeseis_4, zo * dieseis_ifeseis_4, ni_High * dieseis_ifeseis_4, pa_High * dieseis_ifeseis_4, vou_High * dieseis_ifeseis_4, gha_High * dieseis_ifeseis_4],
                [dhi_Low * dieseis_ifeseis_2, ke_Low * dieseis_ifeseis_2, zo_Low * dieseis_ifeseis_2, ni * dieseis_ifeseis_2, pa * dieseis_ifeseis_2, vou * dieseis_ifeseis_2, gha * dieseis_ifeseis_2, dhi * dieseis_ifeseis_2, ke * dieseis_ifeseis_2, zo * dieseis_ifeseis_2, ni_High * dieseis_ifeseis_2, pa_High * dieseis_ifeseis_2, vou_High * dieseis_ifeseis_2, gha_High * dieseis_ifeseis_2],
                [dhi_Low, ke_Low, zo_Low, ni, pa, vou, gha, dhi, ke, zo, ni_High, pa_High, vou_High, gha_High],
                [dhi_Low / dieseis_ifeseis_2, ke_Low / dieseis_ifeseis_2, zo_Low / dieseis_ifeseis_2, ni / dieseis_ifeseis_2, pa / dieseis_ifeseis_2, vou / dieseis_ifeseis_2, gha / dieseis_ifeseis_2, dhi / dieseis_ifeseis_2, ke / dieseis_ifeseis_2, zo / dieseis_ifeseis_2, ni_High / dieseis_ifeseis_2, pa_High / dieseis_ifeseis_2, vou_High / dieseis_ifeseis_2, gha_High / dieseis_ifeseis_2],
                [dhi_Low / dieseis_ifeseis_4, ke_Low / dieseis_ifeseis_4, zo_Low / dieseis_ifeseis_4, ni / dieseis_ifeseis_4, pa / dieseis_ifeseis_4, vou / dieseis_ifeseis_4, gha / dieseis_ifeseis_4, dhi / dieseis_ifeseis_4, ke / dieseis_ifeseis_4, zo / dieseis_ifeseis_4, ni_High / dieseis_ifeseis_4, pa_High / dieseis_ifeseis_4, vou_High / dieseis_ifeseis_4, gha_High / dieseis_ifeseis_4]
            ];
        },
        imageMap: [
            // Row 1 

            // Row 2 

            // Row 3 
            { row: 3, columns: [1], image: path_pl_D_Gha + 'diL.png' },
            { row: 3, columns: [4], image: path_pl_D_Gha + 'ni.png' },
            { row: 3, columns: [5], image: path_pl_D_Gha + 'pa.png' },
            { row: 3, columns: [6], image: path_pl_D_Gha + 'vou.png' },
            { row: 3, columns: [7], image: path_pl_D_Gha + 'gha.png' },
            { row: 3, columns: [8], image: path_pl_D_Gha + 'di.png' },
            { row: 3, columns: [11], image: path_pl_D_Gha + 'niH.png' },
            { row: 3, columns: [12], image: path_pl_D_Gha + 'paH.png' },
            { row: 3, columns: [13], image: path_pl_D_Gha + 'vouH.png' },
            { row: 3, columns: [14], image: path_pl_D_Gha + 'ghaH.png' },

            // Row 4 
            { row: 4, columns: [2], image: path_pl_D_Gha + 'keL.png' },
            { row: 4, columns: [9], image: path_pl_D_Gha + 'ke.png' },

            // Row 5 
            { row: 5, columns: [10], image: path_pl_D_Gha + 'zoH.png' },
            { row: 5, columns: [3], image: path_pl_D_Gha + 'zoL.png' }
        ],
        cornerMap: [
            // Row 1 
            { row: 1, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_4 },
            // Row 2 
            { row: 2, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_2 },
            // Row 3 
            { row: 3, columns: [7], image: './assets/symbols/martiria/diatonicNIlow.png' },

            // Row 4 
            { row: 4, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_2 },
            // Row 5 
            { row: 5, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_4 }
        ],

        colorsPads: [
            // Row 1 
            { row: 1, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 1, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 2 
            { row: 2, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 2, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 3
            { row: 3, columns: [2, 3], color: OUTSIDE_COLOR },
            { row: 3, columns: [9, 10], color: SECONDARY_COLOR },
            { row: 3, columns: [1, 4, 5, 6, 8, , 11, 12, 13, 14], color: PRIMARY_COLOR },

            { row: 3, columns: [7], color: HIGHLIGHT_COLOR },



            // Row 4
            { row: 4, columns: [2, 9], color: PRIMARY_COLOR },
            { row: 4, columns: [1, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 4, columns: [4, 5, 6, 7, 8, 10, 11], color: SECONDARY_COLOR },


            // Row 5
            { row: 5, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 5, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 5, columns: [3, 10], color: PRIMARY_COLOR },
        ]

    },
    {
        id: 'ichos_b_di_soft-chromatic',
        name: 'IXOS B Dhi (Soft-Chromatic)',
        calculateFrequencies: (sliderFreq) => {

            const frequency_moria_12 = 2 ** ((16.66666667 * 12) / 1200);
            const frequency_moria_10 = 2 ** ((16.66666667 * 10) / 1200);
            const frequency_moria_8 = 2 ** ((16.66666667 * 8) / 1200);

            const dieseis_ifeseis_2 = 2 ** ((16.66666667 * 2) / 1200);
            const dieseis_ifeseis_4 = 2 ** ((16.66666667 * 4) / 1200);

            const dhi_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const ke_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const zo_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8;
            const ni = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const pa = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const vou = sliderFreq / frequency_moria_12 / frequency_moria_8;
            const gha = sliderFreq / frequency_moria_12;
            const dhi = sliderFreq;
            const ke = sliderFreq * frequency_moria_12;
            const zo = sliderFreq * frequency_moria_12 * frequency_moria_10;
            const ni_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;
            const pa_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12;
            const vou_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10;
            const gha_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;

            return [
                [dhi_Low * dieseis_ifeseis_4, ke_Low * dieseis_ifeseis_4, zo_Low * dieseis_ifeseis_4, ni * dieseis_ifeseis_4, pa * dieseis_ifeseis_4, vou * dieseis_ifeseis_4, gha * dieseis_ifeseis_4, dhi * dieseis_ifeseis_4, ke * dieseis_ifeseis_4, zo * dieseis_ifeseis_4, ni_High * dieseis_ifeseis_4, pa_High * dieseis_ifeseis_4, vou_High * dieseis_ifeseis_4, gha_High * dieseis_ifeseis_4],
                [dhi_Low * dieseis_ifeseis_2, ke_Low * dieseis_ifeseis_2, zo_Low * dieseis_ifeseis_2, ni * dieseis_ifeseis_2, pa * dieseis_ifeseis_2, vou * dieseis_ifeseis_2, gha * dieseis_ifeseis_2, dhi * dieseis_ifeseis_2, ke * dieseis_ifeseis_2, zo * dieseis_ifeseis_2, ni_High * dieseis_ifeseis_2, pa_High * dieseis_ifeseis_2, vou_High * dieseis_ifeseis_2, gha_High * dieseis_ifeseis_2],
                [dhi_Low, ke_Low, zo_Low, ni, pa, vou, gha, dhi, ke, zo, ni_High, pa_High, vou_High, gha_High],
                [dhi_Low / dieseis_ifeseis_2, ke_Low / dieseis_ifeseis_2, zo_Low / dieseis_ifeseis_2, ni / dieseis_ifeseis_2, pa / dieseis_ifeseis_2, vou / dieseis_ifeseis_2, gha / dieseis_ifeseis_2, dhi / dieseis_ifeseis_2, ke / dieseis_ifeseis_2, zo / dieseis_ifeseis_2, ni_High / dieseis_ifeseis_2, pa_High / dieseis_ifeseis_2, vou_High / dieseis_ifeseis_2, gha_High / dieseis_ifeseis_2],
                [dhi_Low / dieseis_ifeseis_4, ke_Low / dieseis_ifeseis_4, zo_Low / dieseis_ifeseis_4, ni / dieseis_ifeseis_4, pa / dieseis_ifeseis_4, vou / dieseis_ifeseis_4, gha / dieseis_ifeseis_4, dhi / dieseis_ifeseis_4, ke / dieseis_ifeseis_4, zo / dieseis_ifeseis_4, ni_High / dieseis_ifeseis_4, pa_High / dieseis_ifeseis_4, vou_High / dieseis_ifeseis_4, gha_High / dieseis_ifeseis_4]
            ];
        },
        imageMap: [
            // Row 1 
            { row: 1, columns: [14], image: path_ichos_b_di_soft_chromatic + 'ghaH.png' },

            // Row 2 

            // Row 3 
            { row: 3, columns: [4], image: path_ichos_b_di_soft_chromatic + 'ni.png' },
            { row: 3, columns: [6], image: path_ichos_b_di_soft_chromatic + 'vou.png' },
            { row: 3, columns: [7], image: path_ichos_b_di_soft_chromatic + 'gha.png' },
            { row: 3, columns: [8], image: path_ichos_b_di_soft_chromatic + 'di.png' },
            { row: 3, columns: [10], image: path_ichos_b_di_soft_chromatic + 'zoH.png' },
            { row: 3, columns: [11], image: path_ichos_b_di_soft_chromatic + 'niH.png' },
            { row: 3, columns: [12], image: path_ichos_b_di_soft_chromatic + 'paH.png' },

            // Row 4 
            { row: 4, columns: [2], image: path_ichos_b_di_soft_chromatic + 'keL.png' },
            { row: 4, columns: [13], image: path_ichos_b_di_soft_chromatic + 'vouH.png' },

            // Row 5 
            { row: 5, columns: [1], image: path_ichos_b_di_soft_chromatic + 'diL.png' },
            { row: 5, columns: [3], image: path_ichos_b_di_soft_chromatic + 'zoL.png' },
            { row: 5, columns: [5], image: path_ichos_b_di_soft_chromatic + 'pa.png' },
            { row: 5, columns: [9], image: path_ichos_b_di_soft_chromatic + 'ke.png' }
        ],
        cornerMap: [
            // Row 1 
            { row: 1, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_4 },
            // Row 2 
            { row: 2, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_2 },
            // Row 3 
            { row: 3, columns: [8], image: './assets/symbols/martiria/softChromaticDi.png' },

            // Row 4 
            { row: 4, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_2 },
            // Row 5 
            { row: 5, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_4 }
        ],

        colorsPads: [
            // Row 1 
            { row: 1, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 1, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 1, columns: [14], color: PRIMARY_COLOR },

            // Row 2 
            { row: 2, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 2, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 3
            { row: 3, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 3, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 3, columns: [4, 6, 7, 8, 10, 11, 12], color: PRIMARY_COLOR },
            { row: 3, columns: [8], color: HIGHLIGHT_COLOR },

            // Row 4
            { row: 4, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 4, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 4, columns: [2, 13], color: PRIMARY_COLOR },

            // Row 5 
            { row: 5, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 5, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 5, columns: [1, 3, 5, 9], color: PRIMARY_COLOR },
        ]

    },
    {
        id: 'pl_b_pa_hard-chromatic',
        name: 'IXOS PL. B Pa (Hard Chromatic)',
        calculateFrequencies: (sliderFreq) => {

            const frequency_moria_12 = 2 ** ((16.66666667 * 12) / 1200);
            const frequency_moria_10 = 2 ** ((16.66666667 * 10) / 1200);
            const frequency_moria_8 = 2 ** ((16.66666667 * 8) / 1200);

            const dieseis_ifeseis_2 = 2 ** ((16.66666667 * 2) / 1200);
            const dieseis_ifeseis_4 = 2 ** ((16.66666667 * 4) / 1200);

            const dhi_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const ke_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const zo_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8;
            const ni = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const pa = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const vou = sliderFreq / frequency_moria_12 / frequency_moria_8;
            const gha = sliderFreq / frequency_moria_12;
            const dhi = sliderFreq;
            const ke = sliderFreq * frequency_moria_12;
            const zo = sliderFreq * frequency_moria_12 * frequency_moria_10;
            const ni_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;
            const pa_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12;
            const vou_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10;
            const gha_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;

            return [
                [dhi_Low * dieseis_ifeseis_4, ke_Low * dieseis_ifeseis_4, zo_Low * dieseis_ifeseis_4, ni * dieseis_ifeseis_4, pa * dieseis_ifeseis_4, vou * dieseis_ifeseis_4, gha * dieseis_ifeseis_4, dhi * dieseis_ifeseis_4, ke * dieseis_ifeseis_4, zo * dieseis_ifeseis_4, ni_High * dieseis_ifeseis_4, pa_High * dieseis_ifeseis_4, vou_High * dieseis_ifeseis_4, gha_High * dieseis_ifeseis_4],
                [dhi_Low * dieseis_ifeseis_2, ke_Low * dieseis_ifeseis_2, zo_Low * dieseis_ifeseis_2, ni * dieseis_ifeseis_2, pa * dieseis_ifeseis_2, vou * dieseis_ifeseis_2, gha * dieseis_ifeseis_2, dhi * dieseis_ifeseis_2, ke * dieseis_ifeseis_2, zo * dieseis_ifeseis_2, ni_High * dieseis_ifeseis_2, pa_High * dieseis_ifeseis_2, vou_High * dieseis_ifeseis_2, gha_High * dieseis_ifeseis_2],
                [dhi_Low, ke_Low, zo_Low, ni, pa, vou, gha, dhi, ke, zo, ni_High, pa_High, vou_High, gha_High],
                [dhi_Low / dieseis_ifeseis_2, ke_Low / dieseis_ifeseis_2, zo_Low / dieseis_ifeseis_2, ni / dieseis_ifeseis_2, pa / dieseis_ifeseis_2, vou / dieseis_ifeseis_2, gha / dieseis_ifeseis_2, dhi / dieseis_ifeseis_2, ke / dieseis_ifeseis_2, zo / dieseis_ifeseis_2, ni_High / dieseis_ifeseis_2, pa_High / dieseis_ifeseis_2, vou_High / dieseis_ifeseis_2, gha_High / dieseis_ifeseis_2],
                [dhi_Low / dieseis_ifeseis_4, ke_Low / dieseis_ifeseis_4, zo_Low / dieseis_ifeseis_4, ni / dieseis_ifeseis_4, pa / dieseis_ifeseis_4, vou / dieseis_ifeseis_4, gha / dieseis_ifeseis_4, dhi / dieseis_ifeseis_4, ke / dieseis_ifeseis_4, zo / dieseis_ifeseis_4, ni_High / dieseis_ifeseis_4, pa_High / dieseis_ifeseis_4, vou_High / dieseis_ifeseis_4, gha_High / dieseis_ifeseis_4]
            ];
        },
        imageMap: [
            // Row 1 
            { row: 1, columns: [3], image: path_pl_B_Pa_hard_chromatic + 'zoL.png' },

            // Row 2 
            { row: 2, columns: [13], image: path_pl_B_Pa_hard_chromatic + 'vouH.png' },

            // Row 3 
            { row: 3, columns: [1], image: path_pl_B_Pa_hard_chromatic + 'diL.png' },
            { row: 3, columns: [4], image: path_pl_B_Pa_hard_chromatic + 'ni.png' },
            { row: 3, columns: [5], image: path_pl_B_Pa_hard_chromatic + 'pa.png' },
            { row: 3, columns: [8], image: path_pl_B_Pa_hard_chromatic + 'di.png' },
            { row: 3, columns: [9], image: path_pl_B_Pa_hard_chromatic + 'ke.png' },
            { row: 3, columns: [12], image: path_pl_B_Pa_hard_chromatic + 'paH.png' },
            { row: 3, columns: [14], image: path_pl_B_Pa_hard_chromatic + 'ghaH.png' },

            // Row 4

            // Row 5 
            { row: 5, columns: [2], image: path_pl_B_Pa_hard_chromatic + 'keL.png' },
            { row: 5, columns: [6], image: path_pl_B_Pa_hard_chromatic + 'vou.png' },
            { row: 5, columns: [8], image: path_pl_B_Pa_hard_chromatic + 'gha.png' },
            { row: 5, columns: [10], image: path_pl_B_Pa_hard_chromatic + 'zoH.png' },
            { row: 5, columns: [12], image: path_pl_B_Pa_hard_chromatic + 'niH.png' }
        ],
        cornerMap: [
            // Row 1 
            { row: 1, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_4 },
            // Row 2 
            { row: 2, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_2 },
            // Row 3 
            { row: 3, columns: [5], image: './assets/symbols/martiria/hardCromaticPa.png' },

            // Row 4 
            { row: 4, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_2 },
            // Row 5 
            { row: 5, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_4 }
        ],

        colorsPads: [
            // Row 1 
            { row: 1, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 1, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 1, columns: [3], color: PRIMARY_COLOR },

            // Row 2 
            { row: 2, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 2, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 2, columns: [13], color: PRIMARY_COLOR },

            // Row 3
            { row: 3, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 3, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 3, columns: [1, 4, 8, 9, 12, 14], color: PRIMARY_COLOR },
            { row: 3, columns: [5], color: HIGHLIGHT_COLOR },

            // Row 4
            { row: 4, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 4, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 5 
            { row: 5, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 5, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 5, columns: [2, 6, 8, 10, 12], color: PRIMARY_COLOR },
        ]

    },
    {
        id: 'ichos_g_gha',
        name: 'IXOS G Gha',
        calculateFrequencies: (sliderFreq) => {

            const frequency_moria_12 = 2 ** ((16.66666667 * 12) / 1200);
            const frequency_moria_10 = 2 ** ((16.66666667 * 10) / 1200);
            const frequency_moria_8 = 2 ** ((16.66666667 * 8) / 1200);

            const dieseis_ifeseis_2 = 2 ** ((16.66666667 * 2) / 1200);
            const dieseis_ifeseis_4 = 2 ** ((16.66666667 * 4) / 1200);

            const dhi_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const ke_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const zo_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8;
            const ni = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const pa = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const vou = sliderFreq / frequency_moria_12 / frequency_moria_8;
            const gha = sliderFreq / frequency_moria_12;
            const dhi = sliderFreq;
            const ke = sliderFreq * frequency_moria_12;
            const zo = sliderFreq * frequency_moria_12 * frequency_moria_10;
            const ni_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;
            const pa_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12;
            const vou_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10;
            const gha_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;

            return [
                [dhi_Low * dieseis_ifeseis_4, ke_Low * dieseis_ifeseis_4, zo_Low * dieseis_ifeseis_4, ni * dieseis_ifeseis_4, pa * dieseis_ifeseis_4, vou * dieseis_ifeseis_4, gha * dieseis_ifeseis_4, dhi * dieseis_ifeseis_4, ke * dieseis_ifeseis_4, zo * dieseis_ifeseis_4, ni_High * dieseis_ifeseis_4, pa_High * dieseis_ifeseis_4, vou_High * dieseis_ifeseis_4, gha_High * dieseis_ifeseis_4],
                [dhi_Low * dieseis_ifeseis_2, ke_Low * dieseis_ifeseis_2, zo_Low * dieseis_ifeseis_2, ni * dieseis_ifeseis_2, pa * dieseis_ifeseis_2, vou * dieseis_ifeseis_2, gha * dieseis_ifeseis_2, dhi * dieseis_ifeseis_2, ke * dieseis_ifeseis_2, zo * dieseis_ifeseis_2, ni_High * dieseis_ifeseis_2, pa_High * dieseis_ifeseis_2, vou_High * dieseis_ifeseis_2, gha_High * dieseis_ifeseis_2],
                [dhi_Low, ke_Low, zo_Low, ni, pa, vou, gha, dhi, ke, zo, ni_High, pa_High, vou_High, gha_High],
                [dhi_Low / dieseis_ifeseis_2, ke_Low / dieseis_ifeseis_2, zo_Low / dieseis_ifeseis_2, ni / dieseis_ifeseis_2, pa / dieseis_ifeseis_2, vou / dieseis_ifeseis_2, gha / dieseis_ifeseis_2, dhi / dieseis_ifeseis_2, ke / dieseis_ifeseis_2, zo / dieseis_ifeseis_2, ni_High / dieseis_ifeseis_2, pa_High / dieseis_ifeseis_2, vou_High / dieseis_ifeseis_2, gha_High / dieseis_ifeseis_2],
                [dhi_Low / dieseis_ifeseis_4, ke_Low / dieseis_ifeseis_4, zo_Low / dieseis_ifeseis_4, ni / dieseis_ifeseis_4, pa / dieseis_ifeseis_4, vou / dieseis_ifeseis_4, gha / dieseis_ifeseis_4, dhi / dieseis_ifeseis_4, ke / dieseis_ifeseis_4, zo / dieseis_ifeseis_4, ni_High / dieseis_ifeseis_4, pa_High / dieseis_ifeseis_4, vou_High / dieseis_ifeseis_4, gha_High / dieseis_ifeseis_4]
            ];
        },
        imageMap: [
            // Row 1

            // Row 2 
            { row: 2, columns: [6], image: path_pl_D_Ni + 'vou.png' },
            { row: 2, columns: [3], image: path_ichos_g_Gha + 'zoL.png' },

            // Row 3 
            { row: 3, columns: [1], image: path_pl_D_Ni + 'diL.png' },
            { row: 3, columns: [2], image: path_pl_D_Ni + 'keL.png' },

            { row: 3, columns: [4], image: path_pl_D_Ni + 'ni.png' },
            { row: 3, columns: [5], image: path_pl_D_Ni + 'pa.png' },

            { row: 3, columns: [7], image: path_pl_D_Ni + 'gha.png' },
            { row: 3, columns: [8], image: path_pl_D_Ni + 'di.png' },
            { row: 3, columns: [9], image: path_pl_D_Ni + 'ke.png' },

            { row: 3, columns: [11], image: path_pl_D_Ni + 'niH.png' },
            { row: 3, columns: [12], image: path_pl_D_Ni + 'paH.png' },

            { row: 3, columns: [14], image: path_pl_D_Ni + 'ghaH.png' },
            // Row 4 

            // Row 5 
            { row: 5, columns: [10], image: path_ichos_g_Gha + 'zoH.png' },
            { row: 5, columns: [13], image: path_pl_D_Ni + 'vouH.png' }
        ],
        cornerMap: [
            // Row 1 
            { row: 1, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_4 },
            // Row 2 
            { row: 2, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_2 },
            // Row 3 
            { row: 3, columns: [7], image: './assets/symbols/martiria/diatonicGha.png' },

            // Row 4 
            { row: 4, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_2 },
            // Row 5 
            { row: 5, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_4 }
        ],
        colorsPads: [
            // Row 1 
            { row: 1, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 1, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 2 
            { row: 2, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 2, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 2, columns: [3, 6], color: PRIMARY_COLOR },

            // Row 3
            { row: 3, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 3, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 3, columns: [1, 2, 4, 5, 8, 9, 11, 12, 14], color: PRIMARY_COLOR },
            { row: 3, columns: [7], color: HIGHLIGHT_COLOR },

            // Row 4
            { row: 4, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 4, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 5 
            { row: 5, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 5, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
            { row: 5, columns: [10, 13], color: PRIMARY_COLOR },
        ]

    }, {
        id: 'ichos_a_pa',
        name: 'IXOS A Basis PA',
        calculateFrequencies: (sliderFreq) => {

            const frequency_moria_12 = 2 ** ((16.66666667 * 12) / 1200);
            const frequency_moria_10 = 2 ** ((16.66666667 * 10) / 1200);
            const frequency_moria_8 = 2 ** ((16.66666667 * 8) / 1200);

            const dieseis_ifeseis_2 = 2 ** ((16.66666667 * 2) / 1200);
            const dieseis_ifeseis_4 = 2 ** ((16.66666667 * 4) / 1200);

            const dhi_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const ke_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const zo_Low = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12 / frequency_moria_8;
            const ni = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10 / frequency_moria_12;
            const pa = sliderFreq / frequency_moria_12 / frequency_moria_8 / frequency_moria_10;
            const vou = sliderFreq / frequency_moria_12 / frequency_moria_8;
            const gha = sliderFreq / frequency_moria_12;
            const dhi = sliderFreq;
            const ke = sliderFreq * frequency_moria_12;
            const zo = sliderFreq * frequency_moria_12 * frequency_moria_10;
            const ni_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;
            const pa_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12;
            const vou_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10;
            const gha_High = sliderFreq * frequency_moria_12 * frequency_moria_10 * frequency_moria_8 * frequency_moria_12 * frequency_moria_10 * frequency_moria_8;

            return [
                [dhi_Low * dieseis_ifeseis_4, ke_Low * dieseis_ifeseis_4, zo_Low * dieseis_ifeseis_4, ni * dieseis_ifeseis_4, pa * dieseis_ifeseis_4, vou * dieseis_ifeseis_4, gha * dieseis_ifeseis_4, dhi * dieseis_ifeseis_4, ke * dieseis_ifeseis_4, zo * dieseis_ifeseis_4, ni_High * dieseis_ifeseis_4, pa_High * dieseis_ifeseis_4, vou_High * dieseis_ifeseis_4, gha_High * dieseis_ifeseis_4],
                [dhi_Low * dieseis_ifeseis_2, ke_Low * dieseis_ifeseis_2, zo_Low * dieseis_ifeseis_2, ni * dieseis_ifeseis_2, pa * dieseis_ifeseis_2, vou * dieseis_ifeseis_2, gha * dieseis_ifeseis_2, dhi * dieseis_ifeseis_2, ke * dieseis_ifeseis_2, zo * dieseis_ifeseis_2, ni_High * dieseis_ifeseis_2, pa_High * dieseis_ifeseis_2, vou_High * dieseis_ifeseis_2, gha_High * dieseis_ifeseis_2],
                [dhi_Low, ke_Low, zo_Low, ni, pa, vou, gha, dhi, ke, zo, ni_High, pa_High, vou_High, gha_High],
                [dhi_Low / dieseis_ifeseis_2, ke_Low / dieseis_ifeseis_2, zo_Low / dieseis_ifeseis_2, ni / dieseis_ifeseis_2, pa / dieseis_ifeseis_2, vou / dieseis_ifeseis_2, gha / dieseis_ifeseis_2, dhi / dieseis_ifeseis_2, ke / dieseis_ifeseis_2, zo / dieseis_ifeseis_2, ni_High / dieseis_ifeseis_2, pa_High / dieseis_ifeseis_2, vou_High / dieseis_ifeseis_2, gha_High / dieseis_ifeseis_2],
                [dhi_Low / dieseis_ifeseis_4, ke_Low / dieseis_ifeseis_4, zo_Low / dieseis_ifeseis_4, ni / dieseis_ifeseis_4, pa / dieseis_ifeseis_4, vou / dieseis_ifeseis_4, gha / dieseis_ifeseis_4, dhi / dieseis_ifeseis_4, ke / dieseis_ifeseis_4, zo / dieseis_ifeseis_4, ni_High / dieseis_ifeseis_4, pa_High / dieseis_ifeseis_4, vou_High / dieseis_ifeseis_4, gha_High / dieseis_ifeseis_4]
            ];
        },
        imageMap: [
            // Row 1 – all 8 columns get dieseis_4

            // Row 2 – all 8 columns get dieseis_2

            // Row 3 – each column gets a specific diatonic symbol
            { row: 3, columns: [1], image: path_pl_D_Ni + 'diL.png' },
            { row: 3, columns: [2], image: path_pl_D_Ni + 'keL.png' },
            { row: 3, columns: [3], image: path_pl_D_Ni + 'zoL.png' },
            { row: 3, columns: [4], image: path_pl_D_Ni + 'ni.png' },
            { row: 3, columns: [5], image: path_pl_D_Ni + 'pa.png' },
            { row: 3, columns: [6], image: path_pl_D_Ni + 'vou.png' },
            { row: 3, columns: [7], image: path_pl_D_Ni + 'gha.png' },
            { row: 3, columns: [8], image: path_pl_D_Ni + 'di.png' },
            { row: 3, columns: [9], image: path_pl_D_Ni + 'ke.png' },
            { row: 3, columns: [10], image: path_pl_D_Ni + 'zoH.png' },
            { row: 3, columns: [11], image: path_pl_D_Ni + 'niH.png' },
            { row: 3, columns: [12], image: path_pl_D_Ni + 'paH.png' },
            { row: 3, columns: [13], image: path_pl_D_Ni + 'vouH.png' },
            { row: 3, columns: [14], image: path_pl_D_Ni + 'ghaH.png' }
            // Row 4 – all 8 columns get ifeseis_2

            // Row 5 – all 8 columns get ifeseis_4

        ],
        cornerMap: [
            // Row 1 – all 8 columns get dieseis_4
            { row: 1, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_4 },
            // Row 2 – all 8 columns get dieseis_2
            { row: 2, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_dieseis_plus_2 },
            // Row 3 – each column gets a specific diatonic symbol
            { row: 3, columns: [5], image: './assets/symbols/martiria/diatonicPa.png' },

            // Row 4 – all 8 columns get ifeseis_2
            { row: 4, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_2 },
            // Row 5 – all 8 columns get ifeseis_4
            { row: 5, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], image: path_ifeseis_minus_4 }
        ],
        colorsPads: [
            // Row 1 
            { row: 1, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 1, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 2 
            { row: 2, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 2, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 3
            { row: 3, columns: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], color: PRIMARY_COLOR },
            { row: 3, columns: [5], color: HIGHLIGHT_COLOR },

            { row: 4, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 4, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },

            // Row 2 
            { row: 5, columns: [1, 2, 3, 12, 13, 14], color: OUTSIDE_COLOR },
            { row: 5, columns: [4, 5, 6, 7, 8, 9, 10, 11], color: SECONDARY_COLOR },
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