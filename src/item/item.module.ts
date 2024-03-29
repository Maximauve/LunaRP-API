import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Item } from './item.entity';
import { ItemsController } from './controllers/item.controller';
import { ItemsService } from './services/item.service';
import { UsersModule } from 'src/users/users.module';
import { LocalFileModule } from 'src/localFile/localFile.module';

@Module({
    imports: [TypeOrmModule.forFeature([Item]), forwardRef(() => UsersModule), forwardRef(() => LocalFileModule)],
    controllers: [ItemsController],
    providers: [ItemsService],
    exports: [ItemsService],
})
export class ItemModule {}