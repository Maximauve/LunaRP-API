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

    @IsInt()
    @IsNotEmpty()
    level: number;

    @IsInt()
    @IsNotEmpty()
    experience: number;

    @IsNotEmpty()
    alignment: string;

    @IsInt()
    @IsNotEmpty()
    strength: number;

    @IsInt()
    @IsNotEmpty()
    dexterity: number;

    @IsInt()
    @IsNotEmpty()
    constitution: number;

    @IsInt()
    @IsNotEmpty()
    intelligence: number;

    @IsInt()
    @IsNotEmpty()
    wisdom: number;

    @IsInt()
    @IsNotEmpty()
    charisma: number;

    @IsNotEmpty()
    description: string;

    user?: User;

    campaign?: Campaign[];

    @IsNotEmpty()
    @IsInt()
    race: Race;
    
    @IsNotEmpty()
    spells: Spell[];
    
    @IsNotEmpty()
    @IsInt()
    classe: Classe;

    @IsNotEmpty()
    inventory: CharacterItem[];
}