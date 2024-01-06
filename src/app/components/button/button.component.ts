import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-button",
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <button
            class="bg-mcea-2 px-2 h-8 rounded-md font-bold hover:bg-opacity-80 hover:scale-105 transition-all active:bg-opacity-50"
            [routerLink]="route"
        >
            {{ text ? text : "Next" }}
        </button>
    `,
})
export class ButtonComponent {
    @Input() route!: string;
    @Input() text!: string;
}
