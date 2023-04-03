import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Classe } from './classe.entity';
import { ClasseController } from './controllers/classe.controller';
import { ClasseService } from './services/classe.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Classe]), forwardRef(() => UsersModule)],
    controllers: [ClasseController],
    providers: [ClasseService],
    exports: [ClasseService],
})
export class ClasseModule {}