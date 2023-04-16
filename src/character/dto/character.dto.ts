import { IsNotEmpty, IsInt } from "class-validator"
import { Campaign } from "src/campaign/campaign.entity";
import { Classe } from "src/class/classe.entity";
import { Race } from "src/race/race.entity";
import { Spell } from "src/spell/spell.entity";
import { User } from "src/users/users.entity";
import { CharacterItem } from "../../characterItem/character_item.entity";

export class CreatedCharacterDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    level: number;
    
    @IsNotEmpty()
    experience: number;

    @IsNotEmpty()
    alignment: string;
    
    @IsNotEmpty()
    strength: number;
    
    @IsNotEmpty()
    dexterity: number;
    
    @IsNotEmpty()
    constitution: number;
    
    @IsNotEmpty()
    intelligence: number;
    
    @IsNotEmpty()
    wisdom: number;
    
    @IsNotEmpty()
    charisma: number;

    @IsNotEmpty()
    description: Text;

    user?: User;

    campaign?: Campaign[];

    @IsNotEmpty()
    race: Race;
    
    @IsNotEmpty()
    spells: Spell[];
    
    @IsNotEmpty()
    classe: Classe;

    @IsNotEmpty()
    inventory: CharacterItem[];
}