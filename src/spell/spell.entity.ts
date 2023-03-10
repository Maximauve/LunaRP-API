import { Character } from "src/character/character.entity";
import { Classes } from "src/class/class.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinTable } from "typeorm"

@Entity()
export class Spell {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, nullable: false})
    name: string;

    @Column({nullable: false})
    level: number;

    @Column({nullable: false})
    scope: GLfloat;

    @Column({nullable: false})
    component: string;

    @Column({nullable: false})
    casting_time: string;

    @Column({nullable: false})
    duration: string;

    @Column({nullable: false})
    description: string;

    @ManyToMany(() => Classes, classes => classes.spells)
    @JoinTable()
    classes: Classes[];
}   