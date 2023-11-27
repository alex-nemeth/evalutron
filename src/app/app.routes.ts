import { Routes } from '@angular/router';
import { DefineCriteriaComponent } from './components/define-criteria/define-criteria.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EstimationOfWeightsComponent } from './components/estimation-of-weights/estimation-of-weights.component';

export const routes: Routes = [
  {
    path: '',
    title: 'MCEA',
    component: WelcomeComponent,
  },
  {
    path: 'criteria',
    title: 'Define Criteria',
    component: DefineCriteriaComponent,
  },
  {
    path: 'weights-estimation',
    title: 'Estimation of Weights',
    component: EstimationOfWeightsComponent,
  },
];
