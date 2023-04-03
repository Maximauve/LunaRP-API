import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { forwardRef } from '@nestjs/common/utils';
import { AuthModule } from 'src/auth/auth.module';
import { LocalFileModule } from 'src/localFile/localFile.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule), forwardRef(() => LocalFileModule)],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}