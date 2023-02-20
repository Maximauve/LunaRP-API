import { Body, Controller, Post, Get, Logger, Param } from '@nestjs/common';
import { SpellsService } from '../services/spell.service';
import { CreatedSpellDto } from '../dto/spell.dto';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';


@Controller('spells')
export class SpellsController {

  constructor(private spellsService: SpellsService) {}

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
  Create(@Body() spell: CreatedSpellDto): {} {
    return this.spellsService.Create(spell);
  }
}