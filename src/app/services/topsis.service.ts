import { Injectable, inject } from "@angular/core";
import { AlternativeService } from "./alternative.service";
import { IAlternative } from "../models/alternative.model";
import { CriteriaService } from "./criteria.service";
import { ICriteria } from "../models/criteria.model";

@Injectable({
    providedIn: "root",
})
export class TopsisService {
    #as = inject(AlternativeService);
    #cs = inject(CriteriaService);

    normalizeValues() {
        const sumsOfValues = this.#as.getRawSumsOfValues();
        this.#as.alternatives.forEach((alternative: IAlternative) => {
            Object.keys(alternative.rawValues!).forEach((key: string) => {
                alternative.topsisValues!.normalized = {
                    ...alternative.topsisValues?.normalized,
                    [key]:
                        this.#cs.criteria.find(
                            (c: ICriteria) => c.title === key
                        )?.minmax === "MIN"
                            ? -alternative.rawValues![key] / sumsOfValues[key]
                            : alternative.rawValues![key] / sumsOfValues[key],
                };
            });
        });
    }

    precalculateValues() {
        this.#as.alternatives.forEach((alternative: IAlternative) => {
            Object.keys(alternative.topsisValues!.normalized!).forEach(
                (key: string) => {
                    alternative.topsisValues!.calculated = {
                        ...alternative.topsisValues?.calculated,
                        [key]:
                            alternative.topsisValues!.normalized![key] *
                            (this.#cs.criteria.find(
                                (criterion: ICriteria) =>
                                    criterion.title === key
                            )!.weightPercentage! /
                                100),
                    };
                }
            );
        });
    }

    // I = Max of above for each criteria
    // B = Min of above for each criteria
    getIdealAndBasalValues() {
        this.#cs.criteria.forEach((criterion: ICriteria) => {
            let values: number[] = [];
            this.#as.alternatives.forEach((alternative: IAlternative) =>
                values.push(
                    alternative.topsisValues!.calculated![criterion.title]
                )
            );
            criterion.idealValue = Math.max(...values);
            criterion.basalValue = Math.min(...values);
        });
    }

    getVPlusAndMinusValues() {
        // iterate over alternatives
        // for each alternative, take calculated value for each criteria
        // (calculatedValue - idealValue) ^ 2
        this.#as.alternatives.forEach((alternative: IAlternative) => {
            alternative.topsisValues!.vPlus = 0;
            alternative.topsisValues!.vMinus = 0;
            this.#cs.criteria.forEach((criterion: ICriteria) => {
                alternative.topsisValues!.vPlus! += Math.pow(
                    alternative.topsisValues!.calculated![criterion.title] -
                        criterion.idealValue!,
                    2
                );
                alternative.topsisValues!.vMinus! += Math.pow(
                    alternative.topsisValues!.calculated![criterion.title] -
                        criterion.basalValue!,
                    2
                );
            });
            alternative.topsisValues!.vPlus = Math.sqrt(
                alternative.topsisValues!.vPlus
            );
            alternative.topsisValues!.vMinus = Math.sqrt(
                alternative.topsisValues!.vMinus
            );
        });
    }

    getFinalValues() {
        this.#as.alternatives.forEach((alternative: IAlternative) => {
            alternative.topsisValues!.finalValue =
                (alternative.topsisValues!.vMinus! /
                    (alternative.topsisValues!.vMinus! +
                        alternative.topsisValues!.vPlus!)) *
                100;
        });
    }

    runAllCalculations() {
        this.normalizeValues();
        this.precalculateValues();
        this.getIdealAndBasalValues();
        this.getVPlusAndMinusValues();
        this.getFinalValues();
    }
}
