import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocalFile from './localFile.entity';
import LocalFilesController from './localFile.controller';
import LocalFilesService from './localFile.service';

@Module({
    imports: [TypeOrmModule.forFeature([LocalFile])],
    controllers: [LocalFilesController],
    providers: [LocalFilesService],
    exports: [LocalFilesService],
})
export class LocalFileModule {}