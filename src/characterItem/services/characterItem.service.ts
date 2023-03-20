import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CharacterItem } from '../character_item.entity';
import { CreatedCharacterItemDto } from '../dto/characterItem.dto';
import { UpdatedCharacterItemDto } from '../dto/updatedCharacterItem.dto';
import { Item } from 'src/item/item.entity';

@Injectable()
export class CharactersItemService {
    constructor(
        @InjectRepository(CharacterItem)
        private charactersItemRepository: Repository<CharacterItem>,
    ) {}

    async FindOneId(id: number): Promise<CharacterItem> {
        return await this.charactersItemRepository.findOne({ where: {id: id}, 
            relations: {
                character: true,
                item: true
            }});
    }

    async FindAllId(id: number): Promise<CharacterItem[]> {
        return await this.charactersItemRepository.find({ where: {id: id},
            relations: {
            character: true,
            item: true
        } });
    }

    async FindOneItemId(id: number): Promise<CharacterItem> {
        return await this.charactersItemRepository.findOne({
            relations : {
                item: true,
                character: true
            },
            where: { item : { id : id } }
        });
    }

    async Create(characterItem: CreatedCharacterItemDto) : Promise<CharacterItem> {
        const newCharacterItem = this.charactersItemRepository.create(characterItem);
        return this.charactersItemRepository.save(newCharacterItem);
    }

    async Delete(id: number): Promise<CharacterItem[]> {
        let characterItem = await this.charactersItemRepository.findOne({ where: {id: id}, 
            relations: {
                character: true,
                item: true
            } });
        return this.charactersItemRepository.remove([characterItem]);
    }

    async Update(characterItem: UpdatedCharacterItemDto): Promise<CharacterItem> {
        return await this.charactersItemRepository.save(characterItem);
    }
}
