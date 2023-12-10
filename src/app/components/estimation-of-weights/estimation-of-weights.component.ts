import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaService } from '../../services/criteria.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ICriteria } from '../../models/criteria.model';
import { WeightService } from '../../services/weight.service';

@Component({
  standalone: true,
  selector: 'app-estimation-of-weights',
  templateUrl: './estimation-of-weights.component.html',
  styles: `
    input:disabled {
      opacity: .50;
    }`,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class EstimationOfWeightsComponent {
  criteria!: ICriteria[];

  formGroup = new FormGroup({});

  constructor(
    private criteriaService: CriteriaService,
    private weightService: WeightService
  ) {}

  ngOnInit() {
    this.criteriaService.initializeWeights();
    this.criteria = this.criteriaService.criteria;
    const formControls: any = {};
    this.criteria.forEach((criteria) => {
      this.criteria.forEach((criteria2) => {
        formControls[`${criteria.id}-${criteria2.id}`] = new FormControl({
          value: '1',
          disabled: this.isFieldDisabled(criteria.id, criteria2.id),
        });
      });
    });
    this.formGroup = new FormGroup(formControls);
  }

  isFieldDisabled(id1: string, id2: string) {
    return id1 === id2 ? true : id1 > id2 ? true : false;
  }

  manageWeights(e: any) {
    const weight = e.target.value;
    const id = e.target.id.split('-').reverse().join('-');
    const control = this.formGroup.get(id) as AbstractControl;
    control.setValue(`1/${weight}`);
  }

  getFormControlName(id1: string, id2: string): string {
    return `${id1}-${id2}`;
  }

  setWeights() {
    this.weightService.saveWeights(this.formGroup.getRawValue());
    console.log(this.weightService.weights);
  }
}
