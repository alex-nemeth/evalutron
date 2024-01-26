import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavButtonComponent } from "../common/nav-button/button.component";
import { AlternativeService } from "../../services/alternative.service";
import { WeightService } from "../../services/weight.service";
import { CriteriaService } from "../../services/criteria.service";
import { IAlternative } from "../../models/alternative.model";
import { MatTableModule } from "@angular/material/table";
import { LoadingService } from "../../services/loading.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "app-summary",
    standalone: true,
    imports: [
        CommonModule,
        NavButtonComponent,
        MatTableModule,
        TranslateModule,
    ],
    templateUrl: "./summary.component.html",
})
export class SummaryComponent {
    alternatives!: IAlternative[];

    constructor(
        private alternativeService: AlternativeService,
        private weightService: WeightService,
        private criteriaService: CriteriaService,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.alternatives = this.alternativeService.alternatives;
        this.alternativeService.calculateWeightedSums();
    }

    ngAfterViewInit(): void {
        this.loadingService.hide();
    }

    sortBySum(alternatives: IAlternative[]) {
        return alternatives.sort((a, b) => {
            return b.values.weightedSum! - a.values.weightedSum!;
        });
    }
}
