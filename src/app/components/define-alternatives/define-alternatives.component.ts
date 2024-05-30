import { Component, OnInit, inject } from "@angular/core";

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
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { LoadingService } from "../../services/loading.service";
import { TranslateModule } from "@ngx-translate/core";
import { NavButtonGroupComponent } from "../common/nav-button-group/nav-button-group.component";

@Component({
    standalone: true,
    selector: "app-define-alternatives",
    templateUrl: "./define-alternatives.component.html",
    imports: [
        ReactiveFormsModule,
        RouterModule,
        NavButtonComponent,
        NavButtonGroupComponent,
        AlternativesGridComponent,
        SubmitButtonComponent,
        MatInputModule,
        MatFormFieldModule,
        TranslateModule,
    ],
})
export class DefineAlternativesComponent implements OnInit {
    criteria!: ICriteria[];
    calculatedAlternatives!: IAlternative[];
    sumsOfValues!: { [key: string]: number };

    AlternativesGridMode = AlternativesGridMode;

    formGroup = new FormGroup({});

    #cs = inject(CriteriaService);
    #as = inject(AlternativeService);
    #fb = inject(FormBuilder);
    #ls = inject(LoadingService);

    ngOnInit() {
        this.criteria = this.#cs.criteria;
        this.initForm();
    }

    ngAfterViewInit(): void {
        this.#ls.hide();
    }

    initForm() {
        const formControls: { [key: string]: AbstractControl } = {};
        formControls["title"] = this.#fb.control("", Validators.required);
        this.criteria.forEach((criterion: ICriteria) => {
            formControls[criterion.title] = this.#fb.control("", [
                Validators.required,
                Validators.min(0),
                Validators.pattern(/^\d*(\.\d+)?$/), // Regex: Only positive numbers
            ]);
        });
        this.formGroup = this.#fb.group(formControls);
    }

    addAlternative() {
        if (this.formGroup.invalid) {
            console.log("skill issue");
            return;
        }

        const { title, ...rawValues } = this.formGroup.value as {
            title: string;
            [key: string]: any;
        };

        Object.keys(rawValues).forEach((key) => {
            rawValues[key] = parseInt(rawValues[key]);
        });

        const newAlternative: Partial<IAlternative> = {
            title: title,
            rawValues: rawValues,
        };

        this.#as.addAlternative(newAlternative);
        this.formGroup.reset();
    }
}
