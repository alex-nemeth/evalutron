import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingService } from "../../services/loading.service";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { NavButtonGroupComponent } from "../common/nav-button-group/nav-button-group.component";
import { SimpleWeightEstimationComponent } from "../simple-weight-estimation/simple-weight-estimation.component";
import { SaatysWeightEstimation } from "../saatys-weight-estimation/saatys-weight-estimation.component";

@Component({
    selector: "eval-weights-estimation",
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        NavButtonGroupComponent,
        SimpleWeightEstimationComponent,
        SaatysWeightEstimation,
    ],
    templateUrl: "./weights-estimation.component.html",
})
export class WeightsEstimationComponent {
    usingSaatysMethod: boolean = true;

    constructor(private loadingService: LoadingService) {}

    ngAfterViewInit(): void {
        this.loadingService.hide();
    }

    logMethod() {
        console.log(this.usingSaatysMethod);
    }
}
