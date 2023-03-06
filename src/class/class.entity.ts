import { Campaign } from "src/campaign/campaign.entity";
import { Character } from "src/character/character.entity";
import { Spell } from "src/spell/spell.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, OneToOne, JoinTable } from "typeorm"

@Entity()
export class Classes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, nullable: false})
    name: string;

    @Column({nullable: false})
    dice: number;

    @Column({ type:"longtext", nullable: false})
    description: string;

    @ManyToMany(() => Spell, spell => spell.classes)
    spells: Spell[];

    @OneToMany(() => Character, character => character.class)
    character: Character[];
}