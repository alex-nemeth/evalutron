export interface IAlternative {
    [key: string]: any;
}

// For future refactoring
// export interface IAlternative {
//     id: string;
//     title: string;
//     values: {
//         raw?: {
//             [key: string]: number;
//         };
//         calculated?: {
//             [key: string]: number;
//         };
//         normalized?: {
//             [key: string]: number;
//         }
//     }
// }