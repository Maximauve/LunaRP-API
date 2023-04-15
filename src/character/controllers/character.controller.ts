import { Body, Controller, Post, Get, Param, Req } from '@nestjs/common';
import { UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common/decorators';
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
import { ClasseService } from 'src/class/services/classe.service';
import { CharacterItem } from '../../characterItem/character_item.entity';
import { ItemsService } from 'src/item/services/item.service';
import { CharactersItemService } from 'src/characterItem/services/characterItem.service';
import { CreatedCharacterItemDto } from 'src/characterItem/dto/characterItem.dto';
import LocalFilesService from 'src/localFile/localFile.service';
import LocalFilesInterceptor from 'src/localFile/localFile.interceptor';
import { Character } from '../character.entity';
import LocalFile from 'src/localFile/localFile.entity';
import { CharacterFileDto } from '../dto/characterFile.dto';


@Controller('characters')
@UseGuards(JwtAuthGuard)
export class CharactersController {

  constructor(private charactersService: CharactersService, 
    private usersService: UsersService, 
    private campaignsService: CampaignsService, 
    private racesServices: RacesService, 
    private spellsServices: SpellsService, 
    private classServices: ClasseService, 
    private itemsServices: ItemsService,
    private characterItemServices: CharactersItemService,
    private localFileService: LocalFilesService
    ) {}

  @Get()
  async GetAll() {
    let characters = await this.charactersService.GetAll();
    let newCharacterArray = [];
    await Promise.all(characters.map(async (character: any) => {
      if (character.characterId) {
        let localFile = await this.localFileService.getFileById(character.characterId);
        let newCharacter: CharacterFileDto = {
          ...character,
          path: `${localFile.path}.${localFile.mimetype.split('/')[1]}`
        }
        newCharacterArray.push(newCharacter);
      } else {
        newCharacterArray.push(character);
      }
    }));
    return newCharacterArray;
  }

  @Get('/me')
  async GetMe(@Req() req) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (await this.usersService.FindOneId(me.id)) {
      let characters = await this.charactersService.FindAllByUser(me.id);
      let newCharacterArray = [];
      await Promise.all(characters.map(async (character: any) => {
        if (character.characterId) {
          let localFile = await this.localFileService.getFileById(character.characterId);
          let newCharacter: CharacterFileDto = {
            ...character,
            path: `${localFile.path}.${localFile.mimetype.split('/')[1]}`
          }
          newCharacterArray.push(newCharacter);
        } else {
          newCharacterArray.push(character);
        }
      }));
      return newCharacterArray;
    } else {
      throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
    }
  }


  @Get('/:id')
  async GetOne(@Param('id') id: string) {
    let character = await this.charactersService.FindOneId(+id);
    let localFile: LocalFile;
    if (!character) {
      throw new HttpException('Character not found', HttpStatus.NOT_FOUND);
    } else if (character.characterId) { 
      localFile = await this.localFileService.getFileById(character.characterId);
      let newCharacter: CharacterFileDto = {
        ...character,
        path: `${localFile.path}.${localFile.mimetype.split('/')[1]}`
      }
      return newCharacter;
    }
    return character;
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'file',
    path:'/characters'
  }))
  async Create(@Req() req, @Body() character: CreatedCharacterDto, @UploadedFile() file?: Express.Multer.File) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (await this.usersService.FindOneId(me.id)) character.user = await this.usersService.FindOneId(me.id);
    else throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
    let raceId: any = character.race;
    character.race = await this.racesServices.FindOneId(raceId);
    if (!character.race) {
      throw new HttpException('This race not exist', HttpStatus.NOT_FOUND);
    }
    character.campaign = [];
    
    let spellArray: Spell[] = [];
    await Promise.all(character.spells.map(async (spell: any) => {
      spell = await this.spellsServices.FindOneId(spell);
      if (spell) spellArray.push(spell);
    }));
    character.spells = spellArray;
    
    let classId: any = character.classe;
    character.classe = await this.classServices.FindOneId(classId);
    if (!character.classe) {
      throw new HttpException('This class not exist', HttpStatus.NOT_FOUND);
    }
    let characterCreated: Character;
    if (file) {
      characterCreated = await this.charactersService.CreateWithFile(character, {
        path: file.path,
        mimetype: file.mimetype,
        filename: file.originalname,
      })
    } else {
      characterCreated = await this.charactersService.Create(character);
    }

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
  @UsePipes(ValidationPipe)
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
  @UsePipes(ValidationPipe)
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'file',
    path:'/characters'
  }))
  async Update(@Req() req, @Body() updatedCharacter: UpdatedCharacterDto, @UploadedFile() file?: Express.Multer.File) {
    let me = await this.usersService.FindOneId(req.user.id);
    let character = await this.charactersService.FindOneId(updatedCharacter.id);
    if (me.role !== Role.Admin && me.id !== character.user.id) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    } else if (!character) {
      throw new HttpException('This character does not exist', HttpStatus.NOT_FOUND);
    }
    if (updatedCharacter.user) {
      let id: any = updatedCharacter.user;
      if (await this.usersService.FindOneId(id)) updatedCharacter.user = await this.usersService.FindOneId(id);
      else throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
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
      if (await this.racesServices.FindOneId(raceId)) updatedCharacter.race = await this.racesServices.FindOneId(raceId);
      else throw new HttpException('This race does not exist', HttpStatus.NOT_FOUND);
    }
    if (updatedCharacter.spells) {
      let spellArray: Spell[] = [];
      await Promise.all(updatedCharacter.spells.map(async (spell: any) => {
        spell = await this.spellsServices.FindOneId(spell);
        if (spell) spellArray.push(spell);
      }));
      updatedCharacter.spells = spellArray;
    }
    if (updatedCharacter.classe) {
      let classId: any = updatedCharacter.classe;
      if (await this.classServices.FindOneId(classId)) updatedCharacter.classe = await this.classServices.FindOneId(classId);
      else throw new HttpException('This class does not exist', HttpStatus.NOT_FOUND);
    }
    if (updatedCharacter.inventory) {
      let characterInventory = [];
      await Promise.all(character.inventory.map(async (item: any) => {
        let characterItem = await this.characterItemServices.FindOneId(item.id);
        if (characterItem) characterInventory.push(characterItem.item.id);
      }));
      let supp = characterInventory.filter(x => !updatedCharacter.inventory.includes(x));
      let add = updatedCharacter.inventory.filter(x => !characterInventory.includes(x));
      let same = updatedCharacter.inventory.filter(x => characterInventory.includes(x));
      await Promise.all(supp.map(async (item: any) => {
        let characterItem = await this.characterItemServices.FindOneItemId(item);
        if (characterItem) await this.characterItemServices.Delete(characterItem.id);
      }));
      let characterItemArray: CharacterItem[] = [];      
      await Promise.all(add.map(async (item: any) => {
        item = await this.itemsServices.FindOneId(item);
        if (item) {
          let newCharacterItem: CreatedCharacterItemDto = {
            quantity: 1,
            character: character,
            item: item
          }
          let charac = await this.characterItemServices.Create(newCharacterItem);
          characterItemArray.push(charac);
        }
      }));
      let sameArray: CharacterItem[] = [];
      await Promise.all(same.map(async (item: any) => {
        item = await this.characterItemServices.FindOneItemId(item);
        if (item) sameArray.push(item);
      }));
      updatedCharacter.inventory = characterItemArray.concat(sameArray);
    }
    if (file) {
      await this.charactersService.UpdateWithFile(updatedCharacter.id, {
        path: file.path,
        filename: file.originalname,
        mimetype: file.mimetype
      });
      if (character.characterId) await this.localFileService.deleteFileById(character.characterId);
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
      classe: updatedCharacter.classe ? updatedCharacter.classe : character.classe,
      inventory: updatedCharacter.inventory ? updatedCharacter.inventory : character.inventory,
    }

    return this.charactersService.Update(newCharacter);
  }
}