import { Character } from "src/character/character.entity";
import { Class } from "src/class/class.entity";
import { Item } from "src/item/item.entity";
import { Race } from "src/race/race.entity";
import { Spell } from "src/spell/spell.entity";
import { User } from "src/users/users.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm"

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "boolean", nullable: false})
    is_done: boolean;

    @Column({ nullable: false})
    character_min_level: number;

    @Column({ nullable: false})
    character_max_level: number;

    @OneToMany(() => Class, classe => classe.campaign)
    classes: Class[];

    @OneToMany(() => Character, character => character.campaign)
    characters: Character[];

    @ManyToOne(() => User, user => user.campaigns)
    game_master: User;

    @OneToMany(() => Race, race => race.campaign)
    races: Campaign[];

}   