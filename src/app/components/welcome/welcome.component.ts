import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavButtonComponent } from "../common/nav-button/button.component";
import { AlternativeService } from "../../services/alternative.service";
import { CriteriaService } from "../../services/criteria.service";
import { MatButtonModule } from "@angular/material/button";
import { LoadingService } from "../../services/loading.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { FooterComponent } from "../common/footer/footer.component";

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
        FooterComponent,
    ],
})
export class WelcomeComponent {
    currentLang: string = "en";

    constructor(
        private alternativeService: AlternativeService,
        private criteriaService: CriteriaService,
        private loadingService: LoadingService,
        private translateService: TranslateService
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

    setLanguage(lang: string) {
        this.translateService.setDefaultLang(lang);
        this.currentLang = lang;
    }
}
