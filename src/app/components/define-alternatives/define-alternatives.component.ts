import { Component } from "@angular/core";
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
import { ButtonComponent } from "../button/button.component";
import { AlternativeService } from "../../services/alternative.service";
import { ICriteria } from "../../models/criteria.model";

interface IAlternative {
    // change to [key: string] : number
    // in case that we end up sending numbers directly from the form
    [key: string]: string;
}

@Component({
    standalone: true,
    selector: "app-define-alternatives",
    templateUrl: "./define-alternatives.component.html",
    imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent],
})
export class DefineAlternativesComponent {
    criteria!: ICriteria[];
    alternatives!: IAlternative[];
    normalizedAlternatives!: IAlternative[];

    normalizedValues: boolean = false;

    formGroup = new FormGroup({});

    constructor(
        private criteriaService: CriteriaService,
        private alternativeService: AlternativeService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.alternativeService.initAlternatives();
        this.alternatives = this.alternativeService.alternatives;
        this.normalizedAlternatives =
            this.alternativeService.normalizedAlternatives;
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
    }

    getObjectKeys(obj: IAlternative) {
        return Object.keys(obj);
    }

    toggleNormalization() {
        if (!this.normalizedValues) {
            this.alternativeService.normalizeAlternatives();
            this.normalizedAlternatives =
                this.alternativeService.normalizedAlternatives;
        }
        this.normalizedValues = !this.normalizedValues;
    }
}
