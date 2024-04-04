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

    calculateWeightedSums() {
        this.alternativeService.alternatives.forEach(
            (alternative: IAlternative) => {
                let weightedSum = 0;
                this.criteriaService.criteria.forEach(
                    (criterion: ICriteria) => {
                        const criterionValue =
                            alternative.values.normalized![criterion.title];
                        const weightedValue =
                            criterionValue * criterion.weightPercentage!;
                        weightedSum += weightedValue;
                    }
                );
                alternative.values.weightedSum = weightedSum;
            }
        );
    }
}
