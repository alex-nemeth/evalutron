import { Injectable } from '@angular/core';
import { CriteriaService } from './criteria.service';
import { ICriteria } from '../models/criteria.model';

@Injectable({
  providedIn: 'root',
})
export class AlternativeService {
  public alternatives: {}[] = [
    {
      id: 'a1',
      Title: 'House 1',
      Price: '150000',
      Distance: '10',
      '# of Rooms': '3',
    },
    {
      id: 'a2',
      Title: 'House 2',
      Price: '200000',
      Distance: '15',
      '# of Rooms': '4',
    },
    {
      id: 'a3',
      Title: 'House 3',
      Price: '250000',
      Distance: '20',
      '# of Rooms': '5',
    },
    {
      id: 'a4',
      Title: 'House 4',
      Price: '300000',
      Distance: '25',
      '# of Rooms': '6',
    },
    {
      id: 'a5',
      Title: 'House 5',
      Price: '350000',
      Distance: '30',
      '# of Rooms': '7',
    },
    {
      id: 'a6',
      Title: 'House 6',
      Price: '400000',
      Distance: '35',
      '# of Rooms': '8',
    },
    {
      id: 'a7',
      Title: 'House 7',
      Price: '450000',
      Distance: '40',
      '# of Rooms': '9',
    },
    {
      id: 'a8',
      Title: 'House 8',
      Price: '500000',
      Distance: '45',
      '# of Rooms': '10',
    },
    {
      id: 'a9',
      Title: 'House 9',
      Price: '550000',
      Distance: '50',
      '# of Rooms': '11',
    },
    {
      id: 'a10',
      Title: 'House 10',
      Price: '600000',
      Distance: '55',
      '# of Rooms': '12',
    },
  ];
  public normalizedAlternatives: {}[] = [];
  maxValues: { [key: string]: number } = {};

  constructor(private criteriaService: CriteriaService) {}

  initAlternatives() {
    if (!this.alternatives) {
      this.alternatives = [];
    }
  }

  findMaxValues() {
    const maxValues: { [key: string]: number } = {};
    this.alternatives.forEach((obj: Record<string, number>) => {
      Object.keys(obj).forEach((key) => {
        if (key === 'id' || key === 'Title') return;
        if (!(key in maxValues) || Number(obj[key]) > maxValues[key])
          maxValues[key] = Number(obj[key]);
      });
    });
    this.maxValues = maxValues;
  }

  normalizeAlternatives() {
    this.findMaxValues();
    const normalizedAlternatives: { [key: string]: number }[] = [];

    this.alternatives.forEach((obj: Record<string, number>) => {
      const normalizedAlternative: Record<string, number> = {};

      Object.keys(obj).forEach((key: string) => {
        if (key === 'id' || key === 'Title') {
          normalizedAlternative[key] = obj[key];
        } else {
          normalizedAlternative[key] = Number(obj[key]) / this.maxValues[key];
        }
      });

      normalizedAlternatives.push(normalizedAlternative);
    });

    this.normalizedAlternatives = normalizedAlternatives;
  }
}
