import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { DefineCriteriaComponent } from "./components/define-criteria/define-criteria.component";
import { NavbarComponent } from "./components/common/navbar/navbar.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        WelcomeComponent,
        DefineCriteriaComponent,
        NavbarComponent,
    ],
    templateUrl: "./app.component.html",
})
export class AppComponent {
    title = "Evalutron";
}
