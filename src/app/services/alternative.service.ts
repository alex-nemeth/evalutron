import { Injectable } from "@angular/core";
import { CriteriaService } from "./criteria.service";
import { ICriteria } from "../models/criteria.model";
import { IAlternative } from "../models/alternative.model";
import { alternatives as demoAlternativesEN } from "../data/properties-en.data";
import { alternatives as demoAlternativesSK } from "../data/properties-sk.data";
import { BehaviorSubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: "root",
})
export class AlternativeService {
    public alternatives: IAlternative[] = [];
    public sumsOfValues: { [key: string]: number } = {};
    public maxValues: { [key: string]: number } = {};
    public minValues: { [key: string]: number } = {};

    public alternativesChangedBS = new BehaviorSubject<any>(null);

    constructor(
        private criteriaService: CriteriaService,
        private translateService: TranslateService
    ) {}

    addAlternative(alternative: Partial<IAlternative>) {
        this.alternatives.push({
            id: `a${this.alternatives.length + 1}`,
            ...alternative,
        } as IAlternative);
        this.alternativesChangedBS.next(true);
    }

    removeAlternative(id: string) {
        this.alternatives = this.alternatives.filter(
            (alternative: IAlternative) => alternative.id !== id
        );
    }

    findMaxValues() {
        const maxValues: { [key: string]: number } = {};
        this.alternatives.forEach((alternative: IAlternative) => {
            Object.keys(alternative.rawValues!).forEach((key) => {
                if (
                    !(key in maxValues) ||
                    Number(alternative.rawValues![key]) > maxValues[key]
                )
                    maxValues[key] = Number(alternative.rawValues![key]);
            });
        });
        this.maxValues = maxValues;
    }

    findMinValues() {
        const minValues: { [key: string]: number } = {};
        this.alternatives.forEach((alternative: IAlternative) => {
            Object.keys(alternative.rawValues!).forEach((key) => {
                if (
                    !(key in minValues) ||
                    Number(alternative.rawValues![key]) < minValues[key]
                )
                    minValues[key] = Number(alternative.rawValues![key]);
            });
        });
        this.minValues = minValues;
    }

    findMinMaxValues() {
        this.findMinValues();
        this.findMaxValues();
    }

    getRawSumsOfValues() {
        let sumsOfValues = {};
        this.criteriaService.criteria.forEach((c: ICriteria) => {
            let sum = 0;
            this.alternatives.forEach(
                (alt: IAlternative) => (sum += alt.rawValues![c.title])
            );
            sumsOfValues = { ...sumsOfValues, [c.title]: sum };
        });
        this.sumsOfValues = sumsOfValues;
        return this.sumsOfValues;
    }

    loadDemoAlternatives() {
        this.translateService.defaultLang === "en"
            ? (this.alternatives = demoAlternativesEN)
            : (this.alternatives = demoAlternativesSK);
    }

    clearData() {
        this.alternatives = [];
        this.sumsOfValues = {};
    }
}
