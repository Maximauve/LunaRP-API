import { Character } from "src/character/character.entity";
import { Class } from "src/class/class.entity";
import { Item } from "src/item/item.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm"

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

    @ManyToOne(() => Character, character => character.spells)
    character: Character;

    @ManyToMany(() => Class, classe => classe.spells)
    class: Class[];
}   