import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  weights!: any[];

  constructor() {}

  saveWeights(weights: string[]) {
    this.weights = weights;
  }

  mirrorWeight(weight: string) {
    return isNaN(Number(weight)) ? weight.split('/')[1] : `1/${weight}`;
  }

  // TODO: Typing
  geomean(weights: any[]): number {
    let multipliedWeights = 1;
    weights
      .map((weight) =>
        isNaN(weight) ? weight.split('/')[0] / weight.split('/')[1] : weight
      )
      .forEach((weight) => {
        multipliedWeights = multipliedWeights * weight;
      });
    return parseFloat(
      Math.pow(multipliedWeights, 1 / weights.length).toFixed(3)
    );
  }
}
