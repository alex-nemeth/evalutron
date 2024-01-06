import { Injectable } from "@angular/core";
import { ICriteria } from "../models/criteria.model";

@Injectable({
    providedIn: "root",
})
export class CriteriaService {
    // Currently has 3 placeholder criteria
    // to speed up testing during development.
    public criteria: ICriteria[] = [
        { id: "c1", title: "Price", minmax: "MIN", weight: 2.466, weightPercentage: 65.865 },
        { id: "c2", title: "Distance", minmax: "MIN", weight: 1.326, weightPercentage: 35.416 },
        { id: "c3", title: "# of Rooms", minmax: "MAX", weight: 0.306, weightPercentage: 8.173 },
    ];

    addCriteria(criteria: ICriteria) {
        criteria.id = "c" + (this.criteria.length + 1);
        this.criteria.push(criteria);
    }

    getCriteriaTitles(): string[] {
        return this.criteria.map((criterion) => criterion.title);
    }
}
