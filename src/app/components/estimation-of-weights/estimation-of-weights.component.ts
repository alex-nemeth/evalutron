import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaService } from '../../services/criteria.service';
import { Observable, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ICriteria } from '../../models/criteria.model';
import { EventType } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-estimation-of-weights',
  templateUrl: './estimation-of-weights.component.html',
  styles: `input:disabled {
      opacity: 0;
  }`,
  imports: [CommonModule, FormsModule],
})
export class EstimationOfWeightsComponent {
  criteria!: ICriteria[];

  constructor(private criteriaService: CriteriaService) {}

  ngOnInit() {
    this.criteriaService.initializeWeights();
    this.criteria = this.criteriaService.criteria;
  }

  setWeight(criteria: ICriteria, weight: number): void {}

  logCriteria() {
    console.log(this.criteria);
  }

  comparingSameCriteria(id1: string, id2: string) {
    return id1 === id2;
  }

  manageWeights(event: any) {
    // this.criteria.filter((criteria) => criteria.id === id1)
    //   .map((criteria) => criteria.weights?.push({id2: }))
    const ids = event.target.id;
    const weight = event.target.value;
    const id1 = event.target.id.split('-')[0];
    const id2 = event.target.id.split('-')[1];
    console.log(id1, id2, 'value: ' + weight);
  }
}
