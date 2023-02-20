import { Campaign } from "src/campaign/campaign.entity";
import { Character } from "src/character/character.entity";
import { Language } from "src/language/language.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne } from "typeorm"

@Entity()
export class Race {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique:true, nullable: false})
    name: string;

    @Column({nullable: false})
    speed: number;

    @Column({nullable: false})
    size: string;

    @Column({ type:"varchar", nullable: false})
    description: string;

    @OneToOne(() => Character, character => character.race)
    character: Character;

    @ManyToOne(() => Campaign, campaign => campaign.races)
    campaign: Campaign;

    @OneToMany(() => Language, language => language.race)
    languages: Language[];
}