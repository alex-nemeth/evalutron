import { Injectable } from '@angular/core';
import { ICriteria } from '../models/criteria.model';

@Injectable({
  providedIn: 'root',
})
export class CriteriaService {
  // Currently has 3 placeholder criteria
  // to speed up testing during development.
  public criteria: ICriteria[] = [
    { title: 'Price', minmax: 'MIN' },
    { title: 'Distance', minmax: 'MIN' },
    { title: '# of Rooms', minmax: 'MAX' },
  ];

  addCriteria(criteria: ICriteria) {
    this.criteria.push(criteria);
  }
}
