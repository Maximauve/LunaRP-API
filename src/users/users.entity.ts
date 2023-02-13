import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Role } from "./role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, nullable: false})
    username: string;

    @Column({ type: "varchar", unique: true, nullable: false})
    email: string;

    // @OneToMany(() => Character, character => character.user)
    // characters: Character[];

    @Column({ type: "varchar", nullable: false})
    password: string;

    @Column({ type: "varchar", default: Role.User, nullable: false})
    role: Role;
}   