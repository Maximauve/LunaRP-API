import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Race } from '../race.entity';

@Injectable()
export class RacesService {
    constructor(
        @InjectRepository(Race)
        private racesRepository: Repository<Race>,
    ) {}
    
    async GetAll(): Promise<Race[]> {
        return await this.racesRepository.find();
    }
}
