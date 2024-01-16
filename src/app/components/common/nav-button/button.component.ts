import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LoadingService } from "../../../services/loading.service";

@Component({
    selector: "mcea-nav-button",
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <button
            class="bg-primary px-4 h-10 rounded-md font-bold
                    hover:bg-opacity-80 hover:scale-110
                    active:bg-opacity-50
                    transition-all"
            (click)="onClick()"
            [routerLink]="route"
        >
            {{ text ? text : "Next" }}
        </button>
    `
})
export class NavButtonComponent {
    @Input() route!: string;
    @Input() text!: string;

    constructor(private loadingService: LoadingService) { }

    onClick() {
        this.loadingService.show();
    }
}
