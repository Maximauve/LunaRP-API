import { Body, Controller, Post, Get, Logger, Param } from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Req, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/services/auth.service';
import { CampaignsService } from '../services/campaign.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatedCampaignDto } from '../dto/campaign.dto';
import { UsersService } from 'src/users/services/users.service';
import { Role } from 'src/users/role.enum';
import { DeletedCampaignDto } from '../dto/deletedCampaign.dto';
import { UpdatedCampaignDto } from '../dto/updatedCampaign.dto';
import { Classe } from 'src/class/classe.entity';
import { ClasseService } from 'src/class/services/classe.service';
import { Race } from 'src/race/race.entity';
import { RacesService } from 'src/race/services/race.service';
import { Character } from 'src/character/character.entity';
 
@UseGuards(JwtAuthGuard)
@Controller('campaigns')
export class CampaignsController {

  constructor(private campaignsService: CampaignsService, private usersService: UsersService, private classService: ClasseService, private racesService: RacesService) {}

  @Get()
  GetAll(): {} {
    return this.campaignsService.GetAll();
  }
  
  @Get('/:id')
  GetOne(@Param('id') id: string): {} {
    return this.campaignsService.FindOneId(+id);
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  async Create(@Req() req, @Body() campaign: CreatedCampaignDto) {
    if (campaign.character_min_level > campaign.character_max_level) {
      throw new HttpException('Min level > Max level', HttpStatus.BAD_REQUEST);
    }
    let id: any = campaign.game_master
    campaign.game_master = await this.usersService.FindOneId(id);
    let classArray: Classe[] = [];
    await Promise.all(campaign.classes.map(async (classe: any) => {
      classe = await this.classService.FindOneId(classe);
      if (classe) classArray.push(classe);
    }));
    campaign.classes = classArray;
    let raceArray: Race[] = [];
    await Promise.all(campaign.races.map(async (race: any) => {
      race = await this.racesService.FindOneId(race);
      if (race) raceArray.push(race);
    }));
    campaign.races = raceArray;
    let characterArray: Character[] = [];
    await Promise.all(campaign.characters.map(async (character: any) => {
      character = await this.usersService.FindOneId(character);
      if (character) characterArray.push(character);
    }));
    campaign.characters = characterArray;

    return this.campaignsService.Create(campaign);
  }

  @Post('/delete')
  @UsePipes(ValidationPipe)
  async Delete(@Req() req, @Body() deletedCampaign: DeletedCampaignDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.campaignsService.Delete(deletedCampaign.id);
  }

  @Post('/update')
  @UsePipes(ValidationPipe)
  async Update(@Req() req, @Body() updatedCampaign: UpdatedCampaignDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    let campaign = await this.campaignsService.FindOneId(updatedCampaign.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    } else if (!campaign) {
      throw new HttpException('This campaign does not exist', HttpStatus.NOT_FOUND);
    }
    if (updatedCampaign.game_master) {
      let id: any = campaign.game_master
      updatedCampaign.game_master = await this.usersService.FindOneId(id);
    }
    if (updatedCampaign.classes) {
      let classArray: Classe[] = [];
      await Promise.all(updatedCampaign.classes.map(async (classe: any) => {
        classe = await this.classService.FindOneId(classe);
        if (classe) classArray.push(classe);
      }));
      updatedCampaign.classes = classArray;
    }
    if (updatedCampaign.races) {
      let raceArray: Race[] = [];
      await Promise.all(updatedCampaign.races.map(async (race: any) => {
        race = await this.racesService.FindOneId(race);
        if (race) raceArray.push(race);
      }));
      updatedCampaign.races = raceArray;
    }
    if (updatedCampaign.characters) {
      let characterArray: Character[] = [];
      await Promise.all(updatedCampaign.characters.map(async (character: any) => {
        character = await this.usersService.FindOneId(character);
        if (character) characterArray.push(character);
      }));
      updatedCampaign.characters = characterArray;
    }
    let newCampaign: UpdatedCampaignDto = {
      id: updatedCampaign.id,
      character_max_level: updatedCampaign.character_max_level ? updatedCampaign.character_max_level : campaign.character_max_level,
      character_min_level: updatedCampaign.character_min_level ? updatedCampaign.character_min_level : campaign.character_min_level,
      game_master: updatedCampaign.game_master ? updatedCampaign.game_master : campaign.game_master,
      classes: updatedCampaign.classes ? updatedCampaign.classes : campaign.classes,
      races: updatedCampaign.races ? updatedCampaign.races : campaign.races,
      characters: updatedCampaign.characters ? updatedCampaign.characters : campaign.characters,
    };
    return this.campaignsService.Update(newCampaign);
  }
}