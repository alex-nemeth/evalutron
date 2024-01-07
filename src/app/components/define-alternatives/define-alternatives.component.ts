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
import { ButtonComponent } from "../common/button/button.component";
import { AlternativeService } from "../../services/alternative.service";
import { ICriteria } from "../../models/criteria.model";
import { AlternativesGridComponent } from "../common/alternatives-grid/alternatives-grid.component";
import { AlternativesGridMode } from "../../enums/alternatives-grid-mode.enum";

interface IAlternative {
    // change to [key: string] : number
    // in case that we end up sending numbers directly from the form
    [key: string]: string;
}

@Component({
    standalone: true,
    selector: "app-define-alternatives",
    templateUrl: "./define-alternatives.component.html",
    imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent, AlternativesGridComponent],
})
export class DefineAlternativesComponent implements OnInit, OnDestroy {
    criteria!: ICriteria[];
    criteriaTitles!: string[];
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
        this.alternatives = this.alternativeService.alternatives;
        this.calculatedAlternatives =
            this.alternativeService.calculatedAlternatives;
        this.criteria = this.criteriaService.criteria;
        this.criteriaTitles = this.criteriaService.getCriteriaTitles();
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
    }

    toggleNormalization() {
        if (!this.showCalculatedValues) {
            this.alternativeService.calculateAlternativesValues();
            this.calculatedAlternatives =
                this.alternativeService.calculatedAlternatives;
            this.sumsOfValues = this.alternativeService.sumsOfValues;
        }
        this.showCalculatedValues = !this.showCalculatedValues;
    }

    ngOnDestroy() {
        this.alternativeService.calculateAlternativesValues();
    }
}
