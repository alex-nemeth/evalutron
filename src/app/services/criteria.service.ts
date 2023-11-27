import { Injectable } from '@angular/core';
import { ICriteria } from '../models/criteria.model';

@Injectable({
  providedIn: 'root',
})
export class CriteriaService {
  // Currently has 3 placeholder criteria
  // to speed up testing during development.
  public criteria: ICriteria[] = [
    { id: 'c1', title: 'Price', minmax: 'MIN' },
    { id: 'c2', title: 'Distance', minmax: 'MIN' },
    { id: 'c3', title: '# of Rooms', minmax: 'MAX' },
  ];

  ngOnInit(): void {
    this.initializeWeights(this.criteria);
  }

  initializeWeights(criteria: ICriteria[]): void {
    criteria.forEach((criterion, id) => {
      criterion.weights = Array(criteria.length).fill(0);
      criterion.id = 'c' + id;
    });
  }

  addCriteria(criteria: ICriteria) {
    this.criteria.push(criteria);
  }

  // setWeight(criteria1: ICriteria, criteria2: ICriteria, weight: number): void {
  //   criteria1.weights?[criteria2.id] = weight;
  // }
}
