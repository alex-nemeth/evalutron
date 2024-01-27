import { Component, Input, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CriteriaService } from "../../../services/criteria.service";
import { AlternativeService } from "../../../services/alternative.service";
import { IAlternative } from "../../../models/alternative.model";
import { AlternativesGridMode } from "../../../enums/alternatives-grid-mode.enum";
import { Observable, of } from "rxjs";
import { MatTable, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "eval-alternatives-grid",
    standalone: true,
    imports: [CommonModule, MatTableModule, MatIconModule, TranslateModule],
    templateUrl: "./alternatives-grid.component.html",
})
export class AlternativesGridComponent {
    @ViewChild(MatTable) table!: MatTable<IAlternative[]>;

    @Input() gridMode!: AlternativesGridMode;
    AlternativesGridMode = AlternativesGridMode;

    columns!: number;
    alternatives$!: Observable<IAlternative[]>;
    sumsOfValues!: { [key: string]: number };
    criteriaTitles!: string[];

    constructor(
        private criteriaService: CriteriaService,
        private alternativeService: AlternativeService
    ) {}

    ngOnInit(): void {
        this.columns = this.criteriaService.criteria.length + 1;
        this.alternatives$ = of(this.alternativeService.alternatives);
        this.sumsOfValues = this.alternativeService.sumsOfValues;
        this.criteriaTitles = this.criteriaService.getCriteriaTitles();
    }

    get displayedColumns(): string[] {
        const sampleAlternative = this.alternativeService.alternatives[0]; // Assuming alternatives is an array
        if (!sampleAlternative) {
            return [];
        }

        return Object.keys(sampleAlternative.values[this.gridMode]!);
    }

    removeAlternative(id: string) {
        console.log(id);
        this.alternativeService.removeAlternative(id);
        this.alternatives$ = of(this.alternativeService.alternatives);
        this.table.renderRows();
    }

    getObjectKeys(obj: any) {
        return Object.keys(obj);
    }

    formatValue(value: number): number {
        return Number(value.toFixed(3));
    }
}
