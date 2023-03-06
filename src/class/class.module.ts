import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Classes } from './class.entity';
import { ClassController } from './controllers/class.controller';
import { ClassService } from './services/class.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Classes]), forwardRef(() => UsersModule)],
    controllers: [ClassController],
    providers: [ClassService],
    exports: [ClassService],
})
export class ClassModule {}