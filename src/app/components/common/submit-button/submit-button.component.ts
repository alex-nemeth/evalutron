import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mcea-submit-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button
              type="submit"
              class="bg-mcea-2 w-full h-8 rounded-md
                    hover:bg-opacity-80 hover:scale-105
                    active:bg-opacity-50
                    transition-all"
              >
                {{text}}
            </button>`,
  styles: [
    `:host {
        width: 100%;
        height: 100%;
    }`
  ]
})
export class SubmitButtonComponent {
  @Input() text!: string;
}
