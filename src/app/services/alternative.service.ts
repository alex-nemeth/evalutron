import { Injectable } from "@angular/core";
import { CriteriaService } from "./criteria.service";
import { ICriteria } from "../models/criteria.model";
import { IAlternative } from "../models/alternative.model";
import {
    alternatives as demoAlternatives,
} from "../data/demo-data";

@Injectable({
    providedIn: "root",
})
export class AlternativeService {
    public alternatives: IAlternative[] = [];
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
    generateCalculatedValues(): void {
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

    generateNormalizedValues(): any {
        this.alternatives.forEach((alternative: IAlternative) => {
            Object.keys(alternative.values.calculated!).forEach((key: string) => {
                alternative.values.normalized = {
                    ...alternative.values.normalized,
                    [key]: alternative.values!.calculated![key] / this.sumsOfValues[key]
                };
            })
        });
    }

    calculateWeightedSums() {
        this.alternatives.forEach((alternative: IAlternative) => {
            let weightedSum = 0;
            this.criteriaService.criteria.forEach((criterion: ICriteria) => {
                const criterionValue = alternative.values.normalized![criterion.title];
                const weightedValue = criterionValue * criterion.weightPercentage!;
                weightedSum += weightedValue;
            });
            alternative.values.weightedSum = weightedSum;
        });
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



    loadDemoAlternatives() {
        //     // this.alternatives = demoAlternatives;
        //     this.sumsOfValues = demoSumsOfValues;
    }

    clearData() {
        this.alternatives = [];
        this.sumsOfValues = {};
    }
}
