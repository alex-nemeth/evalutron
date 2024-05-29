import { Component, NgZone, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ICriteria } from "../../models/criteria.model";
import { CriteriaService } from "../../services/criteria.service";
import { SubmitButtonComponent } from "../common/submit-button/submit-button.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTable, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LoadingService } from "../../services/loading.service";
import { NavButtonGroupComponent } from "../common/nav-button-group/nav-button-group.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AlertService } from "../../services/alert.service";
import { AlertType } from "../../enums/alert-type.enum";
import { CdkTextareaAutosize, TextFieldModule } from "@angular/cdk/text-field";
import { take } from "rxjs";

@Component({
    standalone: true,
    selector: "app-define-criteria",
    templateUrl: "./define-criteria.component.html",
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        NavButtonGroupComponent,
        SubmitButtonComponent,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        TextFieldModule,
        TranslateModule,
    ],
    styles: [
        `
            // Adjust the width of the action column
            .mat-column-actions {
                flex: 0 0 100px;
            }

            // Align the action column to the right
            .mat-header-cell.actions-header,
            .mat-cell.actions-cell {
                justify-content: flex-end;
                text-align: right;
            }
        `,
    ],
})
export class DefineCriteriaComponent {
    @ViewChild(MatTable) table!: MatTable<ICriteria[]>;
    @ViewChild("autosize") autosize!: CdkTextareaAutosize;

    criteria!: ICriteria[];

    formGroup = new FormGroup({
        title: new FormControl("", [Validators.required]),
        description: new FormControl(""),
        minmax: new FormControl("MIN", [Validators.required]),
    });

    #cs = inject(CriteriaService);
    #ls = inject(LoadingService);
    #alerts = inject(AlertService);
    #zone = inject(NgZone);

    ngOnInit(): void {
        this.criteria = this.#cs.criteria;
    }

    ngAfterViewInit(): void {
        this.#ls.hide();
    }

    addCriteria() {
        if (this.criteria.some((c) => c.title === this.formGroup.value.title)) {
            this.formGroup.controls.title.setErrors({ duplicate: true });
            return this.#alerts.showAlert(
                `Criteria with title '${this.formGroup.value.title}' already exists.`,
                AlertType.Error
            );
        }
        if (this.formGroup.valid) {
            this.#cs.addCriteria(this.formGroup.value as ICriteria);
            this.table.renderRows();
            this.formGroup.reset();
            this.formGroup.controls.title.setErrors(null);
            this.formGroup.controls.minmax.setValue("MIN");
        }
    }

    removeCriteria(id: string) {
        this.#cs.removeCriteria(id);
        this.criteria = this.#cs.criteria;
        this.table.renderRows();
    }

    triggerResize() {
        this.#zone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }
}
