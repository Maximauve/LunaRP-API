import { Character } from "src/character/character.entity";
import { CharacterItem } from "src/characterItem/character_item.entity";
import LocalFile from "src/localFile/localFile.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, OneToOne } from "typeorm"

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique:true, nullable: false})
    name: string;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false})
    damages: number;

    @Column({nullable: false})
    defense: number;

    @Column({nullable: false})
    regeneration: number;
        
    @Column({ nullable: true })
    itemId?: number;

    @JoinColumn({ name: 'itemId' })
    @OneToOne(() => LocalFile, {
      nullable: true,
      cascade:true
    })
    image?: LocalFile;

    @Column({type: "longtext", nullable: false})
    description: string;

    @OneToMany(() => CharacterItem, characterItem => characterItem.item)
    character_item: CharacterItem[];
}   