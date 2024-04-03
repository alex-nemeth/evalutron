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
        };
        weightedSum?: number;
    };
    topsisValues?: {
        normalized?: {
            [key: string]: number;
        };
        calculated?: {
            [key: string]: number;
        };
        idealValue?: number;
        basalValue?: number;
        vPlus?: number;
        vMinus?: number;
        finalValue?: number;
    };
}
