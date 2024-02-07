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
    alternatives!: IAlternative[];
    sumsOfValues!: { [key: string]: number };
    criteriaTitles!: string[];

    constructor(
        private criteriaService: CriteriaService,
        private alternativeService: AlternativeService
    ) {}

    ngOnInit(): void {
        this.columns = this.criteriaService.criteria.length + 1;
        this.alternatives = this.alternativeService.alternatives;
        this.sumsOfValues = this.alternativeService.sumsOfValues;
        this.criteriaTitles = this.criteriaService.getCriteriaTitles();
        this.alternativeService.alternativesChangedBS.subscribe((change) => {
            if (change) {
                this.alternatives = this.alternativeService.alternatives;
                this.table.renderRows();
            }
        });
    }

    get displayedColumns(): string[] {
        const sampleAlternative = this.alternativeService.alternatives[0];
        if (!sampleAlternative) {
            return [];
        }

        return Object.keys(sampleAlternative.values[this.gridMode]!);
    }

    removeAlternative(id: string) {
        this.alternativeService.removeAlternative(id);
        this.alternatives = this.alternativeService.alternatives;
        this.table.renderRows();
    }
}
