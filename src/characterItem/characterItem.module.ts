import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { CharacterItem } from '../characterItem/character_item.entity';
import { CharactersItemService } from './services/characterItem.service';

@Module({
    imports: [TypeOrmModule.forFeature([CharacterItem])],
    controllers: [],
    providers: [CharactersItemService],
    exports: [CharactersItemService],
})
export class CharacterItemModule {}