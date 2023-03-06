import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Classes } from '../class.entity';
import { CreatedClassDto } from '../dto/class.dto';

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Classes)
        private classRepository: Repository<Classes>,
    ) {}
    
    async GetAll(): Promise<Classes[]> {
        return await this.classRepository.find({
            relations: {
                spells: true,
            }
        });
    }

    FindOneId(id: number): Promise<Classes> {
        return this.classRepository.findOne({ 
            relations: {
                spells: true,
            },
            where: {id: id} });
        }

    Create(classe: CreatedClassDto): Promise<Classes> {
        const newClass = this.classRepository.create(classe);
        return this.classRepository.save(newClass);
    }

    async Delete(id: number): Promise<Classes[]> {
        let classe = await this.classRepository.findOne({ where: {id: id} });
        return this.classRepository.remove([classe]);
    }

    async Update(id: number, classe: CreatedClassDto): Promise<UpdateResult> {
        return await this.classRepository.update(id, {...classe});
    }
}
