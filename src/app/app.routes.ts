import { Routes } from '@angular/router';
import { DefineCriteriaComponent } from './components/define-criteria/define-criteria.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

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
];
