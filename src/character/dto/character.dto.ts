import { IsNotEmpty, IsInt } from "class-validator"

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
}