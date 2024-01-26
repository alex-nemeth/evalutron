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
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { LoadingService } from "../../services/loading.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    standalone: true,
    selector: "app-estimation-of-weights",
    templateUrl: "./estimation-of-weights.component.html",
    styles: `
    input:disabled {
      opacity: .50;
    }`,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NavButtonComponent,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        TranslateModule
    ],
})
export class EstimationOfWeightsComponent {
    criteria!: ICriteria[];
    weights: any[] = [];
    sumOfWeights!: number;

    displayedColumns!: string[];

    formGroup = new FormGroup({});

    constructor(
        private criteriaService: CriteriaService,
        private weightService: WeightService,
        private loadingService: LoadingService
    ) { }

    ngOnInit() {
        this.criteria = this.criteriaService.criteria;
        this.criteria.forEach((criteria) => this.weights.push([]));
        this.displayedColumns = ['ghostCell', ...this.criteria.map(c => c.id), 'geomean', 'weightPercentage'];
        this.weights = this.weightService.weights;
        this.initForm();
    }

    ngAfterViewInit(): void {
        this.loadingService.hide();
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
        // Cringe code below
        // (This targets the parent Material table cell
        // So that the entire cell is highlighted)
        weightCell!
            .parentElement!
            .parentElement!
            .parentElement!
            .style.backgroundColor = "#69f0ae";
        mirrorWeightCell!
            .parentElement!
            .parentElement!
            .parentElement!
            .style.backgroundColor = "#69f0ae";
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
