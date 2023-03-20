import { IsNotEmpty, IsInt } from "class-validator"
import { Campaign } from "src/campaign/campaign.entity";
import { Classes } from "src/class/classe.entity";
import { Race } from "src/race/race.entity";
import { Spell } from "src/spell/spell.entity";
import { User } from "src/users/users.entity";
import { CharacterItem } from "../../characterItem/character_item.entity";
import { Character } from "src/character/character.entity";
import { Item } from "src/item/item.entity";

export class CreatedCharacterItemDto {
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    character: Character;

    @IsNotEmpty()
    item: Item;
}