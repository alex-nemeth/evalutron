import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlternativeService } from '../../services/alternative.service';
import { ICriteria } from '../../models/criteria.model';
import { CriteriaService } from '../../services/criteria.service';
import { IAlternative } from '../../models/alternative.model';
import { NavButtonComponent } from '../common/nav-button/button.component';

@Component({
  selector: 'app-value-normalization',
  standalone: true,
  imports: [CommonModule, NavButtonComponent],
  templateUrl: './value-normalization.component.html',
})
export class ValueNormalizationComponent {
  normalizedAlternatives!: IAlternative[];
  sumsOfValues!: IAlternative;
  criteria!: ICriteria[];
  criteriaTitles!: string[];

  constructor(private alternativeService: AlternativeService, private criteriaService: CriteriaService) {}

  ngOnInit(): void {
    // this.sumsOfValues = this.alternativeService.sumsOfValues;
    // this.normalizedAlternatives = this.alternativeService.calculatedAlternatives;
    this.criteria = this.criteriaService.criteria;
    this.criteriaTitles = this.criteriaService.getCriteriaTitles();
    // this.alternativeService.calculateNormalizedAlternatives();
  }

  getObjectKeys(obj: IAlternative) {
    return Object.keys(obj);
  }

  isNumeric(value: any) {
    return !isNaN(value);
  }
}
