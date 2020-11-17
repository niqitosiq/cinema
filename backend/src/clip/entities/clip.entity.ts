import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { maskType } from "../interfaces/mask.interface";

@Entity({name: 'clip'})
export class Clip {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    linkedCinema: string;

    @Column('varchar')
    videoUrl: string;

    @Column('varchar', { nullable: true })
    musicUrl: string;

    @Column('varchar', { nullable: true })
    previewUrl: string;

    @Column('numeric')
    likeCounter: number;

    @Column('numeric')
    viewCounter: number;

    @Column('varchar', { nullable: true })
    desc: string;

    @Column('simple-json', { nullable: true })
    mask: maskType;
}