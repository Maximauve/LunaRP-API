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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import LocalFilesInterceptor from 'src/localFile/localFile.interceptor';

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
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'file',
    path:'/items'
  }))
  async Create(@Req() req, @Body() item: CreatedItemDto, @UploadedFile() file: Express.Multer.File) {
    console.log("cc");
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    console.log(file);
    return this.itemsService.Create(item, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype
    });
  }

  // ⁠curl -i -X POST -H "Content-Type: multipart/form-data" -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdHRveCIsImlkIjoxLCJpYXQiOjE2NzkzMjE0MjQsImV4cCI6MTY3OTMyNTAyNH0.1RKcZo9m171VFNa0tKGxEZtnHO2kx8N42lowelc-3Dk" -F "file=@AH.png" http://localhost:3000/items/image
  // curl -i -X POST -H "Content-Type: mutiipart/form-data" -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdHRveCIsImlkIjoxLCJpYXQiOjE2NzkzMjE0MjQsImV4cCI6MTY3OTMyNTAyNH0.1RKcZo9m171VFNa0tKGxEZtnHO2kx8N42lowelc-3Dk" -F "file=@AH.png" http://localhost:3000/items/image
 
  @Post('/image')
  @UseInterceptors(FileInterceptor('file', {
    dest: './uploads',
  }))
  uploadFile(@UploadedFile() file) {
    // let me = await this.usersService.FindOneId(req.user.id);
    // if (me.role !== Role.Admin) {
    //   throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    // }
    console.log("coucou");
    console.log("file -> ", file);
    // return this.itemsService.UploadImage(file);
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
      description: updateItem.description ? updateItem.description : item.description
    }
    // image: updateItem.image ? updateItem.image : item.image,
    this.itemsService.Update(updateItem.id, newItem);
    return { message: 'Item updated' }
  }
}