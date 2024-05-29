import { Injectable, inject } from "@angular/core";
import { AlternativeService } from "./alternative.service";
import { IAlternative } from "../models/alternative.model";
import { CriteriaService } from "./criteria.service";
import { ICriteria } from "../models/criteria.model";

@Injectable({
    providedIn: "root",
})
export class WeightedSumService {
    #as = inject(AlternativeService);
    #cs = inject(CriteriaService);

    maximizeValues() {
        this.#as.findMinMaxValues();
        this.#as.alternatives.forEach((alternative: IAlternative) => {
            Object.keys(alternative.rawValues!).forEach((key: string) => {
                alternative.weightedSumValues!.maximized = {
                    ...alternative.weightedSumValues!.maximized,
                    [key]:
                        this.#cs.criteria.find(
                            (c: ICriteria) => c.title === key
                        )?.minmax === "MIN"
                            ? this.#as.minValues[key] /
                              alternative.rawValues![key]
                            : alternative.rawValues![key] /
                              this.#as.maxValues[key],
                };
            });
        });
    }

    calculateWeightedSums() {
        this.#as.alternatives.forEach((alternative: IAlternative) => {
            let weightedSum = 0;
            this.#cs.criteria.forEach((criterion: ICriteria) => {
                const criterionValue =
                    alternative.weightedSumValues!.maximized![criterion.title];
                const weightedValue =
                    criterionValue * criterion.weightPercentage!;
                weightedSum += weightedValue;
            });
            alternative.weightedSumValues!.finalValue = weightedSum;
        });
    }

    runAllCalculations() {
        this.maximizeValues();
        this.calculateWeightedSums();
    }
}
