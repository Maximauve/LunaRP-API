import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Spell } from './spell.entity';
import { SpellsController } from './controllers/spell.controller';
import { SpellsService } from './services/spell.service';

@Module({
    imports: [TypeOrmModule.forFeature([Spell])],
    controllers: [SpellsController],
    providers: [SpellsService],
    exports: [SpellsService],
})
export class SpellModule {}