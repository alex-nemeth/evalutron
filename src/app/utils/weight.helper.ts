const ALLOWED_INPUTS = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "1/1",
    "1/2",
    "1/3",
    "1/4",
    "1/5",
    "1/6",
    "1/7",
    "1/8",
    "1/9",
];

export function checkWeightInput(input: string) {
    return ALLOWED_INPUTS.includes(input);
}
