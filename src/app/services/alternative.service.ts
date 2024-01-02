import { Injectable } from "@angular/core";
import { CriteriaService } from "./criteria.service";
import { ICriteria } from "../models/criteria.model";

@Injectable({
    providedIn: "root",
})
export class AlternativeService {
    public alternatives: {}[] = [
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
    public calculatedAlternatives: {}[] = [
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
    public sumsOfValues: { [key: string]: number } = {
        "Price": 4.81,
        "Distance": 4.04,
        "# of Rooms": 6.25
      };
    public maxValues: { [key: string]: number } = {};
    public minValues: { [key: string]: number } = {};

    constructor(private criteriaService: CriteriaService) {}

    initAlternatives() {
        if (!this.alternatives) {
            this.alternatives = [];
        }
    }

    findMaxValues() {
        const maxValues: { [key: string]: number } = {};
        this.alternatives.forEach((obj: Record<string, number>) => {
            Object.keys(obj).forEach((key) => {
                if (key === "id" || key === "Title") return;
                if (!(key in maxValues) || Number(obj[key]) > maxValues[key])
                    maxValues[key] = Number(obj[key]);
            });
        });
        this.maxValues = maxValues;
    }

    findMinValues() {
        const minValues: { [key: string]: number } = {};
        this.alternatives.forEach((obj: Record<string, number>) => {
            Object.keys(obj).forEach((key) => {
                if (key !== "id" && key !== "Title")
                    if (
                        !(key in minValues) ||
                        Number(obj[key]) < minValues[key]
                    ) {
                        minValues[key] = Number(obj[key]);
                    }
            });
        });

        this.minValues = minValues;
    }

    formatValue(value: number): number {
        return Number(value.toPrecision(3));
    }

    calculateAlternativesValues() {
        this.findMinValues();
        this.findMaxValues();

        const normalizedAlternatives: { [key: string]: number }[] = [];

        this.alternatives.forEach((obj: Record<string, number>) => {
            const normalizedAlternative: Record<string, number> = {};

            Object.keys(obj).forEach((key: string) => {
                normalizedAlternative[key] =
                    key === "id" || key === "Title"
                        ? obj[key]
                        : this.criteriaService.criteria.find(
                              (c: ICriteria) => c.title === key
                          )?.minmax === "MIN"
                        ? this.formatValue(this.minValues[key] / obj[key])
                        : this.formatValue(obj[key] / this.maxValues[key]);
            });

            normalizedAlternatives.push(normalizedAlternative);
        });

        this.calculatedAlternatives = normalizedAlternatives;
        this.getSumsOfValues();
        console.log(this.calculatedAlternatives);
    }

    getSumsOfValues() {
        let sumsOfValues = {};
        this.criteriaService.criteria.forEach((c: ICriteria) => {
            let sum = 0;
            this.calculatedAlternatives.forEach((a: any) => {
                sum += a[c.title];
            })
            sumsOfValues = {...sumsOfValues, [c.title]: sum};
        })
        this.sumsOfValues = sumsOfValues
    }
}
