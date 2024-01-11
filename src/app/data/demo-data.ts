import { ICriteria } from "../models/criteria.model";

// Alternatives Data
export const alternatives: {}[] = [
    {
        id: "a1",
        Title: "House 1",
        Price: "150000",
        Distance: "10",
        "# of Rooms": "3",
    },
    {
        id: "a2",
        Title: "House 2",
        Price: "200000",
        Distance: "15",
        "# of Rooms": "4",
    },
    {
        id: "a3",
        Title: "House 3",
        Price: "250000",
        Distance: "20",
        "# of Rooms": "5",
    },
    {
        id: "a4",
        Title: "House 4",
        Price: "300000",
        Distance: "25",
        "# of Rooms": "6",
    },
    {
        id: "a5",
        Title: "House 5",
        Price: "350000",
        Distance: "30",
        "# of Rooms": "7",
    },
    {
        id: "a6",
        Title: "House 6",
        Price: "400000",
        Distance: "35",
        "# of Rooms": "8",
    },
    {
        id: "a7",
        Title: "House 7",
        Price: "450000",
        Distance: "40",
        "# of Rooms": "9",
    },
    {
        id: "a8",
        Title: "House 8",
        Price: "500000",
        Distance: "45",
        "# of Rooms": "10",
    },
    {
        id: "a9",
        Title: "House 9",
        Price: "550000",
        Distance: "50",
        "# of Rooms": "11",
    },
    {
        id: "a10",
        Title: "House 10",
        Price: "600000",
        Distance: "55",
        "# of Rooms": "12",
    },
];

export const normalizedAlternatives: any = {
    "House 1": {
      "Price": 0.2079002079002079,
      "Distance": 0.24752475247524752,
      "# of Rooms": 0.04,
      "Sum": 2.25
    },
    "House 2": {
      "Price": 0.15592515592515593,
      "Distance": 0.1650990099009901,
      "# of Rooms": 0.05328,
      "Sum": 1.75
    },
    "House 3": {
      "Price": 0.12474012474012475,
      "Distance": 0.12376237623762376,
      "# of Rooms": 0.06672,
      "Sum": 1.5170000000000001
    },
    "House 4": {
      "Price": 0.10395010395010396,
      "Distance": 0.09900990099009901,
      "# of Rooms": 0.08,
      "Sum": 1.4
    },
    "House 5": {
      "Price": 0.0891891891891892,
      "Distance": 0.08242574257425743,
      "# of Rooms": 0.09327999999999999,
      "Sum": 1.345
    },
    "House 6": {
      "Price": 0.07796257796257797,
      "Distance": 0.07079207920792079,
      "# of Rooms": 0.10672000000000001,
      "Sum": 1.328
    },
    "House 7": {
      "Price": 0.06923076923076923,
      "Distance": 0.06188118811881188,
      "# of Rooms": 0.12,
      "Sum": 1.333
    },
    "House 8": {
      "Price": 0.062370062370062374,
      "Distance": 0.05495049504950495,
      "# of Rooms": 0.13327999999999998,
      "Sum": 1.355
    },
    "House 9": {
      "Price": 0.05675675675675677,
      "Distance": 0.04950495049504951,
      "# of Rooms": 0.14672000000000002,
      "Sum": 1.3900000000000001
    },
    "House 10": {
      "Price": 0.05197505197505198,
      "Distance": 0.04504950495049505,
      "# of Rooms": 0.16,
      "Sum": 1.432
    }
}

export const sumsOfValues: { [key: string]: number } = {
    "Price": 4.81,
    "Distance": 4.04,
    "# of Rooms": 6.25
};

export const calculatedAlternatives: {}[] = [
    {
      "id": "a1",
      "Title": "House 1",
      "Price": 1,
      "Distance": 1,
      "# of Rooms": 0.25
    },
    {
      "id": "a2",
      "Title": "House 2",
      "Price": 0.75,
      "Distance": 0.667,
      "# of Rooms": 0.333
    },
    {
      "id": "a3",
      "Title": "House 3",
      "Price": 0.6,
      "Distance": 0.5,
      "# of Rooms": 0.417
    },
    {
      "id": "a4",
      "Title": "House 4",
      "Price": 0.5,
      "Distance": 0.4,
      "# of Rooms": 0.5
    },
    {
      "id": "a5",
      "Title": "House 5",
      "Price": 0.429,
      "Distance": 0.333,
      "# of Rooms": 0.583
    },
    {
      "id": "a6",
      "Title": "House 6",
      "Price": 0.375,
      "Distance": 0.286,
      "# of Rooms": 0.667
    },
    {
      "id": "a7",
      "Title": "House 7",
      "Price": 0.333,
      "Distance": 0.25,
      "# of Rooms": 0.75
    },
    {
      "id": "a8",
      "Title": "House 8",
      "Price": 0.3,
      "Distance": 0.222,
      "# of Rooms": 0.833
    },
    {
      "id": "a9",
      "Title": "House 9",
      "Price": 0.273,
      "Distance": 0.2,
      "# of Rooms": 0.917
    },
    {
      "id": "a10",
      "Title": "House 10",
      "Price": 0.25,
      "Distance": 0.182,
      "# of Rooms": 1
    }
];

// Criteria Data
export const criteria: ICriteria[] = [
    { id: "c1", title: "Price", minmax: "MIN", weight: 2.466, weightPercentage: 65.865 },
    { id: "c2", title: "Distance", minmax: "MIN", weight: 1.326, weightPercentage: 35.416 },
    { id: "c3", title: "# of Rooms", minmax: "MAX", weight: 0.306, weightPercentage: 8.173 },
];