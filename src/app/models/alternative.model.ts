export interface IAlternative {
    id?: string;
    title: string;
    rawValues: {
        [key: string]: number;
    };
    weightedSumValues?: {
        normalized?: {
            [key: string]: number;
        };
        maximized?: {
            [key: string]: number;
        };
        finalValue?: number;
    };
    topsisValues?: {
        normalized?: {
            [key: string]: number;
        };
        calculated?: {
            [key: string]: number;
        };
        vPlus?: number;
        vMinus?: number;
        finalValue?: number;
    };
}
