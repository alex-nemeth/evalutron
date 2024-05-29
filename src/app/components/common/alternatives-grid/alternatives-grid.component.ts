import { Component, Input, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CriteriaService } from "../../../services/criteria.service";
import { AlternativeService } from "../../../services/alternative.service";
import { IAlternative } from "../../../models/alternative.model";
import { MatTable, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    selector: "eval-alternatives-grid",
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        TranslateModule,
        MatTooltipModule,
    ],
    templateUrl: "./alternatives-grid.component.html",
})
export class AlternativesGridComponent {
    @ViewChild(MatTable) table!: MatTable<IAlternative[]>;

    columns!: number;
    alternatives!: IAlternative[];
    sumsOfValues!: { [key: string]: number };
    criteriaTitles!: string[];

    #cs = inject(CriteriaService);
    #as = inject(AlternativeService);

    ngOnInit(): void {
        this.columns = this.#cs.criteria.length + 1;
        this.alternatives = this.#as.alternatives;
        this.sumsOfValues = this.#as.sumsOfValues;
        this.criteriaTitles = this.#cs.getCriteriaTitles();
        this.#as.alternativesChangedBS.subscribe((change) => {
            if (change) {
                this.alternatives = this.#as.alternatives;
                this.table.renderRows();
            }
        });
    }

    get displayedColumns(): string[] {
        const sampleAlternative = this.#as.alternatives[0];
        if (!sampleAlternative) {
            return [];
        }

        return Object.keys(sampleAlternative.rawValues);
    }

    removeAlternative(id: string) {
        this.#as.removeAlternative(id);
        this.alternatives = this.#as.alternatives;
        this.table.renderRows();
    }

    getTooltip(criterionTitle: string): string {
        return this.#cs.getCriterionDescription(criterionTitle);
    }

    hasDescription(key: string): boolean {
        return this.#cs.hasDescription(key);
    }
}
