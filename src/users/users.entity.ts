import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from "typeorm"
import { Role } from "./role.enum";
import { Campaign } from "src/campaign/campaign.entity";
import { Character } from "src/character/character.entity";
import LocalFile from "src/localFile/localFile.entity";

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

    @Column({ nullable: true })
    userId?: number;

    @JoinColumn({ name: 'userId' })
    @OneToOne(() => LocalFile, {
      nullable: true,
      cascade:true
    })
    image?: LocalFile;
    
    @Column({ type: "varchar", default: Role.User, nullable: false})
    role: Role;
    
    @OneToMany(() => Campaign, campaign => campaign.game_master, {
        cascade: true
    })
    campaigns: Campaign[];

    @OneToMany(() => Character, character => character.user, {
        cascade: true
    })
    characters: Character[];
}   