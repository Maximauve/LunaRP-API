import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spell } from '../spell.entity';
import { CreatedSpellDto } from '../dto/spell.dto';

@Injectable()
export class SpellsService {
    constructor(
        @InjectRepository(Spell)
        private spellsRepository: Repository<Spell>,
    ) {}
    
    async GetAll(): Promise<Spell[]> {
        return await this.spellsRepository.find();
    }

    FindOneId(id: number): Promise<Spell> {
        return this.spellsRepository.findOne({ where: {id: id} });
    }

    Create(spell: CreatedSpellDto): Promise<Spell> {
        const newSpell = this.spellsRepository.create(spell);
        return this.spellsRepository.save(newSpell);
    }
}
