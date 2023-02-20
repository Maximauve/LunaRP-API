import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Role } from "./role.enum";
import { Campaign } from "src/campaign/campaign.entity";
import { Character } from "src/character/character.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, nullable: false})
    username: string;

    @Column({ type: "varchar", unique: true, nullable: false})
    email: string;

    @Column({ type: "varchar", nullable: false})
    password: string;
    
    @Column({ type: "varchar", default: Role.User, nullable: false})
    role: Role;
    
    @OneToMany(() => Campaign, campaign => campaign.game_master)
    campaigns: Campaign[];

    @OneToMany(() => Character, character => character.user)
    characters: Character[];
}   