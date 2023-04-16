import { Body, Controller, Post, Get, Req, Logger, Param, ValidationPipe } from '@nestjs/common';
import { RacesService } from '../services/race.service';
import { UseGuards, UsePipes } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatedRaceDto } from '../dto/race.dto';
import { UsersService } from 'src/users/services/users.service';
import { Role } from 'src/users/role.enum';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { DeletedRaceDto } from '../dto/deletedRace.dto';
import { UpdatedRaceDto } from '../dto/updatedRace.dto';
import { LanguagesService } from 'src/language/services/language.service';
import { Language } from 'src/language/language.entity';

@UseGuards(JwtAuthGuard)
@Controller('races')
export class RacesController {

  constructor(private racesService: RacesService, private usersService: UsersService, private languagesService: LanguagesService) {}

  @Get()
  GetAll(): {} {
    return this.racesService.GetAll();
  }

  @Get('/:id')
  GetOne(@Param('id') id: string): {} {
    return this.racesService.FindOneId(+id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async Create(@Req() req, @Body() race: CreatedRaceDto) {
    let languageArray: Language[] = [];
    await Promise.all(race.languages.map(async (language: any) => {
      language = await this.languagesService.findOne(language);
      if (language) languageArray.push(language);
    }));
    race.languages = languageArray;
    return await this.racesService.Create(race);
  }

  @Post('/delete')
  @UsePipes(ValidationPipe)
  async Delete(@Req() req, @Body() deletedRace: DeletedRaceDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.racesService.Delete(deletedRace.id);
  }

  @Post('/update')
  @UsePipes(ValidationPipe)
  async Update(@Req() req, @Body() updateRace: UpdatedRaceDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    let race = await this.racesService.FindOneId(updateRace.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    } else if (!race) {
      throw new HttpException('Race not found', HttpStatus.NOT_FOUND);
    }
    let languageArray: Language[] = [];
    if (updateRace.languages) {
      await Promise.all(updateRace.languages.map(async (language: any) => {
        language = await this.languagesService.findOne(language);
        languageArray.push(language);
      }));
      updateRace.languages = languageArray;
    }
    let newRace: UpdatedRaceDto = {
      id: updateRace.id,
      name: updateRace.name ? updateRace.name : race.name,
      speed: updateRace.speed ? updateRace.speed : race.speed,
      size: updateRace.size ? updateRace.size : race.size,
      description: updateRace.description ? updateRace.description : race.description,
      languages: updateRace.languages ? updateRace.languages : race.languages
    };
    this.racesService.Update(newRace);
    return { message : "Race updated" };

  }
}