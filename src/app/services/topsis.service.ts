import { Injectable } from "@angular/core";
import { AlternativeService } from "./alternative.service";
import { IAlternative } from "../models/alternative.model";
import { CriteriaService } from "./criteria.service";
import { ICriteria } from "../models/criteria.model";

@Injectable({
    providedIn: "root",
})
export class TopsisService {
    constructor(
        private alternativeService: AlternativeService,
        private criteriaService: CriteriaService
    ) {}

    idealValue!: number;
    basalValue!: number;

    normalizeValues() {
        const sumsOfValues = this.alternativeService.getRawSumsOfValues();
        this.alternativeService.alternatives.forEach(
            (alternative: IAlternative) => {
                Object.keys(alternative.values.raw!).forEach((key: string) => {
                    alternative.topsisValues!.normalized = {
                        ...alternative.topsisValues?.normalized,
                        [key]:
                            this.criteriaService.criteria.find(
                                (c: ICriteria) => c.title === key
                            )?.minmax === "MIN"
                                ? -alternative.values.raw![key] /
                                  sumsOfValues[key]
                                : alternative.values.raw![key] /
                                  sumsOfValues[key],
                    };
                });
            }
        );
    }

    //     generateNormalizedValues(): any {
    //       this.alternatives.forEach((alternative: IAlternative) => {
    //           Object.keys(alternative.values.calculated!).forEach(
    //               (key: string) => {
    //                   alternative.values.normalized = {
    //                       ...alternative.values.normalized,
    //                       [key]:
    //                           alternative.values!.calculated![key] /
    //                           this.sumsOfValues[key],
    //                   };
    //               }
    //           );
    //       });
    //   }
}
