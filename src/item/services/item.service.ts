import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Item } from '../item.entity';
import { CreatedItemDto } from '../dto/item.dto';
import LocalFilesService from 'src/localFile/localFile.service';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
        private localFilesService: LocalFilesService,
    ) {}
    
    async GetAll(): Promise<Item[]> {
        return await this.itemsRepository.find();
    }

    FindOneId(id: number): Promise<Item> {
        return this.itemsRepository.findOne({ where: {id: id} });
    }

    async Create(item: CreatedItemDto, fileData: LocalFileDto): Promise<Item> {
        const newItem = this.itemsRepository.create(item);
        let itemCreated = await this.itemsRepository.save(newItem);
        const image = await this.localFilesService.saveLocalFileData(fileData);
        await this.itemsRepository.update(itemCreated.id, {itemId: image.id});
        return itemCreated;
    }

    async Delete(id: number): Promise<Item[]> {
        let item = await this.itemsRepository.findOne({ where: {id: id} });
        return this.itemsRepository.remove([item]);
    }

    async Update(id: number, item: CreatedItemDto): Promise<UpdateResult> {
        return await this.itemsRepository.update(id, {...item});
    }
}
