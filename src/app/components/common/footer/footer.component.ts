import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { version, date } from "../../../constants/version.constants";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "eval-footer",
    standalone: true,
    imports: [CommonModule, MatIconModule, TranslateModule],
    templateUrl: "./footer.component.html",
    styles: `
      :host {
         height: 2rem;
      }
    `,
})
export class FooterComponent {
    version = version;
    date = date;

    redirectTo(link: string): void {
        window.open(link, "_blank");
    }
}
