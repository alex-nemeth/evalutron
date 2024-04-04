import { Injectable } from "@angular/core";
import { AlternativeService } from "./alternative.service";
import { IAlternative } from "../models/alternative.model";
import { CriteriaService } from "./criteria.service";
import { ICriteria } from "../models/criteria.model";

@Injectable({
    providedIn: "root",
})
export class WeightedSumService {
    constructor(
        private alternativeService: AlternativeService,
        private criteriaService: CriteriaService
    ) {}

    maximizeValues() {
        this.alternativeService.findMinMaxValues();
        this.alternativeService.alternatives.forEach(
            (alternative: IAlternative) => {
                Object.keys(alternative.rawValues!).forEach((key: string) => {
                    alternative.weightedSumValues!.maximized = {
                        ...alternative.weightedSumValues!.maximized,
                        [key]:
                            this.criteriaService.criteria.find(
                                (c: ICriteria) => c.title === key
                            )?.minmax === "MIN"
                                ? this.alternativeService.minValues[key] /
                                  alternative.rawValues![key]
                                : alternative.rawValues![key] /
                                  this.alternativeService.maxValues[key],
                    };
                });
            }
        );
    }

    calculateWeightedSums() {
        this.alternativeService.alternatives.forEach(
            (alternative: IAlternative) => {
                let weightedSum = 0;
                this.criteriaService.criteria.forEach(
                    (criterion: ICriteria) => {
                        const criterionValue =
                            alternative.weightedSumValues!.maximized![
                                criterion.title
                            ];
                        const weightedValue =
                            criterionValue * criterion.weightPercentage!;
                        weightedSum += weightedValue;
                    }
                );
                alternative.weightedSumValues!.finalValue = weightedSum;
            }
        );
    }
}
