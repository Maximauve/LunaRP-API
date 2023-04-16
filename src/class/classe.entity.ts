import { Character } from "src/character/character.entity";
import { Spell } from "src/spell/spell.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, OneToOne, JoinTable } from "typeorm"

@Entity()
export class Classe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, nullable: false})
    name: string;

    @Column({nullable: false})
    dice: number;

    @Column({ type:"longtext", nullable: false})
    description: Text;

    @ManyToMany(() => Spell, spell => spell.classes)
    spells: Spell[];

    @OneToMany(() => Character, character => character.classe)
    character: Character[];
}