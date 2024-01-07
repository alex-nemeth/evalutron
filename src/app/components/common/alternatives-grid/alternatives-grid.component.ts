import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaService } from '../../../services/criteria.service';
import { AlternativeService } from '../../../services/alternative.service';
import { IAlternative } from '../../../models/alternative.model';
import { AlternativesGridMode } from '../../../enums/alternatives-grid-mode.enum';

@Component({
  selector: 'mcea-alternatives-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alternatives-grid.component.html'
})
export class AlternativesGridComponent {

  @Input() gridMode!: AlternativesGridMode;

  columns!: number;
  alternatives!: IAlternative[];

  constructor(private criteriaService: CriteriaService, private alternativeService: AlternativeService) {}

  ngOnInit(): void {
    this.columns = this.criteriaService.criteria.length + 1;
    this.getAlternatives();
  }

  getAlternatives(): void {
    switch (this.gridMode) {
      case AlternativesGridMode.Normal:
        this.alternatives = this.alternativeService.alternatives;
        break;
      case AlternativesGridMode.Calculated:
        this.alternatives = this.alternativeService.calculatedAlternatives;
        break;
      case AlternativesGridMode.Normalized:
        this.alternatives = this.alternativeService.normalizedAlternatives;
        break;
      default:
        this.alternatives = this.alternativeService.alternatives;
        break;
    }
  }

  getObjectKeys(obj: IAlternative) {
    return Object.keys(obj);
  }

}
