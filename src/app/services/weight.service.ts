import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  weights!: {};

  constructor() {}

  saveWeights(obj: Object) {
    this.weights = obj;
  }
}
