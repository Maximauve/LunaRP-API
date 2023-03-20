import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CharacterItem } from '../character_item.entity';
import { CreatedCharacterItemDto } from '../dto/characterItem.dto';
import { UpdatedCharacterItemDto } from '../dto/updatedCharacterItem.dto';

@Injectable()
export class CharactersItemService {
    constructor(
        @InjectRepository(CharacterItem)
        private charactersItemRepository: Repository<CharacterItem>,
    ) {}

    async FindOneId(id: number): Promise<CharacterItem> {
        return await this.charactersItemRepository.findOne({ where: {id: id} });
    }

    async FindAllId(id: number): Promise<CharacterItem[]> {
        return await this.charactersItemRepository.find({ where: {id: id}, });
    }

    async Create(characterItem: CreatedCharacterItemDto) : Promise<CharacterItem> {
        const newCharacterItem = this.charactersItemRepository.create(characterItem);
        return this.charactersItemRepository.save(newCharacterItem);
    }

    async Delete(id: number): Promise<CharacterItem[]> {
        let characterItem = await this.charactersItemRepository.findOne({ where: {id: id} });
        return this.charactersItemRepository.remove([characterItem]);
    }

    async Update(characterItem: UpdatedCharacterItemDto): Promise<CharacterItem> {
        return await this.charactersItemRepository.save(characterItem);
    }
}
