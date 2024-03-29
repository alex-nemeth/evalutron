export interface IAlternative {
    id?: string;
    title: string;
    values: {
        raw?: {
            [key: string]: number;
        };
        calculated?: {
            [key: string]: number;
        };
        normalized?: {
            [key: string]: number;
        }
        weightedSum?: number;
    }
}