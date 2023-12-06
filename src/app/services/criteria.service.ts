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
    this.initializeWeights();
  }

  initializeWeights(): void {
    this.criteria.forEach((criterion, id) => {
      criterion.weights = [{ id: 'c1', weight: 5 }];
      // criterion.weights = Array(criteria.length).fill(0);
    });
  }

  addCriteria(criteria: ICriteria) {
    criteria.id = 'c' + (this.criteria.length + 1);
    this.criteria.push(criteria);
  }

  // setWeight(criteria1: ICriteria, criteria2: ICriteria, weight: number): void {
  //   criteria1.weights?[criteria2.id] = weight;
  // }
}
