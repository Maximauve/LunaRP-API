import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Class } from './class.entity';
import { ClassController } from './controllers/class.controller';
import { ClassService } from './services/class.service';

@Module({
    imports: [TypeOrmModule.forFeature([Class])],
    controllers: [ClassController],
    providers: [ClassService],
    exports: [ClassService],
})
export class ClassModule {}