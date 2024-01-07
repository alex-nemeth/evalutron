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
    alternatives!: IAlternative[];
    calculatedAlternatives!: IAlternative[];
    sumsOfValues!: {[key: string]: number};

    showCalculatedValues: boolean = false;

    AlternativesGridMode = AlternativesGridMode;

    formGroup = new FormGroup({});

    constructor(
        private criteriaService: CriteriaService,
        private alternativeService: AlternativeService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.alternativeService.initAlternatives();
        this.criteria = this.criteriaService.criteria;
        this.initForm();
    }

    initForm() {
        const formControls: { [key: string]: AbstractControl } = {};
        formControls["Title"] = this.formBuilder.control(
            "",
            Validators.required
        );
        this.criteria.forEach((criterion: ICriteria) => {
            formControls[criterion.title] = this.formBuilder.control(
                "",
                Validators.required
            );
        });
        this.formGroup = this.formBuilder.group(formControls);
    }

    addAlternative() {
        this.alternatives.push({
            id: `a${this.alternatives.length + 1}`,
            ...this.formGroup.value,
        });
        this.formGroup.reset();
    }

    toggleNormalization() {
        if (!this.showCalculatedValues) {
            this.alternativeService.calculateAlternativesValues();
            this.sumsOfValues = this.alternativeService.sumsOfValues;
        }
        this.showCalculatedValues = !this.showCalculatedValues;
    }

    ngOnDestroy() {
        this.alternativeService.calculateAlternativesValues();
    }
}
