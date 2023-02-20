import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Item } from '../item.entity';
import { CreatedItemDto } from '../dto/item.dto';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
    ) {}
    
    async GetAll(): Promise<Item[]> {
        return await this.itemsRepository.find();
    }

    FindOneId(id: number): Promise<Item> {
        return this.itemsRepository.findOne({ where: {id: id} });
    }

    Create(item: CreatedItemDto): Promise<Item> {
        const newItem = this.itemsRepository.create(item);
        return this.itemsRepository.save(newItem);
    }

    async Delete(id: number): Promise<Item[]> {
        let item = await this.itemsRepository.findOne({ where: {id: id} });
        return this.itemsRepository.remove([item]);
    }

    async Update(id: number, item: CreatedItemDto): Promise<UpdateResult> {
        return await this.itemsRepository.update(id, {...item});
    }
}
