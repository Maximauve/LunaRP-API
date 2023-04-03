import { IsNotEmpty, MinLength, IsInt } from "class-validator"

export class CreatedItemDto {
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    price: number;

    @IsInt()
    @IsNotEmpty()
    damages: number;

    @IsInt()
    @IsNotEmpty()
    defense: number;

    @IsInt()
    @IsNotEmpty()
    regeneration: number;

    @IsNotEmpty()
    description: string;
}