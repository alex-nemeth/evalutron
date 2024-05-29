import { Component, OnInit } from "@angular/core";

import { MatInputModule } from "@angular/material/input";
import { CriteriaService } from "../../services/criteria.service";
import { ICriteria } from "../../models/criteria.model";
import { LoadingService } from "../../services/loading.service";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { WeightService } from "../../services/weight.service";

@Component({
    selector: "eval-simple-weight-estimation",
    standalone: true,
    imports: [
    MatInputModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule
],
    templateUrl: "./simple-weight-estimation.component.html",
    styles: `
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
        this.weights = this.criteria.map((c) => "1");
        this.initForm();
    }

    ngAfterViewInit(): void {
        this.loadingService.hide();
    }

    updateWeights(e: any) {
        const weightCell: HTMLElement | null = document.querySelector(
            `#${e.target.id}`
        );
        // Cringe code below
        // (This targets the parent Material table cell
        // So that the entire cell is highlighted)
        weightCell!.parentElement!.parentElement!.parentElement!.style.backgroundColor =
            "#69f0ae";
        this.saveWeights();
    }

    saveWeights() {
        const weights: string[] = Object.values(this.formGroup.getRawValue());
        this.sumOfWeights = weights.reduce((a, b) => a + Number(b), 0);
        for (let i = 0; i < this.criteria.length; i++) {
            this.criteria[i].weight = Number(weights[i]);
            this.criteria[i].weightPercentage =
                (Number(weights[i]) / this.sumOfWeights) * 100;
        }
        this.sumOfWeights = weights.reduce((a, b) => a + Number(b), 0);
        this.weightService.sumOfWeights = this.sumOfWeights;
    }

    initForm() {
        const formControls: any = {};
        this.criteria.forEach((criteria) => {
            formControls[`${criteria.id}`] = new FormControl(1, [
                Validators.required,
                Validators.min(1),
            ]);
        });
        this.formGroup = new FormGroup(formControls);
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
