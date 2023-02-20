import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Character } from './character.entity';
import { CharactersController } from './controllers/character.controller';
import { CharactersService } from './services/character.service';
import { CharacterItem } from './character_item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Character]), TypeOrmModule.forFeature([CharacterItem])],
    controllers: [CharactersController],
    providers: [CharactersService],
    exports: [CharactersService],
})
export class CharacterModule {}