export interface ICriteria {
  id: string;
  title: string;
  minmax: string;
  weights?: { string: number }[];
}
