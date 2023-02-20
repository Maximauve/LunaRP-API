import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Language } from '../language.entity';
import { CreatedLanguageDto } from '../dto/language.dto';

@Injectable()
export class LanguagesService {
    constructor(
        @InjectRepository(Language)
        private languagesRepository: Repository<Language>,
    ) {}
    
    async GetAll(): Promise<Language[]> {
        return await this.languagesRepository.find();
    }

    async FindOneId(id: number): Promise<Language> {
        return await this.languagesRepository.findOne({ where: {id: id} });
    }

    Create(language: CreatedLanguageDto): Promise<Language> {
        const newLanguage = this.languagesRepository.create(language);
        return this.languagesRepository.save(newLanguage);
    }

    async Delete(id: number): Promise<Language[]> {
        let language = await this.languagesRepository.findOne({ where: {id: id} });
        return this.languagesRepository.remove([language]);
    }

    async Update(id: number, language: CreatedLanguageDto): Promise<UpdateResult> {
        return await this.languagesRepository.update(id, {...language});
    }
}
