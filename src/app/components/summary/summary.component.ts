import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './summary.component.html'
})
export class SummaryComponent {

  /* 
    Display the results of the MCEA process
    Take the normalized values and the weights and calculate the final values
    Each alternative will have a final value for each criteria,
    which will be the normalized value multiplied by the weight
    Then, for each alternative, sum the final values for each criteria.
    
    The alternative with the highest sum is the best alternative.
    Would be nice to also sort the table by the sum of final values.
  */

}
