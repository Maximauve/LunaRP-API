import { Character } from "src/character/character.entity";
import { CharacterItem } from "src/character/character_item.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm"

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique:true, nullable: false})
    name: string;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false})
    damages: number;

    @Column({nullable: false})
    defense: number;

    @Column({nullable: false})
    regeneration: number;
        
    @Column({nullable: true})
    image: string;

    @Column({type: "longtext", nullable: false})
    description: string;

    @OneToMany(() => CharacterItem, characterItem => characterItem.item)
    character_item: CharacterItem[];
}   