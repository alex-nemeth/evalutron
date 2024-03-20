import { Routes } from "@angular/router";
import { DefineCriteriaComponent } from "./components/define-criteria/define-criteria.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { SaatysWeightEstimation } from "./components/saatys-weight-estimation/saatys-weight-estimation.component";
import { DefineAlternativesComponent } from "./components/define-alternatives/define-alternatives.component";
import { ValueNormalizationComponent } from "./components/value-normalization/value-normalization.component";
import { SummaryComponent } from "./components/summary/summary.component";
import { WeightsEstimationComponent } from "./components/weights-estimation/weights-estimation.component";

export const routes: Routes = [
    {
        path: "",
        title: "Evalutron",
        component: WelcomeComponent,
    },
    {
        path: "criteria",
        title: "Define Criteria - Evalutron",
        component: DefineCriteriaComponent,
    },
    {
        path: "weights-estimation",
        title: "Estimation of Weights - Evalutron",
        component: WeightsEstimationComponent,
    },
    {
        path: "alternatives",
        title: "Define Alternatives - Evalutron",
        component: DefineAlternativesComponent,
    },
    {
        path: "normalization",
        title: "Normalization of Values - Evalutron",
        component: ValueNormalizationComponent,
    },
    {
        path: "summary",
        title: "Summary - Evalutron",
        component: SummaryComponent,
    },
];
