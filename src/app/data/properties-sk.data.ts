import { IAlternative } from "../models/alternative.model";
import { ICriteria } from "../models/criteria.model";

// Alternatives Data
export const alternatives: IAlternative[] = [
    {
        id: "a1",
        title: "Martincekova, Ruzinov",
        values: {
            raw: {
                Cena: 339000,
                "Vzdialenosť (km)": 5,
                "Počet izieb": 4,
                "Rozloha (m2)": 86,
                Stav: 3,
                Parkovanie: 3,
            },
        },
    },
    {
        id: "a2",
        title: "Nejedleho, Dubravka",
        values: {
            raw: {
                Cena: 299800,
                "Vzdialenosť (km)": 8.1,
                "Počet izieb": 3,
                "Rozloha (m2)": 89,
                Stav: 4,
                Parkovanie: 2,
            },
        },
    },
    {
        id: "a3",
        title: "Furdekova, Petrzalka",
        values: {
            raw: {
                Cena: 279000,
                "Vzdialenosť (km)": 6.5,
                "Počet izieb": 4,
                "Rozloha (m2)": 87,
                Stav: 2,
                Parkovanie: 1,
            },
        },
    },
    {
        id: "a4",
        title: "Stefunkova, Ruzinov",
        values: {
            raw: {
                Cena: 195000,
                "Vzdialenosť (km)": 6.6,
                "Počet izieb": 2,
                "Rozloha (m2)": 65,
                Stav: 1,
                Parkovanie: 1,
            },
        },
    },
    {
        id: "a5",
        title: "Palisady, Stare Mesto",
        values: {
            raw: {
                Cena: 249900,
                "Vzdialenosť (km)": 0.75,
                "Počet izieb": 2.5,
                "Rozloha (m2)": 62,
                Stav: 1,
                Parkovanie: 3,
            },
        },
    },
    {
        id: "a6",
        title: "Kadnarova, Raca",
        values: {
            raw: {
                Cena: 285000,
                "Vzdialenosť (km)": 7.6,
                "Počet izieb": 3,
                "Rozloha (m2)": 75,
                Stav: 4,
                Parkovanie: 3,
            },
        },
    },
    {
        id: "a7",
        title: "Znievska, Petrzalka",
        values: {
            raw: {
                Cena: 199900,
                "Vzdialenosť (km)": 7.8,
                "Počet izieb": 3,
                "Rozloha (m2)": 84,
                Stav: 2,
                Parkovanie: 3,
            },
        },
    },
    {
        id: "a8",
        title: "Furdekova, Petrzalka (2)",
        values: {
            raw: {
                Cena: 233000,
                "Vzdialenosť (km)": 6.5,
                "Počet izieb": 3,
                "Rozloha (m2)": 70,
                Stav: 3,
                Parkovanie: 3,
            },
        },
    },
    {
        id: "a9",
        title: "Kopcianska, Petrzalka",
        values: {
            raw: {
                Cena: 299990,
                "Vzdialenosť (km)": 6.3,
                "Počet izieb": 3,
                "Rozloha (m2)": 84,
                Stav: 4,
                Parkovanie: 1,
            },
        },
    },
    {
        id: "a10",
        title: "Ivana Bukovcana, Devinska Nova Ves",
        values: {
            raw: {
                Cena: 239700,
                "Vzdialenosť (km)": 13.5,
                "Počet izieb": 4,
                "Rozloha (m2)": 86,
                Stav: 3,
                Parkovanie: 2,
            },
        },
    },
    {
        id: "a11",
        title: "Starohradska, Petrzalka",
        values: {
            raw: {
                Cena: 299000,
                "Vzdialenosť (km)": 6.7,
                "Počet izieb": 4,
                "Rozloha (m2)": 87,
                Stav: 3,
                Parkovanie: 2,
            },
        },
    },
    {
        id: "a12",
        title: "Kosicka, Ruzinov",
        values: {
            raw: {
                Cena: 232000,
                "Vzdialenosť (km)": 4,
                "Počet izieb": 2,
                "Rozloha (m2)": 67,
                Stav: 3,
                Parkovanie: 1,
            },
        },
    },
    {
        id: "a13",
        title: "Kopcianska, Petrzalka (2)",
        values: {
            raw: {
                Cena: 249900,
                "Vzdialenosť (km)": 6.3,
                "Počet izieb": 2,
                "Rozloha (m2)": 81,
                Stav: 4,
                Parkovanie: 2,
            },
        },
    },
    {
        id: "a14",
        title: "Halova, Petrzalka",
        values: {
            raw: {
                Cena: 256000,
                "Vzdialenosť (km)": 4.3,
                "Počet izieb": 4,
                "Rozloha (m2)": 70,
                Stav: 3,
                Parkovanie: 1,
            },
        },
    },
    {
        id: "a15",
        title: "Sputnikova, Ruzinov",
        values: {
            raw: {
                Cena: 234990,
                "Vzdialenosť (km)": 5.9,
                "Počet izieb": 3,
                "Rozloha (m2)": 78,
                Stav: 3,
                Parkovanie: 3,
            },
        },
    },
    {
        id: "a16",
        title: "Sancova, Stare Mesto",
        values: {
            raw: {
                Cena: 329000,
                "Vzdialenosť (km)": 2.6,
                "Počet izieb": 2,
                "Rozloha (m2)": 90,
                Stav: 2,
                Parkovanie: 3,
            },
        },
    },
];

export const sumsOfValues: { [key: string]: number } = {
    Cena: 4.81,
    "Vzdialenosť (km)": 4.04,
    "Počet izieb": 6.25,
};

// Criteria Data
export const criteria: ICriteria[] = [
    {
        id: "c1",
        title: "Cena",
        minmax: "MIN",
        weight: 2.466,
        weightPercentage: 65.865,
    },
    {
        id: "c2",
        title: "Vzdialenosť (km)",
        description: "Vzdialenosť od centra mesta v kilometroch.",
        minmax: "MIN",
        weight: 1.326,
        weightPercentage: 35.416,
    },
    {
        id: "c3",
        title: "Počet izieb",
        minmax: "MAX",
        weight: 0.306,
        weightPercentage: 8.173,
    },
    {
        id: "c4",
        title: "Rozloha (m2)",
        minmax: "MAX",
        weight: 0.306,
        weightPercentage: 8.173,
    },
    {
        id: "c5",
        title: "Stav",
        description:
            "1 – Pôvodný stav, nutnosť značnej dodatočnej investície, 2 – Čiastočná rekonštrukcia, potrebná dodatočná investícia je minimálna, 3 – Plne zrekonštruovaná, 4 – Novostavba",
        minmax: "MAX",
        weight: 0.306,
        weightPercentage: 8.173,
    },
    {
        id: "c6",
        title: "Parkovanie",
        description: "1 - Žiadne, 2 - Verejné alebo spoplatnené, 3 - Súkromné",
        minmax: "MAX",
        weight: 0.306,
        weightPercentage: 8.173,
    },
];
