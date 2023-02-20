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
  async Delete(@Req() req, @Body() deletedLanguage: DeletedLanguageDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.languagesService.Delete(deletedLanguage.id);
  }

  @Post('/update')
  async Update(@Req() req, @Body() updateItem: UpdatedItemDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    let item = await this.itemsService.FindOneId(updateItem.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    } else if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    let newItem: CreatedItemDto = {
      name: updateItem.name ? updateItem.name : item.name,
      price: updateItem.price ? updateItem.price : item.price,
      damages: updateItem.damages ? updateItem.damages : item.damages,
      defense: updateItem.defense ? updateItem.defense : item.defense,
      regeneration: updateItem.regeneration ? updateItem.regeneration : item.regeneration,
      image: updateItem.image ? updateItem.image : item.image,
      description: updateItem.description ? updateItem.description : item.description
    }
    this.itemsService.Update(updateItem.id, newItem);
    return { message: 'Item updated' }
  }
}