import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Language } from './language.entity';
import { LanguagesController } from './controllers/language.controller';
import { LanguagesService } from './services/language.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Language]), forwardRef(() => UsersModule)],
    controllers: [LanguagesController],
    providers: [LanguagesService],
    exports: [LanguagesService],
})
export class LanguageModule {}