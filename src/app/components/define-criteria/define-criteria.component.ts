import { Component } from "@angular/core";
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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    standalone: true,
    selector: "app-define-criteria",
    templateUrl: "./define-criteria.component.html",
    imports: [CommonModule, ReactiveFormsModule, RouterModule, NavButtonComponent, SubmitButtonComponent, MatFormFieldModule, MatInputModule],
})
export class DefineCriteriaComponent {
    criteria!: ICriteria[];

    formGroup = new FormGroup({
        title: new FormControl("", [Validators.required]),
        minmax: new FormControl("MIN", [Validators.required]),
    });

    constructor(private criteriaService: CriteriaService) { }

    ngOnInit(): void {
        this.criteria = this.criteriaService.criteria;
    }

    addCriteria() {
        if (this.formGroup.valid) {
            this.criteriaService.addCriteria(this.formGroup.value as ICriteria);
            this.formGroup.reset();
            this.formGroup.controls.minmax.setValue("MIN");
        }
    }

    removeCriteria(id: string) {
        this.criteriaService.removeCriteria(id);
        this.criteria = this.criteriaService.criteria;
    }
}
