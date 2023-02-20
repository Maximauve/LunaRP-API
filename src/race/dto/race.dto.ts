import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"
import { Language } from "src/language/language.entity";

export class CreatedRaceDto {
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsInt()
    @IsNotEmpty()
    speed: number;

    @IsNotEmpty()
    size: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    language: Language[];
}