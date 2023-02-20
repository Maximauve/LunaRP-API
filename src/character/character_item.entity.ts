import { Item } from "src/item/item.entity";
import { Spell } from "src/spell/spell.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinTable } from "typeorm"
import { Character } from "./character.entity";

@Entity()
export class CharacterItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    quantity: number;

    @ManyToOne(() => Character, character => character.character_item)
    character: Character;

    @ManyToOne(() => Item, item => item.character_item)
    item: Item;
}   