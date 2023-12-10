import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button
      class="bg-mcea-2 border-mcea-4 border-2 w-12 h-8 rounded-md"
      [routerLink]="route"
    >
      {{ text ? text : 'Next' }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() route!: string;
  @Input() text!: string;
}
