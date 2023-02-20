import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Class } from '../class.entity';
import { CreatedClassDto } from '../dto/class.dto';

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private classRepository: Repository<Class>,
    ) {}
    
    async GetAll(): Promise<Class[]> {
        return await this.classRepository.find();
    }

    FindOneId(id: number): Promise<Class> {
        return this.classRepository.findOne({ where: {id: id} });
    }

    Create(classe: CreatedClassDto): Promise<Class> {
        const newClass = this.classRepository.create(classe);
        return this.classRepository.save(newClass);
    }

    async Delete(id: number): Promise<Class[]> {
        let classe = await this.classRepository.findOne({ where: {id: id} });
        return this.classRepository.remove([classe]);
    }

    async Update(id: number, classe: CreatedClassDto): Promise<UpdateResult> {
        return await this.classRepository.update(id, {...classe});
    }
}
