import { Injectable } from '@angular/core';
import { CriteriaService } from './criteria.service';

@Injectable({
  providedIn: 'root',
})
export class AlternativeService {
  public alternatives!: {}[];

  constructor(private criteriaService: CriteriaService) {}

  initAlternatives() {
    if (!this.alternatives) {
      this.alternatives = [];
    }
  }
}
