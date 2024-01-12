import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaService } from '../../../services/criteria.service';
import { AlternativeService } from '../../../services/alternative.service';
import { IAlternative } from '../../../models/alternative.model';
import { AlternativesGridMode } from '../../../enums/alternatives-grid-mode.enum';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'mcea-alternatives-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alternatives-grid.component.html'
})
export class AlternativesGridComponent {

  @Input() gridMode!: AlternativesGridMode;
  AlternativesGridMode = AlternativesGridMode;

  columns!: number;
  alternatives$!: Observable<IAlternative[]>;
  sumsOfValues!: { [key: string]: number };
  criteriaTitles!: string[];

  constructor(
    private criteriaService: CriteriaService,
    private alternativeService: AlternativeService
  ) { }

  ngOnInit(): void {
    this.columns = this.criteriaService.criteria.length + 1;
    this.alternatives$ = of(this.alternativeService.alternatives);
    this.sumsOfValues = this.alternativeService.sumsOfValues;
    this.criteriaTitles = this.criteriaService.getCriteriaTitles();

    console.log(this.gridMode);
    console.log(this.alternativeService.sumsOfValues);
  }

  getObjectKeys(obj: any) {
    return Object.keys(obj);
  }

  formatValue(value: number): number {
    return Number(value.toFixed(3));
  }

}
