import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CriteriaService } from '../../services/criteria.service';
import { ButtonComponent } from '../button/button.component';
import { AlternativeService } from '../../services/alternative.service';
import { ICriteria } from '../../models/criteria.model';

interface IAlternative {
  [key: string]: string; // Assuming all values are strings, you can adjust this based on your actual data types
}

@Component({
  standalone: true,
  selector: 'app-define-alternatives',
  templateUrl: './define-alternatives.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent],
})
export class DefineAlternativesComponent {
  criteria!: ICriteria[];
  alternatives!: IAlternative[];

  formGroup = new FormGroup({});

  constructor(
    private criteriaService: CriteriaService,
    private alternativeService: AlternativeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.alternativeService.initAlternatives();
    this.alternatives = this.alternativeService.alternatives;
    this.criteria = this.criteriaService.criteria;
    this.initForm();
  }

  initForm() {
    const formControls: { [key: string]: AbstractControl } = {};
    formControls['Title'] = this.formBuilder.control('', Validators.required);
    this.criteria.forEach((criterion: ICriteria) => {
      formControls[criterion.title] = this.formBuilder.control(
        '',
        Validators.required
      );
    });
    this.formGroup = this.formBuilder.group(formControls);
  }

  addAlternative() {
    console.log(this.formGroup.value);
    this.alternatives.push({
      id: `a${this.alternatives.length + 1}`,
      ...this.formGroup.value,
    });
  }

  getObjectKeys(obj: IAlternative) {
    return Object.keys(obj);
  }
}
