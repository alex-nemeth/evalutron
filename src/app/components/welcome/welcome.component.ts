import { Component, inject } from "@angular/core";

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
        RouterModule,
        NavButtonComponent,
        MatButtonModule,
        TranslateModule,
        FooterComponent,
    ],
})
export class WelcomeComponent {
    currentLang: string = "en";

    #as = inject(AlternativeService);
    #cs = inject(CriteriaService);
    #ls = inject(LoadingService);
    #translate = inject(TranslateService);

    ngOnInit() {
        this.#as.clearData();
        this.#cs.clearData();
    }

    ngAfterViewInit(): void {
        this.#ls.hide();
    }

    loadDemoData() {
        this.#ls.show();
        this.#as.loadDemoAlternatives();
        this.#cs.loadDemoCriteria();
    }

    setLanguage(lang: string) {
        this.#translate.setDefaultLang(lang);
        this.currentLang = lang;
    }
}
