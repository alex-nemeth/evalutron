import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface ICriteria {
  title: any;
  minmax: any;
}

@Component({
  selector: 'app-define-criteria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './define-criteria.component.html',
  styleUrl: './define-criteria.component.css',
})
export class DefineCriteriaComponent {
  criteriaArray: any[] = [];

  formGroup = new FormGroup({
    title: new FormControl('', [Validators.minLength(3)]),
    minmax: new FormControl('MIN', [Validators.required]),
  });

  addCriteria() {
    if (this.formGroup.valid) {
      this.criteriaArray.push(this.formGroup.value);
      this.formGroup.reset();
    }
  }
}
