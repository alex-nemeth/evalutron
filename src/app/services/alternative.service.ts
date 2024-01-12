import { Injectable } from "@angular/core";
import { CriteriaService } from "./criteria.service";
import { ICriteria } from "../models/criteria.model";
import { IAlternative } from "../models/alternative.model";
import {
    alternatives as demoAlternatives,
    calculatedAlternatives as demoCalculatedAlternatives,
    normalizedAlternatives as demoNormalizedAlternatives,
    sumsOfValues as demoSumsOfValues
} from "../data/demo-data";

@Injectable({
    providedIn: "root",
})
export class AlternativeService {
    public alternatives: IAlternative[] = [];
    // public calculatedAlternatives: {}[] = [];
    // public normalizedAlternatives: any = {};
    public sumsOfValues: { [key: string]: number } = {};
    public maxValues: { [key: string]: number } = {};
    public minValues: { [key: string]: number } = {};

    constructor(private criteriaService: CriteriaService) { }

    addAlternative(alternative: Partial<IAlternative>) {
        this.alternatives.push({
            id: `a${this.alternatives.length + 1}`,
            ...alternative,
        } as IAlternative);
    }

    findMaxValues() {
        const maxValues: { [key: string]: number } = {};
        this.alternatives.forEach((alternative: IAlternative) => {
            Object.keys(alternative.values.raw!).forEach((key) => {
                if (!(key in maxValues) || Number(alternative.values.raw![key]) > maxValues[key])
                    maxValues[key] = Number(alternative.values.raw![key]);
            });
        });
        this.maxValues = maxValues;
    }

    findMinValues() {
        const minValues: { [key: string]: number } = {};
        this.alternatives.forEach((alternative: IAlternative) => {
            Object.keys(alternative.values.raw!).forEach((key) => {
                if (!(key in minValues) || Number(alternative.values.raw![key]) < minValues[key])
                    minValues[key] = Number(alternative.values.raw![key]);
            });
        });
        this.minValues = minValues;
    }

    formatValue(value: number): number {
        return Number(value.toPrecision(3));
    }

    // @TODO: Assure that the values are being calculated correctly
    generateCalculatedAlternatives() {
        this.findMinValues();
        this.findMaxValues();
        this.alternatives.forEach((alternative: IAlternative) => {
            Object.keys(alternative.values.raw!).forEach((key: string) => {
                alternative.values.calculated = {
                    ...alternative.values!.calculated,
                    [key]: this.criteriaService.criteria.find(
                        (c: ICriteria) => c.title === key
                    )?.minmax === "MIN"
                        ? this.minValues[key] / alternative.values!.raw![key]
                        : alternative.values!.raw![key] / this.maxValues[key]
                };
            })
        })
        this.getSumsOfValues();
    }

    getSumsOfValues() {
        let sumsOfValues = {};
        this.criteriaService.criteria.forEach((c: ICriteria) => {
            let sum = 0;
            this.alternatives.forEach((alt: IAlternative) =>
                sum += alt.values.calculated![c.title]
            );
            sumsOfValues = { ...sumsOfValues, [c.title]: sum };
        })
        this.sumsOfValues = sumsOfValues
    }

    // calculateNormalizedAlternatives(): any {
    //     const normalizedValues: any = {};

    //     this.calculatedAlternatives.forEach((alternative: IAlternative) => {
    //       const alternativeName = alternative['Title'];
    //       normalizedValues[alternativeName] = {};

    //       let alternativeSum = 0; // Initialize the sum for the alternative

    //       Object.keys(alternative).forEach((key) => {
    //         if (key !== 'id' && key !== 'Title') {
    //           const normalizedValue =
    //             alternative[key] / this.sumsOfValues[key];
    //           normalizedValues[alternativeName][key] = normalizedValue;

    //           alternativeSum += alternative[key]; // Accumulate the sum
    //         }
    //       });

    //       normalizedValues[alternativeName]['Sum'] = alternativeSum; // Add the sum to the result
    //     });

    //     this.normalizedAlternatives = normalizedValues;
    //   }

    //   calculateWeightedSums() {
    //   for (const key in this.normalizedAlternatives) {
    //     if (this.normalizedAlternatives.hasOwnProperty(key)) {
    //       const alternative = this.normalizedAlternatives[key];

    //       let weightedSum = 0;

    //       this.criteriaService.criteria.forEach((criterion) => {
    //         const criterionValue = alternative[criterion.title];
    //         const weightedValue = criterionValue * criterion.weightPercentage!;
    //         weightedSum += weightedValue;
    //       });

    //       alternative['WeightedSum'] = weightedSum;
    //     }
    //   }
    // }

    loadDemoAlternatives() {
        //     // this.alternatives = demoAlternatives;
        //     this.calculatedAlternatives = demoCalculatedAlternatives;
        //     this.normalizedAlternatives = demoNormalizedAlternatives;
        //     this.sumsOfValues = demoSumsOfValues;
    }

    clearData() {
        this.alternatives = [];
        this.sumsOfValues = {};
    }
}
