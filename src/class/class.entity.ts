import { Campaign } from "src/campaign/campaign.entity";
import { Character } from "src/character/character.entity";
import { Item } from "src/item/item.entity";
import { Spell } from "src/spell/spell.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, OneToOne } from "typeorm"

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, nullable: false})
    name: string;

    @Column({nullable: false})
    dice: number;

    @Column({nullable: false})
    description: string;

    @ManyToMany(() => Spell, spell => spell.class)
    spells: Spell[];

    @ManyToOne(() => Campaign, campaign => campaign.classes)
    campaign: Campaign;

    @OneToOne(() => Character, character => character.class)
    character: Character;
}