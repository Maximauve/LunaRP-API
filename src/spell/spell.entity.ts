import { Classe } from "src/class/classe.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinTable } from "typeorm"

@Entity()
export class Spell {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, nullable: false})
    name: string;

    @Column({nullable: false})
    level: number;

    @Column({nullable: false})
    scope: number;

    @Column({nullable: false})
    component: string;

    @Column({nullable: false})
    casting_time: string;

    @Column({nullable: false})
    duration: string;

    @Column({ type:"longtext", nullable: false})
    description: string;

    @ManyToMany(() => Classe, classes => classes.spells)
    @JoinTable()
    classes: Classe[];
}   