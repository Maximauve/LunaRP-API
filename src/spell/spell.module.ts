import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Spell } from './spell.entity';
import { SpellsController } from './controllers/spell.controller';
import { SpellsService } from './services/spell.service';
import { UsersModule } from 'src/users/users.module';
import { ClassModule } from 'src/class/class.module';

@Module({
    imports: [TypeOrmModule.forFeature([Spell]), forwardRef(() => UsersModule), forwardRef(() => ClassModule)],
    controllers: [SpellsController],
    providers: [SpellsService],
    exports: [SpellsService],
})
export class SpellModule {}