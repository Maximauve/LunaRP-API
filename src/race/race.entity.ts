import { Campaign } from "src/campaign/campaign.entity";
import { Character } from "src/character/character.entity";
import { Language } from "src/language/language.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"

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

    @Column({ type:"longtext", nullable: false})
    description: string;

    @OneToMany(() => Character, character => character.race)
    character: Character;

    @ManyToMany(() => Language, {
        cascade: true,
    })
    @JoinTable()
    languages: Language[];
}