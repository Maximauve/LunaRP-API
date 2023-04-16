import { IsNotEmpty, MinLength, IsInt } from "class-validator"

export class CreatedItemDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    damages: number;

    @IsNotEmpty()
    defense: number;

    @IsNotEmpty()
    regeneration: number;

    @IsNotEmpty()
    description: string;
}