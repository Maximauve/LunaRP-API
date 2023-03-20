import { Body, Controller, Post, Get, Param, Req } from '@nestjs/common';
import { UseGuards, UsePipes } from '@nestjs/common/decorators';
import { CharactersService } from '../services/character.service';
import { ValidationPipe } from '@nestjs/common/pipes';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CreatedCharacterDto } from '../dto/character.dto';
import { Role } from 'src/users/role.enum';
import { UsersService } from 'src/users/services/users.service';
import { DeletedCharacterDto } from '../dto/deletedCharacter.dto';
import { UpdatedCharacterDto } from '../dto/updatedCharacter.dto';
import { Campaign } from 'src/campaign/campaign.entity';
import { CampaignsService } from 'src/campaign/services/campaign.service';
import { RacesService } from 'src/race/services/race.service';
import { Spell } from 'src/spell/spell.entity';
import { SpellsService } from 'src/spell/services/spell.service';
import { ClassService } from 'src/class/services/class.service';
import { CharacterItem } from '../../characterItem/character_item.entity';
import { Item } from 'src/item/item.entity';
import { ItemsService } from 'src/item/services/item.service';
import { CharactersItemService } from 'src/characterItem/services/characterItem.service';
import { CreatedCharacterItemDto } from 'src/characterItem/dto/characterItem.dto';


@Controller('characters')
@UseGuards(JwtAuthGuard)
export class CharactersController {

  constructor(private charactersService: CharactersService, 
    private usersService: UsersService, 
    private campaignsService: CampaignsService, 
    private racesServices: RacesService, 
    private spellsServices: SpellsService, 
    private classServices: ClassService, 
    private itemsServices: ItemsService,
    private characterItemServices: CharactersItemService) {}

  @Get()
  GetAll(): {} {
    return this.charactersService.GetAll();
  }

  @Get('/:id')
  GetOne(@Param('id') id: string): {} {
    return this.charactersService.FindOneId(+id);
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  async Create(@Req() req, @Body() character: CreatedCharacterDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    character.user = await this.usersService.FindOneId(me.id);
    let raceId: any = character.race;
    character.race = await this.racesServices.FindOneId(raceId);
    character.campaign = [];
    
    let spellArray: Spell[] = [];
    await Promise.all(character.spells.map(async (spell: any) => {
      spell = await this.spellsServices.FindOneId(spell);
      if (spell) spellArray.push(spell);
    }));
    character.spells = spellArray;
    
    let classId: any = character.class;
    character.class = await this.classServices.FindOneId(classId);
    let characterCreated = await this.charactersService.Create(character);

    let characterItemArray: CharacterItem[] = [];
    await Promise.all(character.inventory.map(async (item: any) => {
      item = await this.itemsServices.FindOneId(item);
      if (item) {
        let newCharacterItem: CreatedCharacterItemDto = {
          quantity: 1,
          character: characterCreated,
          item: item
        }
        let charac = await this.characterItemServices.Create(newCharacterItem);
        characterItemArray.push(charac);
      }
    }));
    characterCreated.inventory = characterItemArray;
    await this.charactersService.Update(characterCreated);
    return characterCreated;
  }

  @Post('/delete')
  async Delete(@Req() req, @Body() deletedCharacter: DeletedCharacterDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    let character = await this.charactersService.Delete(deletedCharacter.id)
    if (!character) throw new HttpException('This character does not exist', HttpStatus.NOT_FOUND);
    return character;
  }

  @Post('/update')
  async Update(@Req() req, @Body() updatedCharacter: UpdatedCharacterDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    let character = await this.charactersService.FindOneId(updatedCharacter.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    } else if (!character) {
      throw new HttpException('This character does not exist', HttpStatus.NOT_FOUND);
    }
    if (updatedCharacter.user) {
      let id: any = updatedCharacter.user;
      updatedCharacter.user = await this.usersService.FindOneId(id);
    }
    if (updatedCharacter.campaign) {
      updatedCharacter.campaign = [...updatedCharacter.campaign, ...character.campaign]
      let campaignArray: Campaign[] = [];
      await Promise.all(updatedCharacter.campaign.map(async (campaign: any) => {
        campaign = await this.campaignsService.FindOneId(campaign);
        if (campaign) campaignArray.push(campaign);
      }));
      updatedCharacter.campaign = campaignArray;
    }
    if (updatedCharacter.race) {
      let raceId: any = updatedCharacter.race;
      updatedCharacter.race = await this.racesServices.FindOneId(raceId);
    }
    if (updatedCharacter.spells) {
      let spellArray: Spell[] = [];
      await Promise.all(updatedCharacter.spells.map(async (spell: any) => {
        spell = await this.spellsServices.FindOneId(spell);
        if (spell) spellArray.push(spell);
      }));
      updatedCharacter.spells = spellArray;
    }
    if (updatedCharacter.class) {
      let classId: any = updatedCharacter.class;
      updatedCharacter.class = await this.classServices.FindOneId(classId);
    }
    if (updatedCharacter.inventory) {
      // comparer les deux tableaux et ajouter les items qui ne sont pas dans le tableau

    }
    let newCharacter: UpdatedCharacterDto = {
      id: updatedCharacter.id,
      name: updatedCharacter.name ? updatedCharacter.name : character.name,
      level: updatedCharacter.level ? updatedCharacter.level : character.level,
      alignment: updatedCharacter.alignment ? updatedCharacter.alignment : character.alignment,
      strength: updatedCharacter.strength ? updatedCharacter.strength : character.strength,
      dexterity: updatedCharacter.dexterity ? updatedCharacter.dexterity : character.dexterity,
      constitution: updatedCharacter.constitution ? updatedCharacter.constitution : character.constitution,
      intelligence: updatedCharacter.intelligence ? updatedCharacter.intelligence : character.intelligence,
      wisdom: updatedCharacter.wisdom ? updatedCharacter.wisdom : character.wisdom,
      charisma: updatedCharacter.charisma ? updatedCharacter.charisma : character.charisma,
      experience: updatedCharacter.experience ? updatedCharacter.experience : character.experience,
      description: updatedCharacter.description ? updatedCharacter.description : character.description,
      user: updatedCharacter.user ? updatedCharacter.user : character.user,
      campaign: updatedCharacter.campaign ? updatedCharacter.campaign : character.campaign,
      spells: updatedCharacter.spells ? updatedCharacter.spells : character.spells,
      class: updatedCharacter.class ? updatedCharacter.class : character.class,
      inventory: updatedCharacter.inventory ? updatedCharacter.inventory : character.inventory,
    }

    return this.charactersService.Update(newCharacter);
  }
}