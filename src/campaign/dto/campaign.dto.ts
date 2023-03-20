import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"
import { Character } from "src/character/character.entity";
import { Classe } from "src/class/classe.entity";
import { Race } from "src/race/race.entity";
import { User } from "src/users/users.entity";

export class CreatedCampaignDto {
    @IsInt()
    @IsNotEmpty()
    character_min_level: number;

    @IsInt()
    @IsNotEmpty()
    character_max_level: number;

    @IsInt()
    @IsNotEmpty()
    game_master: User;

    @IsNotEmpty()
    classes: Classe[];

    @IsNotEmpty()
    races: Race[];

    @IsNotEmpty()
    characters: Character[];
}