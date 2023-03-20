import { Body, Controller, Post, Get, Req, Param } from '@nestjs/common';
import { LanguagesService } from '../services/language.service';
import { UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatedLanguageDto } from '../dto/language.dto';
import { UsersService } from 'src/users/services/users.service';
import { Role } from 'src/users/role.enum';
import { DeletedLanguageDto } from '../dto/deletedLanguage.dto';
import { UpdatedLanguageDto } from '../dto/updatedLanguage.dto';


@UseGuards(JwtAuthGuard)
@Controller('languages')
export class LanguagesController {

  constructor(private languagesService: LanguagesService, private usersService: UsersService) {}

  @Get()
  GetAll(): {} {
    return this.languagesService.GetAll();
  }

  @Get('/:id')
  GetOne(@Param('id') id: string): {} {
    return this.languagesService.FindOneId(+id);
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  async Create(@Req() req, @Body() language: CreatedLanguageDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.languagesService.Create(language);
  }

  @Post('/delete')
  @UsePipes(ValidationPipe)
  async Delete(@Req() req, @Body() deletedLanguage: DeletedLanguageDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.languagesService.Delete(deletedLanguage.id);
  }

  @Post('/update')
  @UsePipes(ValidationPipe)
  async Update(@Req() req, @Body() updateLanguage: UpdatedLanguageDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    let language = await this.languagesService.FindOneId(updateLanguage.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    } else if (!language) {
      throw new HttpException('Language not found', HttpStatus.NOT_FOUND);
    }
    let newLanguage: CreatedLanguageDto = {
      name: updateLanguage.name ? updateLanguage.name : language.name,
      description: updateLanguage.description ? updateLanguage.description : language.description,
    }
    this.languagesService.Update(updateLanguage.id, newLanguage);
    return { message: 'Language updated' }
  }
}