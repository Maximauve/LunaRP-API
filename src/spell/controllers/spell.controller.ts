import { Body, Controller, Post, Get, Req, Logger, Param } from '@nestjs/common';
import { SpellsService } from '../services/spell.service';
import { CreatedSpellDto } from '../dto/spell.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { UsersService } from 'src/users/services/users.service';
import { Role } from 'src/users/role.enum';
import { Classe } from 'src/class/classe.entity';
import { ClasseService } from 'src/class/services/classe.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeletedSpellDto } from '../dto/DeletedClass.dto';
import { UpdatedSpellDto } from '../dto/updatedClass.dto';

@UseGuards(JwtAuthGuard)
@Controller('spells')
export class SpellsController {

  constructor(private spellsService: SpellsService, private usersService: UsersService, private classesService: ClasseService) {}

  @Get()
  GetAll(): {} {
    return this.spellsService.GetAll();
  }

  @Get('/:id')
  GetOne(@Param('id') id: string): {} {
    return this.spellsService.FindOneId(+id);
  }

  @UsePipes(ValidationPipe)
  @Post("/create")
  async Create(@Req() req, @Body() spell: CreatedSpellDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    let classArray: Classe[] = [];
    await Promise.all(spell.classes.map(async (classe :any) => {
      classe = await this.classesService.FindOneId(classe);
      classArray.push(classe);
    }));
    spell.classes = classArray;
    return this.spellsService.Create(spell);
  }

  @Post('/delete')
  async Delete(@Req() req, @Body() deletedSpell: DeletedSpellDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.spellsService.Delete(deletedSpell.id);
  }

  @Post('/update')
  async Update(@Req() req, @Body() updateSpell: UpdatedSpellDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    let spell = await this.spellsService.FindOneId(updateSpell.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    } else if (!spell) {
      throw new HttpException('This spell does not exist', HttpStatus.NOT_FOUND);
    }
    let classArray: Classe[] = [];
    if (updateSpell.classes) {
      await Promise.all(updateSpell.classes.map(async (classe: any) => {
        classe = await this.classesService.FindOneId(classe);
        classArray.push(classe);
      }));
      updateSpell.classes = classArray;
    }
    let newSpell: UpdatedSpellDto = {
      id: updateSpell.id,
      name: updateSpell.name ? updateSpell.name : spell.name,
      level: updateSpell.level ? updateSpell.level : spell.level,
      scope: updateSpell.scope ? updateSpell.scope : spell.scope,
      component: updateSpell.component ? updateSpell.component : spell.component,
      casting_time: updateSpell.casting_time ? updateSpell.casting_time : spell.casting_time,
      duration: updateSpell.duration ? updateSpell.duration : spell.duration,
      description: updateSpell.description ? updateSpell.description : spell.description,
      classes: updateSpell.classes ? updateSpell.classes : spell.classes
    }
    return this.spellsService.Update(newSpell);
  }
}