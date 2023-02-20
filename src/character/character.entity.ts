import { Spell } from "src/spell/spell.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { CharacterItem } from "./character_item.entity";
import { Class } from "src/class/class.entity";
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

    @OneToMany(() => Spell, spell => spell.character)
    spells: Spell[];

    @OneToMany(() => CharacterItem, characterItem => characterItem.character)
    character_item: CharacterItem[];

    @OneToOne(() => Class, classes => classes.character)
    @JoinColumn()
    class: Class;

    @ManyToOne(() => Campaign, campaign => campaign.characters)
    campaign: Campaign;

    @ManyToOne(() => User, user => user.characters)
    user: User;

    @OneToOne(() => Race, race => race.character)
    @JoinColumn()
    race: Race;

    
}   