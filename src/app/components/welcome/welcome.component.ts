import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavButtonComponent } from "../common/nav-button/button.component";
import { AlternativeService } from "../../services/alternative.service";
import { CriteriaService } from "../../services/criteria.service";

@Component({
    standalone: true,
    selector: "app-welcome",
    templateUrl: "./welcome.component.html",
    imports: [CommonModule, RouterModule, NavButtonComponent],
})
export class WelcomeComponent {

    constructor(
        private alternativeService: AlternativeService,
        private criteriaService: CriteriaService
    ){}

    ngOnInit() {
        this.alternativeService.clearData();
        this.criteriaService.clearData();
    }

    loadDemoData() {
        this.alternativeService.loadDemoAlternatives();
        this.criteriaService.loadDemoCriteria();
    }
}
