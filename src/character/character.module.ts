import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Character } from './character.entity';
import { CharactersController } from './controllers/character.controller';
import { CharactersService } from './services/character.service';
import { CharacterItem } from './character_item.entity';
import { UsersModule } from 'src/users/users.module';
import { RaceModule } from 'src/race/race.module';
import { CampaignModule } from 'src/campaign/campaign.module';
import { SpellModule } from 'src/spell/spell.module';
import { ClassModule } from 'src/class/class.module';

@Module({
    imports: [TypeOrmModule.forFeature([Character]), TypeOrmModule.forFeature([CharacterItem]), forwardRef(() => UsersModule), forwardRef(() => CampaignModule), forwardRef(() => RaceModule), forwardRef(() => SpellModule), forwardRef(() => ClassModule)],
    controllers: [CharactersController],
    providers: [CharactersService],
    exports: [CharactersService],
})
export class CharacterModule {}