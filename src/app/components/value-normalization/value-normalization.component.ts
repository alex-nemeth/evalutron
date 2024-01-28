import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlternativeService } from "../../services/alternative.service";
import { ICriteria } from "../../models/criteria.model";
import { CriteriaService } from "../../services/criteria.service";
import { IAlternative } from "../../models/alternative.model";
import { NavButtonComponent } from "../common/nav-button/button.component";
import { AlternativesGridComponent } from "../common/alternatives-grid/alternatives-grid.component";
import { AlternativesGridMode } from "../../enums/alternatives-grid-mode.enum";
import { LoadingService } from "../../services/loading.service";
import { TranslateModule } from "@ngx-translate/core";
import { NavButtonGroupComponent } from "../common/nav-button-group/nav-button-group.component";

@Component({
    selector: "app-value-normalization",
    standalone: true,
    imports: [
        CommonModule,
        NavButtonComponent,
        NavButtonGroupComponent,
        AlternativesGridComponent,
        TranslateModule,
    ],
    templateUrl: "./value-normalization.component.html",
})
export class ValueNormalizationComponent {
    alternatives!: IAlternative[];
    sumsOfValues!: { [key: string]: number };
    criteria!: ICriteria[];
    criteriaTitles!: string[];

    AlternativesGridMode = AlternativesGridMode;

    constructor(
        private alternativeService: AlternativeService,
        private criteriaService: CriteriaService,
        private loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.alternatives = this.alternativeService.alternatives;
        this.sumsOfValues = this.alternativeService.sumsOfValues;
        this.criteria = this.criteriaService.criteria;
        this.criteriaTitles = this.criteriaService.getCriteriaTitles();
        this.alternativeService.generateNormalizedValues();
    }

    ngAfterViewInit(): void {
        this.loadingService.hide();
    }

    isNumeric(value: any) {
        return !isNaN(value);
    }
}
