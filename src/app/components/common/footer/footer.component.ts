import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "eval-footer",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./footer.component.html",
    styles: `
      :host {
         height: 2rem;
      }
    `,
})
export class FooterComponent {
    redirectTo(link: string): void {
        window.open(link, "_blank");
    }
}
