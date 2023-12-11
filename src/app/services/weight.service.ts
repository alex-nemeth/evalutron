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

  sum(weights: any[]): number {
    // const numericWeights = weights.map((weight) => {
    //   if (isNaN(weight)) {
    //     return weight.split
    //   }
    // })
    return weights
      .map((weight) =>
        isNaN(weight) ? weight.split('/')[0] / weight.split('/')[1] : weight
      )
      .reduce((a: string, b: string) => Number(a) + Number(b));
  }
}
