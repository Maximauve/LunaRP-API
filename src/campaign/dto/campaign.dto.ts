import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"
import { Character } from "src/character/character.entity";
import { Classe } from "src/class/classe.entity";
import { Race } from "src/race/race.entity";
import { User } from "src/users/users.entity";

export class CreatedCampaignDto {
    
    @IsNotEmpty()
    character_min_level: number;

    
    @IsNotEmpty()
    character_max_level: number;

    
    @IsNotEmpty()
    game_master: User;

    @IsNotEmpty()
    classes: Classe[];

    @IsNotEmpty()
    races: Race[];

    @IsNotEmpty()
    characters: Character[];
}