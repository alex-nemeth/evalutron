import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaService } from '../../services/criteria.service';
import { Observable, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ICriteria } from '../../models/criteria.model';

@Component({
  selector: 'app-estimation-of-weights',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estimation-of-weights.component.html',
  styleUrl: './estimation-of-weights.component.css',
})
export class EstimationOfWeightsComponent {
  criteria$: Observable<ICriteria[]> = of(this.criteriaService.criteria);

  constructor(private criteriaService: CriteriaService) {}

  setWeight(criteria: ICriteria, weight: number): void {
    // this.criteriaService.setWeight(criteria, weight);
    this.criteria$.pipe(tap((criteria) => console.log(criteria)));
  }
}
