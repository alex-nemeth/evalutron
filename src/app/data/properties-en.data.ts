import { IAlternative } from "../models/alternative.model";
import { ICriteria } from "../models/criteria.model";

// Alternatives Data
export const alternatives: IAlternative[] = [
    {
        id: "a1",
        title: "Martincekova, Ruzinov",
        rawValues: {
            Price: 339000,
            "Distance (km)": 5,
            "# of Rooms": 4,
            "Size (m2)": 86,
            Condition: 3,
            Parking: 3,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a2",
        title: "Nejedleho, Dubravka",
        rawValues: {
            Price: 299800,
            "Distance (km)": 8.1,
            "# of Rooms": 3,
            "Size (m2)": 89,
            Condition: 4,
            Parking: 2,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a3",
        title: "Furdekova, Petrzalka",
        rawValues: {
            Price: 279000,
            "Distance (km)": 6.5,
            "# of Rooms": 4,
            "Size (m2)": 87,
            Condition: 2,
            Parking: 1,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a4",
        title: "Stefunkova, Ruzinov",
        rawValues: {
            Price: 195000,
            "Distance (km)": 6.6,
            "# of Rooms": 2,
            "Size (m2)": 65,
            Condition: 1,
            Parking: 1,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a5",
        title: "Palisady, Stare Mesto",
        rawValues: {
            Price: 249900,
            "Distance (km)": 0.75,
            "# of Rooms": 2.5,
            "Size (m2)": 62,
            Condition: 1,
            Parking: 3,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a6",
        title: "Kadnarova, Raca",
        rawValues: {
            Price: 285000,
            "Distance (km)": 7.6,
            "# of Rooms": 3,
            "Size (m2)": 75,
            Condition: 4,
            Parking: 3,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a7",
        title: "Znievska, Petrzalka",
        rawValues: {
            Price: 199900,
            "Distance (km)": 7.8,
            "# of Rooms": 3,
            "Size (m2)": 84,
            Condition: 2,
            Parking: 3,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a8",
        title: "Furdekova, Petrzalka (2)",
        rawValues: {
            Price: 233000,
            "Distance (km)": 6.5,
            "# of Rooms": 3,
            "Size (m2)": 70,
            Condition: 3,
            Parking: 3,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a9",
        title: "Kopcianska, Petrzalka",
        rawValues: {
            Price: 299990,
            "Distance (km)": 6.3,
            "# of Rooms": 3,
            "Size (m2)": 84,
            Condition: 4,
            Parking: 1,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a10",
        title: "Ivana Bukovcana, Devinska Nova Ves",
        rawValues: {
            Price: 239700,
            "Distance (km)": 13.5,
            "# of Rooms": 4,
            "Size (m2)": 86,
            Condition: 3,
            Parking: 2,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a11",
        title: "Starohradska, Petrzalka",
        rawValues: {
            Price: 299000,
            "Distance (km)": 6.7,
            "# of Rooms": 4,
            "Size (m2)": 87,
            Condition: 3,
            Parking: 2,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a12",
        title: "Kosicka, Ruzinov",
        rawValues: {
            Price: 232000,
            "Distance (km)": 4,
            "# of Rooms": 2,
            "Size (m2)": 67,
            Condition: 3,
            Parking: 1,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a13",
        title: "Kopcianska, Petrzalka (2)",
        rawValues: {
            Price: 249900,
            "Distance (km)": 6.3,
            "# of Rooms": 2,
            "Size (m2)": 81,
            Condition: 4,
            Parking: 2,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a14",
        title: "Halova, Petrzalka",
        rawValues: {
            Price: 256000,
            "Distance (km)": 4.3,
            "# of Rooms": 4,
            "Size (m2)": 70,
            Condition: 3,
            Parking: 1,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a15",
        title: "Sputnikova, Ruzinov",
        rawValues: {
            Price: 234990,
            "Distance (km)": 5.9,
            "# of Rooms": 3,
            "Size (m2)": 78,
            Condition: 3,
            Parking: 3,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
    {
        id: "a16",
        title: "Sancova, Stare Mesto",
        rawValues: {
            Price: 329000,
            "Distance (km)": 2.6,
            "# of Rooms": 2,
            "Size (m2)": 90,
            Condition: 2,
            Parking: 3,
        },
        weightedSumValues: {},
        topsisValues: {},
    },
];

// Criteria Data
export const criteria: ICriteria[] = [
    {
        id: "c1",
        title: "Price",
        minmax: "MIN",
        weight: 1,
        weightPercentage: 16.667,
    },
    {
        id: "c2",
        title: "Distance (km)",
        description: "Distance from the city center in kilometres.",
        minmax: "MIN",
        weight: 1,
        weightPercentage: 16.667,
    },
    {
        id: "c3",
        title: "# of Rooms",
        minmax: "MAX",
        weight: 1,
        weightPercentage: 16.667,
    },
    {
        id: "c4",
        title: "Size (m2)",
        minmax: "MAX",
        weight: 1,
        weightPercentage: 16.667,
    },
    {
        id: "c5",
        title: "Condition",
        description:
            "1 – Former condition, greater additional investment required, 2 – Partially reconstructed, low additional investment required, 3 – Fully reconstructed, no additional investment required 4 – New building",
        minmax: "MAX",
        weight: 1,
        weightPercentage: 16.667,
    },
    {
        id: "c6",
        title: "Parking",
        description:
            "1 - No parking, 2 - Nearby public or paid parking, 3 - Private parking",
        minmax: "MAX",
        weight: 1,
        weightPercentage: 16.667,
    },
];
