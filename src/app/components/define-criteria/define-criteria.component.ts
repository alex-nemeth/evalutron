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
  selector: 'app-define-criteria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './define-criteria.component.html',
  styleUrl: './define-criteria.component.css',
})
export class DefineCriteriaComponent {
  criteria$ = of(this.criteriaService.criteria);

  formGroup = new FormGroup({
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
