import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavButtonComponent } from "../nav-button/button.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "eval-nav-button-group",
    standalone: true,
    imports: [CommonModule, NavButtonComponent, TranslateModule],
    template: `
        <div class="flex flex-row justify-between my-4">
            <eval-nav-button
                [route]="routeBack"
                [text]="'navigation.back' | translate"
            />
            <eval-nav-button
                [route]="routeForward"
                [text]="'navigation.next' | translate"
                [disabled]="disableForward"
                [tooltip]="tooltipForward"
            />
        </div>
    `,
})
export class NavButtonGroupComponent {
    @Input() routeBack!: string;
    @Input() routeForward!: string;
    @Input() disableForward!: boolean;
    @Input() tooltipForward!: string;
}
