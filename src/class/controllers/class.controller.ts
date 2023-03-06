import { Body, Controller, Post, Get, Req, Logger, Param } from '@nestjs/common';
import { ClassService } from '../services/class.service';
import { UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CreatedClassDto } from '../dto/class.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { UsersService } from 'src/users/services/users.service';
import { Role } from 'src/users/role.enum';
import { DeletedClassDto } from '../dto/deletedClass.dto';
import { UpdatedClassDto } from '../dto/updatedClass.dto';
 
@UseGuards(JwtAuthGuard)
@Controller('class')
export class ClassController {

  constructor(private classService: ClassService, private usersService: UsersService) {}

  @Get()
  GetAll(): {} {
    return this.classService.GetAll();
  }

  @Get('/:id')
  GetOne(@Param('id') id: string): {} {
    return this.classService.FindOneId(+id);
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  async Create(@Req() req, @Body() classes: CreatedClassDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.classService.Create(classes);
  }

  @Post('/delete')
  async Delete(@Req() req, @Body() deletedClasses: DeletedClassDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.classService.Delete(deletedClasses.id);
  }

  @Post('/update')
  async Update(@Req() req, @Body() updatedClasses: UpdatedClassDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    let classe = await this.classService.FindOneId(updatedClasses.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    } else if (!classe) {
      throw new HttpException('This class does not exist', HttpStatus.NOT_FOUND);
    }
    let newClasse: CreatedClassDto = {
      name: updatedClasses.name ? updatedClasses.name : classe.name,
      dice: updatedClasses.dice ? updatedClasses.dice : classe.dice,
      description: updatedClasses.description ? updatedClasses.description : classe.description
    }
    this.classService.Update(updatedClasses.id, newClasse);
    return { "message": "Class updated" }
  }
}