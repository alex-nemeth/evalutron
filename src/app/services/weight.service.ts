import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class WeightService {
    weights!: any;
    sumOfWeights!: number;

    saveWeights(weights: any) {
        this.weights = weights;
        let sumOfWeights = 0;
        this.weights.forEach((weight: any) => {
            sumOfWeights += this.saatysGeomean(weight);
        });
        this.sumOfWeights = sumOfWeights;
    }

    mirrorWeight(weight: string) {
        return isNaN(Number(weight)) ? weight.split("/")[1] : `1/${weight}`;
    }

    saatysGeomean(weights: string[]): number {
        let multipliedWeights = 1;
        weights
            .map((weight) =>
                isNaN(Number(weight))
                    ? parseInt(weight.split("/")[0]) /
                      parseInt(weight.split("/")[1])
                    : parseInt(weight)
            )
            .forEach((weight) => {
                multipliedWeights = multipliedWeights * weight;
            });
        return parseFloat(
            Math.pow(multipliedWeights, 1 / weights.length).toFixed(3)
        );
    }
}
