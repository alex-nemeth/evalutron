import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CriteriaService } from "../../services/criteria.service";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import { ICriteria } from "../../models/criteria.model";
import { WeightService } from "../../services/weight.service";
import { NavButtonComponent } from "../common/nav-button/button.component";

@Component({
    standalone: true,
    selector: "app-estimation-of-weights",
    templateUrl: "./estimation-of-weights.component.html",
    styles: `
    input:disabled {
      opacity: .50;
    }`,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NavButtonComponent],
})
export class EstimationOfWeightsComponent {
    criteria!: ICriteria[];
    weights: any[] = [];
    sumOfWeights!: number;

    formGroup = new FormGroup({});

    constructor(
        private criteriaService: CriteriaService,
        private weightService: WeightService
    ) {}

    ngOnInit() {
        this.criteria = this.criteriaService.criteria;
        this.criteria.forEach((criteria) => this.weights.push([]));
        this.weights = this.weightService.weights;
        this.initForm();
    }

    isFieldDisabled(id1: string, id2: string) {
        return id1 === id2;
    }

    manageWeights(e: any) {
        const weight = e.target.value;
        const mirrorID = e.target.id.split("-").reverse().join("-");
        const mirrorControl = this.formGroup.get(mirrorID) as AbstractControl;
        mirrorControl.setValue(`${this.weightService.mirrorWeight(weight)}`);
        const weightCell: HTMLElement | null = document.querySelector(
            `#${e.target.id}`
        );
        const mirrorWeightCell: HTMLElement | null = document.querySelector(
            `#${mirrorID}`
        );
        weightCell!.style.backgroundColor = "#34d399";
        mirrorWeightCell!.style.backgroundColor = "#34d399";
        this.updateWeights();
    }

    getFormControlName(id1: string, id2: string): string {
        return `${id1}-${id2}`;
    }

    updateWeights() {
        const weights: string[] = Object.values(this.formGroup.getRawValue());
        let sortedWeights: string[][] = [];
        for (let i = 0; i < this.criteria.length; i++) {
            let arr: string[] = [];
            for (let j = 0; j < this.criteria.length; j++) {
                arr.push(weights[i * this.criteria.length + j]);
            }
            sortedWeights.push(arr);
            this.criteria[i].weight = this.weightService.geomean(arr);
            this.criteria[i].weightPercentage = (this.weightService.geomean(arr) / this.weightService.sumOfWeights) * 100;
        }
        this.weightService.saveWeights(sortedWeights);
        this.sumOfWeights = Number(this.weightService.sumOfWeights.toFixed(3));
        // sorted weights (string[][]) is saved into the service for future reference
        // it includes all 3 iterations of 'arr'
        // geomean is calculated by passing 'arr' into the geomean function
        // at the end of every parent loop
    }

    initForm() {
        const formControls: any = {};
        this.criteria.forEach((criteria) => {
            this.criteria.forEach((criteria2) => {
                formControls[`${criteria.id}-${criteria2.id}`] =
                    new FormControl({
                        value: "1",
                        disabled: this.isFieldDisabled(
                            criteria.id,
                            criteria2.id
                        ),
                        // TODO: Validation - Validators.pattern();
                    });
            });
        });
        this.formGroup = new FormGroup(formControls);
    }
}
