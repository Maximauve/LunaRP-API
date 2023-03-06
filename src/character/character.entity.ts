import { Spell } from "src/spell/spell.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { CharacterItem } from "./character_item.entity";
import { Classes } from "src/class/class.entity";
import { Campaign } from "src/campaign/campaign.entity";
import { User } from "src/users/users.entity";
import { Race } from "src/race/race.entity";

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, nullable: false})
    name: string;

    @Column({nullable: false})
    level: number;

    @Column({nullable: false})
    experience: number;

    @Column({ type:"varchar", nullable: false})
    alignment: string;

    @Column({nullable: false})
    strength: number;

    @Column({nullable: false})
    dexterity: number;

    @Column({nullable: false})
    constitution: number;

    @Column({nullable: false})
    intelligence: number;

    @Column({nullable: false})
    wisdom: number;

    @Column({nullable: false})
    charisma: number;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    inventory: number;

    @ManyToOne(() => User, user => user.characters)
    user: User;

    @ManyToMany(() => Campaign, campaign => campaign.characters)
    @JoinTable()
    campaign: Campaign[];
    
    @ManyToOne(() => Race, race => race.character)
    race: Race;
    
    @ManyToMany(() => Spell)
    @JoinTable()
    spells: Spell[];

    @ManyToOne(() => Classes, classes => classes.character)
    class: Classes;
    
    @OneToMany(() => CharacterItem, characterItem => characterItem.character)
    character_item: CharacterItem[];
}   