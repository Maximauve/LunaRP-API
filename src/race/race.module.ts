import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Race } from './race.entity';
import { RacesController } from './controllers/race.controller';
import { RacesService } from './services/race.service';
import { UsersModule } from 'src/users/users.module';
import { LanguageModule } from 'src/language/language.module';

@Module({
    imports: [TypeOrmModule.forFeature([Race]), forwardRef(() => UsersModule), forwardRef(() => LanguageModule)],
    controllers: [RacesController],
    providers: [RacesService],
    exports: [RacesService],
})
export class RaceModule {}