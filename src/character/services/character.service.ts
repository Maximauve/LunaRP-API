import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../character.entity';
import { CreatedCharacterDto } from '../dto/character.dto';

@Injectable()
export class CharactersService {
    constructor(
        @InjectRepository(Character)
        private charactersRepository: Repository<Character>,
    ) {}
    
    async GetAll(): Promise<Character[]> {
        return await this.charactersRepository.find();
    }

    async Create(character: CreatedCharacterDto) : Promise<Character> {
        const newCharacter = this.charactersRepository.create(character);
        return this.charactersRepository.save(newCharacter);
    }
}
