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
    sortedDataWeightedSum!: IAlternative[];
    sortedDataTopsis!: IAlternative[];

    constructor(
        private alternativeService: AlternativeService,
        private loadingService: LoadingService,
        private weightedSumService: WeightedSumService,
        private topsisService: TopsisService
    ) {}

    ngOnInit() {
        this.weightedSumService.calculateWeightedSums();
        this.sortedDataWeightedSum = this.sortByWeightedSum(
            this.alternativeService.alternatives
        ).slice();
        this.topsisService.runAllCalculations();
        this.sortedDataTopsis = this.sortByTopsis(
            this.alternativeService.alternatives
        ).slice();
    }

    ngAfterViewInit(): void {
        this.loadingService.hide();
    }

    sortByWeightedSum(alternatives: IAlternative[]) {
        return alternatives.sort((a, b) => {
            return (
                b.weightedSumValues?.finalValue! -
                a.weightedSumValues?.finalValue!
            );
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
            this.sortedDataWeightedSum = data;
            return;
        }

        this.sortedDataWeightedSum = data.sort((a, b) => {
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
