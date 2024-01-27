import { Component } from "@angular/core";
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

    constructor(private translateService: TranslateService) {}

    setLanguage(lang: string) {
        this.translateService.setDefaultLang(lang);
        this.currentLang = lang;
    }
}
