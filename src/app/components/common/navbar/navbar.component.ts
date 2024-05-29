import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: "eval-navbar",
    standalone: true,
    imports: [CommonModule, RouterModule, TranslateModule],
    templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
    currentLang: string = "en";

    #translate = inject(TranslateService);

    setLanguage(lang: string) {
        this.#translate.setDefaultLang(lang);
        this.currentLang = lang;
    }
}
