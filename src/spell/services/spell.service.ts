import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spell } from '../spell.entity';
import { CreatedSpellDto } from '../dto/spell.dto';
import { UpdatedSpellDto } from '../dto/updatedSpell.dto';

@Injectable()
export class SpellsService {
	constructor(
		@InjectRepository(Spell)
		private spellsRepository: Repository<Spell>,
	) { }

	async GetAll(): Promise<Spell[]> {
		return await this.spellsRepository.find({
			relations: {
				classes: true,
			}
		});
	}

	FindOneId(id: number): Promise<Spell> {
		return this.spellsRepository.findOne({
			relations: {
				classes: true,
			},
			where: { id: id }
		});
	}

	Create(spell: CreatedSpellDto): Promise<Spell> {
		const newSpell = this.spellsRepository.create(spell);
		return this.spellsRepository.save(newSpell);
	}

	async Delete(id: number): Promise<Spell[]> {
		let spell = await this.spellsRepository.findOne({ where: { id: id } });
		return this.spellsRepository.remove([spell]);
	}

	async Update(spell: UpdatedSpellDto): Promise<Spell> {
		return await this.spellsRepository.save(spell);
	}
}
