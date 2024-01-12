import { IAlternative } from "../models/alternative.model";
import { ICriteria } from "../models/criteria.model";

// Alternatives Data
export const alternatives: IAlternative[] = [
  {
    id: "a1",
    title: "Martincekova, Ruzinov",
    values: {
      raw: {
        Price: 339000,
        'Distance (km)': 5,
        "# of Rooms": 4,
        "Size (m2)": 86,
        Condition: 3,
        Parking: 3
      },
    },
  },
  {
    id: "a2",
    title: "Nejedleho, Dubravka",
    values: {
      raw: {
        Price: 299800,
        'Distance (km)': 8.1,
        "# of Rooms": 3,
        "Size (m2)": 89,
        Condition: 4,
        Parking: 2
      },
    },
  },
  {
    id: "a3",
    title: "Furdekova, Petrzalka",
    values: {
      raw: {
        Price: 279000,
        'Distance (km)': 6.5,
        "# of Rooms": 4,
        "Size (m2)": 87,
        Condition: 2,
        Parking: 1
      },
    },
  },
  {
    id: "a4",
    title: "Stefunkova, Ruzinov",
    values: {
      raw: {
        Price: 195000,
        'Distance (km)': 6.6,
        "# of Rooms": 2,
        "Size (m2)": 65,
        Condition: 1,
        Parking: 1
      },
    },
  },
  {
    id: "a5",
    title: "Palisady, Stare Mesto",
    values: {
      raw: {
        Price: 249900,
        'Distance (km)': 0.75,
        "# of Rooms": 2.5,
        "Size (m2)": 62,
        Condition: 1,
        Parking: 3
      },
    },
  },
  {
    id: "a6",
    title: "Kadnarova, Raca",
    values: {
      raw: {
        Price: 285000,
        'Distance (km)': 7.6,
        "# of Rooms": 3,
        "Size (m2)": 75,
        Condition: 4,
        Parking: 3
      },
    },
  },
  {
    id: "a7",
    title: "Znievska, Petrzalka",
    values: {
      raw: {
        Price: 199900,
        'Distance (km)': 7.8,
        "# of Rooms": 3,
        "Size (m2)": 84,
        Condition: 2,
        Parking: 3
      },
    },
  },
  {
    id: "a8",
    title: "Furdekova, Petrzalka (2)",
    values: {
      raw: {
        Price: 233000,
        'Distance (km)': 6.5,
        "# of Rooms": 3,
        "Size (m2)": 70,
        Condition: 3,
        Parking: 3
      },
    },
  },
  {
    id: "a9",
    title: "Kopcianska, Petrzalka",
    values: {
      raw: {
        Price: 299990,
        'Distance (km)': 6.3,
        "# of Rooms": 3,
        "Size (m2)": 84,
        Condition: 4,
        Parking: 1
      },
    },
  },
  {
    id: "a10",
    title: "Ivana Bukovcana, Devinska Nova Ves",
    values: {
      raw: {
        Price: 239700,
        'Distance (km)': 13.5,
        "# of Rooms": 4,
        "Size (m2)": 86,
        Condition: 3,
        Parking: 2
      },
    },
  },
  {
    id: "a11",
    title: "Starohradska, Petrzalka",
    values: {
      raw: {
        Price: 299000,
        'Distance (km)': 6.7,
        "# of Rooms": 4,
        "Size (m2)": 87,
        Condition: 3,
        Parking: 2
      },
    },
  },
  {
    id: "a12",
    title: "Kosicka, Ruzinov",
    values: {
      raw: {
        Price: 232000,
        'Distance (km)': 4,
        "# of Rooms": 2,
        "Size (m2)": 67,
        Condition: 3,
        Parking: 1
      },
    },
  },
  {
    id: "a13",
    title: "Kopcianska, Petrzalka (2)",
    values: {
      raw: {
        Price: 249900,
        'Distance (km)': 6.3,
        "# of Rooms": 2,
        "Size (m2)": 81,
        Condition: 4,
        Parking: 2
      },
    },
  },
  {
    id: "a14",
    title: "Halova, Petrzalka",
    values: {
      raw: {
        Price: 256000,
        'Distance (km)': 4.3,
        "# of Rooms": 4,
        "Size (m2)": 70,
        Condition: 3,
        Parking: 1
      },
    },
  },
  {
    id: "a15",
    title: "Sputnikova, Ruzinov",
    values: {
      raw: {
        Price: 234990,
        'Distance (km)': 5.9,
        "# of Rooms": 3,
        "Size (m2)": 78,
        Condition: 3,
        Parking: 3
      },
    },
  },
  {
    id: "a16",
    title: "Sancova, Stare Mesto",
    values: {
      raw: {
        Price: 329000,
        'Distance (km)': 2.6,
        "# of Rooms": 2,
        "Size (m2)": 90,
        Condition: 2,
        Parking: 3
      },
    },
  },
];

export const sumsOfValues: { [key: string]: number } = {
  "Price": 4.81,
  "Distance": 4.04,
  "# of Rooms": 6.25
};

// Criteria Data
export const criteria: ICriteria[] = [
  { id: "c1", title: "Price", minmax: "MIN", weight: 2.466, weightPercentage: 65.865 },
  { id: "c2", title: "Distance (km)", minmax: "MIN", weight: 1.326, weightPercentage: 35.416 },
  { id: "c3", title: "# of Rooms", minmax: "MAX", weight: 0.306, weightPercentage: 8.173 },
  { id: "c4", title: "Size (m2)", minmax: "MAX", weight: 0.306, weightPercentage: 8.173 },
  { id: "c5", title: "Condition", minmax: "MAX", weight: 0.306, weightPercentage: 8.173 },
  { id: "c6", title: "Parking", minmax: "MAX", weight: 0.306, weightPercentage: 8.173 },
];