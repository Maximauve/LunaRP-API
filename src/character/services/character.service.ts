import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Character } from '../character.entity';
import { CreatedCharacterDto } from '../dto/character.dto';
import { UpdatedCharacterDto } from '../dto/updatedCharacter.dto';
import { CharactersItemService } from 'src/characterItem/services/characterItem.service';

@Injectable()
export class CharactersService {
    constructor(
        @InjectRepository(Character)
        private charactersRepository: Repository<Character>,
        private charactersItemService: CharactersItemService,
    ) {}
    
    async GetAll(): Promise<Character[]> {
        return await this.charactersRepository.find();
    }

    async FindOneId(id: number): Promise<Character> {
        return await this.charactersRepository.findOne({ where: {id: id} });
    }

    async Create(character: CreatedCharacterDto) : Promise<Character> {
        const newCharacter = this.charactersRepository.create(character);
        return this.charactersRepository.save(newCharacter);
    }

    async Delete(id: number): Promise<Character[]> {
        let character = await this.charactersRepository.findOne({ where: {id: id} });
        if (!character) {
            return null;
        }
        return this.charactersRepository.remove([character]);
    }

    async Update(character: UpdatedCharacterDto): Promise<Character> {
        return await this.charactersRepository.save(character);
    }
}
