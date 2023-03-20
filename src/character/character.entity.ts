import { Spell } from "src/spell/spell.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { CharacterItem } from "../characterItem/character_item.entity";
import { Classe } from "src/class/classe.entity";
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

    @ManyToOne(() => Classe, classes => classes.character)
    classe: Classe;
    
    @OneToMany(() => CharacterItem, characterItem => characterItem.character, {
        onDelete: "CASCADE"
    })
    inventory: CharacterItem[];
}   