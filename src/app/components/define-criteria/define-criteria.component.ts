import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface ICriteria {
  title: string;
  minmax: string;
}

@Component({
  selector: 'app-define-criteria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './define-criteria.component.html',
  styleUrl: './define-criteria.component.css',
})
export class DefineCriteriaComponent {
  criteriaArray: ICriteria[] = [
    {
      title: 'Test',
      minmax: 'MAX',
    },
  ];

  formGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    minmax: new FormControl('MIN', [Validators.required]),
  });

  addCriteria() {
    if (this.formGroup.valid) {
      this.criteriaArray.push(this.formGroup.value as ICriteria);
      this.formGroup.reset();
      this.formGroup.controls.minmax.setValue('MIN');
    }
  }
}
