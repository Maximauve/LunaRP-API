import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Race } from './race.entity';
import { RacesController } from './controllers/race.controller';
import { RacesService } from './services/race.service';

@Module({
    imports: [TypeOrmModule.forFeature([Race])],
    controllers: [RacesController],
    providers: [RacesService],
    exports: [RacesService],
})
export class RaceModule {}