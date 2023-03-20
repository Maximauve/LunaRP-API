import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Classe } from '../classe.entity';
import { CreatedClasseDto } from '../dto/classe.dto';

@Injectable()
export class ClasseService {
    constructor(
        @InjectRepository(Classe)
        private classeRepository: Repository<Classe>,
    ) {}
    
    async GetAll(): Promise<Classe[]> {
        return await this.classeRepository.find({
            relations: {
                spells: true,
            }
        });
    }

    FindOneId(id: number): Promise<Classe> {
        return this.classeRepository.findOne({ 
            relations: {
                spells: true,
            },
            where: {id: id} });
        }

    Create(classe: CreatedClasseDto): Promise<Classe> {
        const newClass = this.classeRepository.create(classe);
        return this.classeRepository.save(newClass);
    }

    async Delete(id: number): Promise<Classe[]> {
        let classe = await this.classeRepository.findOne({ where: {id: id} });
        return this.classeRepository.remove([classe]);
    }

    async Update(id: number, classe: CreatedClasseDto): Promise<UpdateResult> {
        return await this.classeRepository.update(id, {...classe});
    }
}
