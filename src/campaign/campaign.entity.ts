import { Character } from "src/character/character.entity";
import { Classes } from "src/class/class.entity";
import { Item } from "src/item/item.entity";
import { Race } from "src/race/race.entity";
import { Spell } from "src/spell/spell.entity";
import { User } from "src/users/users.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinTable } from "typeorm"

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "boolean", default: false, nullable: false})
    is_done: boolean;

    @Column({ nullable: false})
    character_min_level: number;

    @Column({ nullable: false})
    character_max_level: number;
    
    @ManyToOne(() => User, user => user.campaigns)
    game_master: User;

    @ManyToMany(() => Classes, {
        cascade: true,
    })
    @JoinTable()
    classes: Classes[];
    
    @ManyToMany(() => Race, {
        cascade: true,
    })
    @JoinTable()
    races: Race[];

    @ManyToMany(() => Character, character => character.campaign)
    characters: Character[]
}   