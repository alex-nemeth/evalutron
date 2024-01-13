import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    AbstractControl,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CriteriaService } from "../../services/criteria.service";
import { NavButtonComponent } from "../common/nav-button/button.component";
import { AlternativeService } from "../../services/alternative.service";
import { ICriteria } from "../../models/criteria.model";
import { AlternativesGridComponent } from "../common/alternatives-grid/alternatives-grid.component";
import { AlternativesGridMode } from "../../enums/alternatives-grid-mode.enum";
import { SubmitButtonComponent } from "../common/submit-button/submit-button.component";
import { IAlternative } from "../../models/alternative.model";

@Component({
    standalone: true,
    selector: "app-define-alternatives",
    templateUrl: "./define-alternatives.component.html",
    imports: [CommonModule, ReactiveFormsModule, RouterModule, NavButtonComponent, AlternativesGridComponent, SubmitButtonComponent],
})
export class DefineAlternativesComponent implements OnInit, OnDestroy {
    criteria!: ICriteria[];
    calculatedAlternatives!: IAlternative[];
    sumsOfValues!: { [key: string]: number };

    showCalculatedValues: boolean = false;

    AlternativesGridMode = AlternativesGridMode;

    formGroup = new FormGroup({});

    constructor(
        private criteriaService: CriteriaService,
        private alternativeService: AlternativeService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.criteria = this.criteriaService.criteria;
        this.initForm();
    }

    initForm() {
        const formControls: { [key: string]: AbstractControl } = {};
        formControls["title"] = this.formBuilder.control(
            "",
            Validators.required
        );
        this.criteria.forEach((criterion: ICriteria) => {
            formControls[criterion.title] = this.formBuilder.control(
                "", [
                Validators.required,
                Validators.min(0),
                Validators.pattern(/^\d*(\.\d+)?$/) // Regex: Only positive numbers
            ]
            );
        });
        this.formGroup = this.formBuilder.group(formControls);
    }

    addAlternative() {
        if (this.formGroup.invalid) {
            console.log('skill issue');
            return;
        }
        // Extraction of data from the form
        const { title, ...rawValues } = this.formGroup.value as {
            title: string,
            [key: string]: any
        };

        // Conversion of values to numbers
        Object.keys(rawValues).forEach((key) => {
            rawValues[key] = parseInt(rawValues[key]);
        });

        // Creation of Partial<IAlternative>
        // object to pass to the service
        const newAlternative: Partial<IAlternative> = {
            title: title,
            values: {
                raw: rawValues
            }
        };

        this.alternativeService.addAlternative(newAlternative)
        this.formGroup.reset();
    }

    toggleNormalization() {
        if (!this.showCalculatedValues) {
            this.alternativeService.generateCalculatedValues();
            this.sumsOfValues = this.alternativeService.sumsOfValues;
        }
        this.showCalculatedValues = !this.showCalculatedValues;
    }

    ngOnDestroy() {
        this.alternativeService.generateCalculatedValues();
    }
}
