import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],

  template: `
    <div class="flex justify-center items-center h-full w-full bg-black bg-opacity-60">
      <mat-spinner></mat-spinner>
    </div>`,

  styles: [`
      :host {
        height: 100%;
        width: 100%;
        position: fixed;
      }
  `]
})
export class LoadingSpinnerComponent { }
