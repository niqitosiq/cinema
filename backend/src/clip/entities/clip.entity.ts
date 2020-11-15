import { Choice } from "src/interactive/entities/choice.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToOne(() => Choice, { nullable: true })
    @JoinColumn()
    choice: Choice;
}