import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { choiceEnum } from "../enum/choice.enum";
import { choiceJSON } from "../interfaces/choice.interface";

@Entity('choice')
export class Choice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("simple-json")
    fields: choiceJSON;

    @Column("numeric")
    correct: number;

    @Column("numeric")
    timestamp: number

    @Column('enum', {'enum': choiceEnum})
    type: choiceEnum
}