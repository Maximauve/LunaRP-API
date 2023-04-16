import { IsNotEmpty, IsInt } from "class-validator"
import { Character } from "src/character/character.entity";
import { Item } from "src/item/item.entity";

export class CreatedCharacterItemDto {
    
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    character: Character;

    @IsNotEmpty()
    item: Item;
}