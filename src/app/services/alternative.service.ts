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
    public calculatedAlternatives: {}[] = [];
    public normalizedAlternatives: any = {};
    public sumsOfValues: { [key: string]: number } = {};
    public maxValues: { [key: string]: number } = {};
    public minValues: { [key: string]: number } = {};

    constructor(private criteriaService: CriteriaService) {}

    // initAlternatives() {
    //     if (!this.alternatives) {
    //         this.alternatives = [];
    //     }
    // }

    addAlternative(alternative: Partial<IAlternative>) {
      this.alternatives.push({
        id: `a${this.alternatives.length + 1}`,
        ...alternative,
    } as IAlternative);
    }

    // findMaxValues() {
    //     const maxValues: { [key: string]: number } = {};
    //     this.alternatives.forEach((obj: Record<string, number>) => {
    //         Object.keys(obj).forEach((key) => {
    //             if (key === "id" || key === "Title") return;
    //             if (!(key in maxValues) || Number(obj[key]) > maxValues[key])
    //                 maxValues[key] = Number(obj[key]);
    //         });
    //     });
    //     this.maxValues = maxValues;
    // }

    // findMinValues() {
    //     const minValues: { [key: string]: number } = {};
    //     this.alternatives.forEach((obj: Record<string, number>) => {
    //         Object.keys(obj).forEach((key) => {
    //             if (key !== "id" && key !== "Title")
    //                 if (
    //                     !(key in minValues) ||
    //                     Number(obj[key]) < minValues[key]
    //                 ) {
    //                     minValues[key] = Number(obj[key]);
    //                 }
    //         });
    //     });

    //     this.minValues = minValues;
    // }

    formatValue(value: number): number {
        return Number(value.toPrecision(3));
    }

    // calculateAlternativesValues() {
    //     this.findMinValues();
    //     this.findMaxValues();

    //     const normalizedAlternatives: { [key: string]: number }[] = [];

    //     this.alternatives.forEach((obj: Record<string, number>) => {
    //         const normalizedAlternative: Record<string, number> = {};

    //         Object.keys(obj).forEach((key: string) => {
    //             normalizedAlternative[key] =
    //                 key === "id" || key === "Title"
    //                     ? obj[key]
    //                     : this.criteriaService.criteria.find(
    //                           (c: ICriteria) => c.title === key
    //                       )?.minmax === "MIN"
    //                     ? this.formatValue(this.minValues[key] / obj[key])
    //                     : this.formatValue(obj[key] / this.maxValues[key]);
    //         });

    //         normalizedAlternatives.push(normalizedAlternative);
    //     });

    //     this.calculatedAlternatives = normalizedAlternatives;
    //     this.getSumsOfValues();
    // }

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

      calculateWeightedSums() {
      for (const key in this.normalizedAlternatives) {
        if (this.normalizedAlternatives.hasOwnProperty(key)) {
          const alternative = this.normalizedAlternatives[key];
      
          let weightedSum = 0;
      
          this.criteriaService.criteria.forEach((criterion) => {
            const criterionValue = alternative[criterion.title];
            const weightedValue = criterionValue * criterion.weightPercentage!;
            weightedSum += weightedValue;
          });
      
          alternative['WeightedSum'] = weightedSum;
        }
      }
    }

    loadDemoAlternatives() {
        // this.alternatives = demoAlternatives;
        this.calculatedAlternatives = demoCalculatedAlternatives;
        this.normalizedAlternatives = demoNormalizedAlternatives;
        this.sumsOfValues = demoSumsOfValues;
    }

    clearData() {
        this.alternatives = [];
        this.calculatedAlternatives = [];
        this.normalizedAlternatives = {};
        this.sumsOfValues = {};
    }
}
