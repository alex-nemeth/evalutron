import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavButtonComponent } from "../common/nav-button/button.component";
import { AlternativeService } from "../../services/alternative.service";
import { CriteriaService } from "../../services/criteria.service";
import { MatButtonModule } from "@angular/material/button";
import { LoadingService } from "../../services/loading.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    standalone: true,
    selector: "app-welcome",
    templateUrl: "./welcome.component.html",
    imports: [
        CommonModule,
        RouterModule,
        NavButtonComponent,
        MatButtonModule,
        TranslateModule,
    ],
})
export class WelcomeComponent {
    constructor(
        private alternativeService: AlternativeService,
        private criteriaService: CriteriaService,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.alternativeService.clearData();
        this.criteriaService.clearData();
    }

    ngAfterViewInit(): void {
        this.loadingService.hide();
    }

    loadDemoData() {
        this.loadingService.show();
        this.alternativeService.loadDemoAlternatives();
        this.criteriaService.loadDemoCriteria();
    }
}
