import { Body, Controller, Post, Get, Req, Logger, Param } from '@nestjs/common';
import { ClasseService } from '../services/classe.service';
import { UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CreatedClasseDto } from '../dto/classe.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { UsersService } from 'src/users/services/users.service';
import { Role } from 'src/users/role.enum';
import { DeletedClasseDto } from '../dto/deletedClasse.dto';
import { UpdatedClasseDto } from '../dto/updatedClasse.dto';
 
@UseGuards(JwtAuthGuard)
@Controller('class')
export class ClasseController {

  constructor(private classeService: ClasseService, private usersService: UsersService) {}

  @Get()
  GetAll(): {} {
    return this.classeService.GetAll();
  }

  @Get('/:id')
  GetOne(@Param('id') id: string): {} {
    return this.classeService.FindOneId(+id);
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  async Create(@Req() req, @Body() classes: CreatedClasseDto) {
    return this.classeService.Create(classes);
  }

  @Post('/delete')
  @UsePipes(ValidationPipe)
  async Delete(@Req() req, @Body() deletedClasses: DeletedClasseDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.classeService.Delete(deletedClasses.id);
  }

  @Post('/update')
  @UsePipes(ValidationPipe)
  async Update(@Req() req, @Body() updatedClasses: UpdatedClasseDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    let classe = await this.classeService.FindOneId(updatedClasses.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    } else if (!classe) {
      throw new HttpException('This class does not exist', HttpStatus.NOT_FOUND);
    }
    let newClasse: CreatedClasseDto = {
      name: updatedClasses.name ? updatedClasses.name : classe.name,
      dice: updatedClasses.dice ? updatedClasses.dice : classe.dice,
      description: updatedClasses.description ? updatedClasses.description : classe.description
    }
    this.classeService.Update(updatedClasses.id, newClasse);
    return { "message": "Class updated" }
  }
}