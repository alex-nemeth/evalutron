import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ICriteria } from '../../models/criteria.model';
import { CriteriaService } from '../../services/criteria.service';
import { of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-define-criteria',
  templateUrl: './define-criteria.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class DefineCriteriaComponent {
  criteria$ = of(this.criteriaService.criteria);

  formGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    minmax: new FormControl('MIN', [Validators.required]),
  });

  constructor(private criteriaService: CriteriaService) {}

  addCriteria() {
    if (this.formGroup.valid) {
      this.criteriaService.addCriteria(this.formGroup.value as ICriteria);
      this.formGroup.reset();
      this.formGroup.controls.minmax.setValue('MIN');
    }
  }
}
