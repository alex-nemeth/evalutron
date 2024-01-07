import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ButtonComponent } from "../common/button/button.component";

@Component({
    standalone: true,
    selector: "app-welcome",
    templateUrl: "./welcome.component.html",
    imports: [CommonModule, RouterModule, ButtonComponent],
})
export class WelcomeComponent {}
