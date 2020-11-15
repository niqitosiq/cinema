import { choiceJSON } from "../interfaces/choice.interface";

export class CreateChoiceDto {

    readonly fields: choiceJSON;

    readonly correct: number;

    readonly timestamp: number;
}