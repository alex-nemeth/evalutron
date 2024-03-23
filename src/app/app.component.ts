import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { DefineCriteriaComponent } from "./components/define-criteria/define-criteria.component";
import { NavbarComponent } from "./components/common/navbar/navbar.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ProgressBarValue } from "./enums/progress-bar.enum";
import { filter } from "rxjs";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        WelcomeComponent,
        DefineCriteriaComponent,
        NavbarComponent,
        MatProgressBarModule,
    ],
    templateUrl: "./app.component.html",
})
export class AppComponent {
    constructor(private router: Router) {}

    value = ProgressBarValue[this.router.url as keyof typeof ProgressBarValue];
    ProgressBarValue = ProgressBarValue;
    title = "Evalutron";

    ngOnInit(): void {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                this.value =
                    ProgressBarValue[
                        event.url as keyof typeof ProgressBarValue
                    ];
                console.log(this.value);
            });
    }
}
