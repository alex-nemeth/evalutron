import { Component, ViewChild } from "@angular/core";
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
import { NavButtonComponent } from "../common/nav-button/button.component";
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
        TranslateModule,
    ],
    styles: [
        `
            /* Adjust the width of the action column */
            .mat-column-actions {
                flex: 0 0 100px;
            }

            /* Align the action column to the right */
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

    criteria!: ICriteria[];

    formGroup = new FormGroup({
        title: new FormControl("", [Validators.required]),
        minmax: new FormControl("MIN", [Validators.required]),
    });

    constructor(
        private criteriaService: CriteriaService,
        private loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.criteria = this.criteriaService.criteria;
    }

    ngAfterViewInit(): void {
        this.loadingService.hide();
    }

    addCriteria() {
        if (this.formGroup.valid) {
            this.criteriaService.addCriteria(this.formGroup.value as ICriteria);
            this.formGroup.reset();
            this.formGroup.controls.minmax.setValue("MIN");
            this.table.renderRows();
        }
    }

    removeCriteria(id: string) {
        this.criteriaService.removeCriteria(id);
        this.criteria = this.criteriaService.criteria;
        this.table.renderRows();
    }

    showAlert() {
        alert("Please define at least 2 criteria.");
    }
}
