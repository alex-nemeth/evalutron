import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavButtonComponent } from '../common/nav-button/button.component';
import { AlternativeService } from '../../services/alternative.service';
import { WeightService } from '../../services/weight.service';
import { CriteriaService } from '../../services/criteria.service';
import { IAlternative } from '../../models/alternative.model';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, NavButtonComponent],
  templateUrl: './summary.component.html'
})
export class SummaryComponent {

  alternatives!: IAlternative[];

  constructor(private alternativeService: AlternativeService, private weightService: WeightService, private criteriaService: CriteriaService) { }

  ngOnInit() {
    this.alternatives = this.alternativeService.alternatives;
    this.alternativeService.calculateWeightedSums();
  }

  sortBySum(alternatives: IAlternative[]) {
    return alternatives.sort((a, b) => {
      return b.values.weightedSum! - a.values.weightedSum!;
    })
  }

}
