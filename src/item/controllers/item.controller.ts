import { Body, Controller, Post, Get, Req, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemsService } from '../services/item.service';
import { CreatedItemDto } from '../dto/item.dto';
import { UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/services/users.service';
import { Role } from 'src/users/role.enum';
import { Express } from 'express';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { DeletedItemDto } from '../dto/deletedItem.dto';
import { UpdatedItemDto } from '../dto/updateItem.dto';
import LocalFilesInterceptor from 'src/localFile/localFile.interceptor';
import LocalFilesService from 'src/localFile/localFile.service';
import LocalFile from 'src/localFile/localFile.entity';
import { ItemFileDto } from '../dto/itemFile.dto';

@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemsController {

  constructor(private itemsService: ItemsService, private usersService: UsersService, private localFileService: LocalFilesService) {}

  @Get()
  async GetAll() {
    let items = await this.itemsService.GetAll();
    let newItemArray = [];
    await Promise.all(items.map(async (item: any) => {
      if (item.itemId) {
        let localFile = await this.localFileService.getFileById(item.itemId);
        let newItem: ItemFileDto = {
          ...item,
          path: `${localFile.path}.${localFile.mimetype.split('/')[1]}`
        }
        newItemArray.push(newItem);
      } else {
        newItemArray.push(item);
      }
    }));
    return newItemArray;
  }

  @Get('/:id')
  async GetOne(@Param('id') id: string) {
    let item = await this.itemsService.FindOneId(+id);
    let localFile: LocalFile;
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    } else if (item.itemId) { 
      localFile = await this.localFileService.getFileById(item.itemId);
      let newItem: ItemFileDto = {
        ...item,
        path: `${localFile.path}.${localFile.mimetype.split('/')[1]}`
      }
      return newItem;
    }
    return item;
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'file',
    path:'/items'
  }))
  async Create(@Req() req, @Body() item: CreatedItemDto, @UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      return this.itemsService.Create(item);
    }
    return this.itemsService.CreateWithFile(item, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype
    });
  }

  @Post('/delete')
  @UsePipes(ValidationPipe)
  async Delete(@Req() req, @Body() deletedItem: DeletedItemDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.itemsService.Delete(deletedItem.id);
  }

  @Post('/update')
  @UsePipes(ValidationPipe)
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'file',
    path:'/items'
  }))
  async Update(@Req() req, @Body() updateItem: UpdatedItemDto, @UploadedFile() file?: Express.Multer.File) {
    let me = await this.usersService.FindOneId(req.user.id);
    let item = await this.itemsService.FindOneId(updateItem.id);  
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    } else if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    } else if (file) {
      await this.itemsService.UpdateWithFile(updateItem.id, {
        path: file.path,
        filename: file.originalname,
        mimetype: file.mimetype
      });
      if (item.itemId) await this.localFileService.deleteFileById(item.itemId);
    }
    let newItem: CreatedItemDto = {
      name: updateItem.name ? updateItem.name : item.name,
      price: updateItem.price ? updateItem.price : item.price,
      damages: updateItem.damages ? updateItem.damages : item.damages,
      defense: updateItem.defense ? updateItem.defense : item.defense,
      regeneration: updateItem.regeneration ? updateItem.regeneration : item.regeneration,
      description: updateItem.description ? updateItem.description : item.description
    }
    await this.itemsService.Update(updateItem.id, newItem);
    return { message: 'Item updated' }
  }
}