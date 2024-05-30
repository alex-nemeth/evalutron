import { Component, Input } from "@angular/core";


@Component({
    selector: "eval-submit-button",
    standalone: true,
    imports: [],
    template: `<button
        type="submit"
        class="bg-primary w-full h-8 rounded-md
                    hover:bg-opacity-80 hover:scale-105
                    active:bg-opacity-50
                    transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:hover:scale-100 disabled:hover:bg-opacity-100"
        [disabled]="disabled"
    >
        {{ text }}
    </button>`,
    styles: [
        `
            :host {
                width: 100%;
                height: 100%;
            }
        `,
    ],
})
export class SubmitButtonComponent {
    @Input() text!: string;
    @Input() disabled?: boolean = false;
}
