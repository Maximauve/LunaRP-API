import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Character } from '../character.entity';
import { CreatedCharacterDto } from '../dto/character.dto';
import { UpdatedCharacterDto } from '../dto/updatedCharacter.dto';
import { CharactersItemService } from 'src/characterItem/services/characterItem.service';
import LocalFilesService from 'src/localFile/localFile.service';

@Injectable()
export class CharactersService {
    constructor(
        @InjectRepository(Character)
        private charactersRepository: Repository<Character>,
        private charactersItemService: CharactersItemService,
        private localFilesService: LocalFilesService,
    ) {}
    
    async GetAll(): Promise<Character[]> {
        return await this.charactersRepository.find({
            relations: {
                user: true,
                campaign: true,
                race: true,
                spells: true,
                classe: true,
                inventory: true,
            }
        });
    }

    async FindOneId(id: number): Promise<Character> {
        return await this.charactersRepository.findOne({ where: {id: id},
            relations: {
                user: true,
                campaign: true,
                race: true,
                spells: true,
                classe: true,
                inventory: true,
            } });
    }

    async FindAllByUser(id: number): Promise<Character[]> {
        return await this.charactersRepository.find({ where: {user :{id: id }},
            relations: {
                user: true,
                campaign: true,
                race: true,
                spells: true,
                classe: true,
                inventory: true,
            } });
    }


    async Create(character: CreatedCharacterDto) : Promise<Character> {
        const newCharacter = this.charactersRepository.create(character);
        return this.charactersRepository.save(newCharacter);
    }

    async CreateWithFile(character: CreatedCharacterDto, fileData: LocalFileDto): Promise<Character> {
        const newCharacter = this.charactersRepository.create(character);
        let characterCreated = await this.charactersRepository.save(newCharacter);
        const image = await this.localFilesService.saveLocalFileData(fileData);
        console.log(image)
        console.log(newCharacter)
        console.log(characterCreated)
        await this.charactersRepository.update(newCharacter.id, {characterId: image.id});
        return characterCreated;
    }

    async Delete(id: number): Promise<Character[]> {
        let character = await this.charactersRepository.findOne({ where: {id: id}});
        if (!character) {
            return null;
        }
        return this.charactersRepository.remove([character]);
    }

    async Update(character: UpdatedCharacterDto): Promise<Character> {
        return await this.charactersRepository.save(character);
    }

    async UpdateWithFile(id: number, fileData: LocalFileDto): Promise<UpdateResult> {
        const image = await this.localFilesService.saveLocalFileData(fileData);
        return await this.charactersRepository.update(id, {characterId: image.id});
    }
}
