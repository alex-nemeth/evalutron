export interface ICriteria {
  id: string;
  title: string;
  minmax: string;
  weights?: { id: string; weight: number }[];
}
