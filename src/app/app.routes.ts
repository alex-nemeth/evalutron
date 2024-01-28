import { Routes } from "@angular/router";
import { DefineCriteriaComponent } from "./components/define-criteria/define-criteria.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { EstimationOfWeightsComponent } from "./components/estimation-of-weights/estimation-of-weights.component";
import { DefineAlternativesComponent } from "./components/define-alternatives/define-alternatives.component";
import { ValueNormalizationComponent } from "./components/value-normalization/value-normalization.component";
import { SummaryComponent } from "./components/summary/summary.component";

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
        component: EstimationOfWeightsComponent,
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
