import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { CriteriaService } from "../../services/criteria.service";
import { ICriteria } from "../../models/criteria.model";
import { WeightService } from "../../services/weight.service";
import { LoadingService } from "../../services/loading.service";
import { checkWeightInput } from "../../utils/weight.helper";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
} from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "eval-simple-weight-estimation",
    standalone: true,
    imports: [
        CommonModule,
        MatInputModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    templateUrl: "./simple-weight-estimation.component.html",
    styles: `
    input:disabled {
      opacity: .50;
    }
    :host ::ng-deep .mat-mdc-cell.mdc-data-table__cell {
      margin-left: 0px;
      margin-right:0px;
    }`,
})
export class SimpleWeightEstimationComponent implements OnInit {
    criteria!: ICriteria[];
    displayedColumns!: string[];
    weights: any[] = [];
    formGroup = new FormGroup({});
    sumOfWeights!: number;

    constructor(
        private criteriaService: CriteriaService,
        private weightService: WeightService,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.criteria = this.criteriaService.criteria;
        this.criteria.forEach(() => this.weights.push([]));
        this.displayedColumns = [
            "ghostCell",
            ...this.criteria.map((c) => c.id),
            "geomean",
            "weightPercentage",
        ];
        this.weights = this.weightService.weights;
        this.initForm();
    }

    ngAfterViewInit(): void {
        this.loadingService.hide();
    }

    updateWeights(e: any) {
        const weight = e.target.value;
        const weightCell: HTMLElement | null = document.querySelector(
            `#${e.target.id}`
        );

        if (!checkWeightInput(weight)) {
            weightCell!.parentElement!.parentElement!.parentElement!.style.backgroundColor =
                "red";
            return;
        }
        // Cringe code below
        // (This targets the parent Material table cell
        // So that the entire cell is highlighted)
        weightCell!.parentElement!.parentElement!.parentElement!.style.backgroundColor =
            "#69f0ae";
        this.saveWeights();
    }

    getFormControlName(id1: string): string {
        return id1;
    }

    saveWeights() {
        const weights: string[] = Object.values(this.formGroup.getRawValue());
        let sortedWeights: string[][] = [];
        for (let i = 0; i < this.criteria.length; i++) {
            let arr: string[] = [];
            for (let j = 0; j < this.criteria.length; j++) {
                arr.push(weights[i * this.criteria.length + j]);
            }
            sortedWeights.push(arr);
            this.criteria[i].weight = this.weightService.saatysGeomean(arr);
            this.criteria[i].weightPercentage =
                (Number(arr[0]) / this.weightService.sumOfWeights) * 100;
        }
        this.weightService.saveWeights(sortedWeights);
        this.sumOfWeights = Number(this.weightService.sumOfWeights.toFixed(3));
    }

    initForm() {
        const formControls: any = {};
        this.criteria.forEach((criteria) => {
            formControls[`${criteria.id}`] = new FormControl(
                {
                    value: "1",
                    disabled: false,
                },
                [this.weightValidator()]
            );
        });
        this.formGroup = new FormGroup(formControls);
    }

    weightValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null =>
            checkWeightInput(control.value) ? null : { invalidNumber: true };
    }

    hasValue(val: number) {
        return !isNaN(Number(((val / this.sumOfWeights) * 100).toFixed(3)));
    }

    getTooltip(criterionTitle: string): string {
        return this.criteriaService.getCriterionDescription(criterionTitle);
    }

    hasDescription(key: string): boolean {
        return this.criteriaService.hasDescription(key);
    }
}
