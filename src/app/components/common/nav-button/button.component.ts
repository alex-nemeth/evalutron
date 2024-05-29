import { Component, Input } from "@angular/core";

import { RouterModule } from "@angular/router";
import { LoadingService } from "../../../services/loading.service";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    selector: "eval-nav-button",
    standalone: true,
    imports: [RouterModule, MatTooltipModule],
    template: `
        <button
            class="bg-primary px-4 h-10 rounded-md font-bold
                    hover:bg-opacity-80 hover:scale-110
                    active:bg-opacity-50
                    transition-all
                    disabled:cursor-not-allowed disabled:opacity-50"
            (click)="onClick()"
            [routerLink]="route"
            [disabled]="disabled"
            matTooltip="{{ disabled ? tooltip : '' }}"
        >
            {{ text ? text : "Next" }}
        </button>
    `,
})
export class NavButtonComponent {
    @Input() route!: string;
    @Input() text!: string;
    @Input() disabled: boolean = false;
    @Input() tooltip: string = "";

    constructor(private loadingService: LoadingService) {}

    onClick() {
        this.loadingService.show();
    }
}
