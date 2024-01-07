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

  /* 
    Display the results of the MCEA process
    Take the normalized values and the weights and calculate the final values
    Each alternative will have a final value for each criteria,
    which will be the normalized value multiplied by the weight% for that criteria.
    Then, for each alternative, sum the final values for each criteria.
    
    The alternative with the highest sum is the best alternative.
    Would be nice to also sort the table by the sum of final values.
  */

  normalizedAlternatives!: {[key: string]: IAlternative};

    constructor(private alternativeService: AlternativeService, private weightService: WeightService, private criteriaService: CriteriaService) {}

    ngOnInit() {
      this.normalizedAlternatives = this.alternativeService.normalizedAlternatives;
      this.alternativeService.calculateWeightedSums();
      console.log(this.normalizedAlternatives);
  }

}
