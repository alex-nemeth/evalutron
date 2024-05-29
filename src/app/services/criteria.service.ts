import { Injectable, inject } from "@angular/core";
import { ICriteria } from "../models/criteria.model";
import { criteria as demoCriteriaEN } from "../data/properties-en.data";
import { criteria as demoCriteriaSK } from "../data/properties-sk.data";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: "root",
})
export class CriteriaService {
    public criteria: ICriteria[] = [];

    #translate = inject(TranslateService);

    addCriteria(criteria: ICriteria) {
        criteria.id = "c" + (this.criteria.length + 1);
        this.criteria.push(criteria);
    }

    getCriteriaTitles(): string[] {
        return this.criteria.map((criterion) => criterion.title);
    }

    getCriterionDescription(criterionTitle: string): string {
        return (
            this.criteria.find((criteria) => criteria.title === criterionTitle)
                ?.description || ""
        );
    }

    hasDescription(criterionTitle: string): boolean {
        return (
            this.criteria.find((criteria) => criteria.title === criterionTitle)
                ?.description !== undefined
        );
    }

    removeCriteria(id: string) {
        this.criteria = this.criteria.filter(
            (criterion) => criterion.id !== id
        );
    }

    loadDemoCriteria() {
        this.#translate.defaultLang === "en"
            ? (this.criteria = demoCriteriaEN)
            : (this.criteria = demoCriteriaSK);
    }

    clearData() {
        this.criteria = [];
    }
}
