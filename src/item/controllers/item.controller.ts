import { Body, Controller, Post, Get, Req, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemsService } from '../services/item.service';
import { CreatedItemDto } from '../dto/item.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/services/users.service';
import { Role } from 'src/users/role.enum';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { DeletedItemDto } from '../dto/deletedItem.dto';
import { UpdatedItemDto } from '../dto/updateItem.dto';

@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemsController {

  constructor(private itemsService: ItemsService, private usersService: UsersService) {}

  @Get()
  GetAll(): {} {
    return this.itemsService.GetAll();
  }

  @Get('/:id')
  GetOne(@Param('id') id: string): {} {
    return this.itemsService.FindOneId(+id);
  }


  @UsePipes(ValidationPipe)
  @Post('/create')
  async Create(@Req() req, @Body() item: CreatedItemDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.itemsService.Create(item);
  }

  @Post('/delete')
  async Delete(@Req() req, @Body() deletedItem: DeletedItemDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.itemsService.Delete(deletedItem.id);
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