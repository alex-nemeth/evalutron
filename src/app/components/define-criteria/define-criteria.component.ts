import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-define-criteria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './define-criteria.component.html',
  styleUrl: './define-criteria.component.css',
})
export class DefineCriteriaComponent {
  criteriaArray = [];

  ngOnInit() {}
}
