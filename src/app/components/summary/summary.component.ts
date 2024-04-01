import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavButtonComponent } from "../common/nav-button/button.component";
import { AlternativeService } from "../../services/alternative.service";
import { IAlternative } from "../../models/alternative.model";
import { MatTableModule } from "@angular/material/table";
import { LoadingService } from "../../services/loading.service";
import { TranslateModule } from "@ngx-translate/core";
import { MatSortModule, Sort } from "@angular/material/sort";

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
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.alternativeService.calculateWeightedSums();
        this.sortedData = this.sortBySum(
            this.alternativeService.alternatives
        ).slice();
        console.log("a1".split("a"));
    }

    ngAfterViewInit(): void {
        this.loadingService.hide();
    }

    sortBySum(alternatives: IAlternative[]) {
        return alternatives.sort((a, b) => {
            return b.values.weightedSum! - a.values.weightedSum!;
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
                        a.values.weightedSum!,
                        b.values.weightedSum!,
                        isAsc
                    );
                default:
                    return this.compare(
                        a.values.weightedSum!,
                        b.values.weightedSum!,
                        isAsc
                    );
            }
        });
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
