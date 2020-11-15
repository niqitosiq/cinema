import { choiceJSON } from "../interfaces/choice.interface";

export class UpdateChoiceDto {
    readonly fields: choiceJSON;

    readonly correct: number;

    readonly timestamp: number;
}