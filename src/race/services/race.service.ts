import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Race } from '../race.entity';
import { CreatedRaceDto } from '../dto/race.dto';
import { UpdatedRaceDto } from '../dto/updatedRace.dto';

@Injectable()
export class RacesService {
    constructor(
        @InjectRepository(Race)
        private racesRepository: Repository<Race>,
    ) {}
    
    async GetAll(): Promise<Race[]> {
        return await this.racesRepository.find({
            relations: {
                languages: true,
            },
        });
    }

    async FindOneId(id: number): Promise<Race> {
        let race = await this.racesRepository.findOne({
            relations: {
                languages: true,
            },
            where: {
                id: id
            } 
        });
        return race
    }

    Create(race: CreatedRaceDto): Promise<Race> {
        const newRace = this.racesRepository.create(race);
        return this.racesRepository.save(newRace);
    }

    async Delete(id: number): Promise<Race[]> {
        let race = await this.racesRepository.findOne({ where: {id: id} });
        return this.racesRepository.remove([race]);
    }

    async Update(race: UpdatedRaceDto): Promise<Race> {
        return await this.racesRepository.save(race);
    }
}
