import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaService } from '../../services/criteria.service';
import { Observable, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ICriteria } from '../../models/criteria.model';

@Component({
  standalone: true,
  selector: 'app-estimation-of-weights',
  templateUrl: './estimation-of-weights.component.html',
  imports: [CommonModule, FormsModule],
})
export class EstimationOfWeightsComponent {
  criteria$: Observable<ICriteria[]> = of(this.criteriaService.criteria);

  constructor(private criteriaService: CriteriaService) {}

  setWeight(criteria: ICriteria, weight: number): void {
    // this.criteriaService.setWeight(criteria, weight);
    this.criteria$.pipe(tap((criteria) => console.log(criteria)));
  }
}
