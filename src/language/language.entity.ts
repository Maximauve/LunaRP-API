import { Race } from "src/race/race.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm"

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique:true, nullable: false})
    name: string;

    @Column({ type:"longtext", nullable: false})
    description: string;
}   