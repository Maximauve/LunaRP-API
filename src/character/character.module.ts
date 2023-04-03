import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
    forwardRef } from '@nestjs/common/utils';
import { Character } from './character.entity';
import { CharactersController } from './controllers/character.controller';
import { CharactersService } from './services/character.service';
import { UsersModule } from 'src/users/users.module';
import { RaceModule } from 'src/race/race.module';
import { CampaignModule } from 'src/campaign/campaign.module';
import { SpellModule } from 'src/spell/spell.module';
import { ClasseModule } from 'src/class/class.module';
import { CharacterItemModule } from 'src/characterItem/characterItem.module';
import { ItemModule } from 'src/item/item.module';

@Module({
    imports: [TypeOrmModule.forFeature([Character]), 
    forwardRef(() => CharacterItemModule), 
    forwardRef(() => UsersModule), 
    forwardRef(() => CampaignModule), 
    forwardRef(() => RaceModule), 
    forwardRef(() => SpellModule), 
    forwardRef(() => ClasseModule),
    forwardRef(() => ItemModule)],
    controllers: [CharactersController],
    providers: [CharactersService],
    exports: [CharactersService],
})
export class CharacterModule {}