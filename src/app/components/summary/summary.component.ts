import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavButtonComponent } from "../common/nav-button/button.component";
import { AlternativeService } from "../../services/alternative.service";
import { IAlternative } from "../../models/alternative.model";
import { MatTableModule } from "@angular/material/table";
import { LoadingService } from "../../services/loading.service";
import { TranslateModule } from "@ngx-translate/core";
import { MatSortModule, Sort } from "@angular/material/sort";
import { WeightedSumService } from "../../services/weighted-sum.service";
import { TopsisService } from "../../services/topsis.service";

@Component({
    selector: "app-summary",
    standalone: true,
    imports: [
        CommonModule,
        NavButtonComponent,
        MatTableModule,
        MatSortModule,
        TranslateModule,
    ],
    templateUrl: "./summary.component.html",
})
export class SummaryComponent {
    sortedData!: IAlternative[];

    constructor(
        private alternativeService: AlternativeService,
        private loadingService: LoadingService,
        private weightedSumService: WeightedSumService,
        private topsisService: TopsisService
    ) {}

    ngOnInit() {
        this.weightedSumService.runAllCalculations();
        this.topsisService.runAllCalculations();
        this.alternativeService.calculateScore();
        this.sortedData = this.sortByScore(
            this.alternativeService.alternatives
        ).slice();
    }

    ngAfterViewInit(): void {
        this.loadingService.hide();
    }

    sortByScore(alternatives: IAlternative[]) {
        return alternatives.sort((a, b) => {
            return b.score! - a.score!;
        });
    }

    sortByTopsis(alternatives: IAlternative[]) {
        return alternatives.sort((a, b) => {
            return b.topsisValues?.finalValue! - a.topsisValues?.finalValue!;
        });
    }

    sortData(sort: Sort) {
        const data = this.alternativeService.alternatives.slice();
        if (!sort.active || sort.direction === "") {
            this.sortedData = data;
            return;
        }

        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "id":
                    return this.compare(
                        Number(a.id!.split("a")[1]),
                        Number(b.id!.split("a")[1]),
                        isAsc
                    );
                case "title":
                    return this.compare(a.title, b.title, isAsc);
                case "weightedSum":
                    return this.compare(
                        a.weightedSumValues?.finalValue!,
                        b.weightedSumValues?.finalValue!,
                        isAsc
                    );
                case "topsis":
                    return this.compare(
                        a.topsisValues!.finalValue!,
                        b.topsisValues!.finalValue!,
                        isAsc
                    );
                case "score":
                    return this.compare(a.score!, b.score!, isAsc);
                default:
                    return this.compare(
                        a.weightedSumValues?.finalValue!,
                        b.weightedSumValues?.finalValue!,
                        isAsc
                    );
            }
        });
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
