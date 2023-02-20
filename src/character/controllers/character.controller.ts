import { Body, Controller, Post, Get } from '@nestjs/common';
import { UseGuards, UsePipes } from '@nestjs/common/decorators';
import { CharactersService } from '../services/character.service';
import { ValidationPipe } from '@nestjs/common/pipes';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatedCharacterDto } from '../dto/character.dto';


@Controller('characters')
@UseGuards(JwtAuthGuard)
export class CharactersController {

  constructor(private charactersService: CharactersService) {}

  @Get()
  GetAll(): {} {
    return this.charactersService.GetAll();
  }

  @UsePipes(ValidationPipe)
  @Post('create')
  Create(@Body() body: CreatedCharacterDto): {} {
    return this.charactersService.Create(body);
  }
}