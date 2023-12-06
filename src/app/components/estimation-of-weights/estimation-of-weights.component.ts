import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaService } from '../../services/criteria.service';
import { FormsModule } from '@angular/forms';
import { ICriteria } from '../../models/criteria.model';

@Component({
  standalone: true,
  selector: 'app-estimation-of-weights',
  templateUrl: './estimation-of-weights.component.html',
  styles: `
    input:disabled {
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

  logCriteria() {
    console.log(this.criteria);
  }

  comparingSameCriteria(id1: string, id2: string) {
    return id1 === id2;
  }

  manageWeights(event: any) {
    const weight = Number(event.target.value);
    const id1: string = event.target.id.split('-')[0];
    const id2: string = event.target.id.split('-')[1];

    if (weight < 1 || weight > 9) {
      alert('Invalid weight value. Please enter a value between 1 and 9.');
      return;
    }
    const criterionToUpdate = this.criteria.find(
      (criteria) => criteria.id === id1
    );
    const existingWeight = criterionToUpdate!.weights!.find(
      (weight) => weight.id === id2
    );
    existingWeight
      ? (existingWeight.weight = weight)
      : criterionToUpdate!.weights!.push({ id: id2, weight: weight });

    // Add reciprocal weight to criteria2 for criteria1
    const criterion2ToUpdate = this.criteria.find(
      (criteria) => criteria.id === id2
    );
    const reciprocalWeight = 1 / weight;
    const existingReciprocalWeight = criterion2ToUpdate!.weights!.find(
      (w) => w.id === id1
    );
    if (existingReciprocalWeight) {
      existingReciprocalWeight.weight = reciprocalWeight;
    } else {
      criterion2ToUpdate!.weights!.push({ id: id1, weight: reciprocalWeight });
    }
    const fieldToAdjust = document.getElementById(`${id2}-${id1}`);
    fieldToAdjust!;
    console.log(fieldToAdjust);
  }
}
