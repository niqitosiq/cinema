interface field {
    readonly text: string;
    readonly counter: number;
}

export interface choiceJSON {
    readonly fieldOne: field;
    readonly fieldTwo: field;
    readonly fieldThree?: field;
    readonly fieldFour?: field;
}