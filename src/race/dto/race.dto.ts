import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"
import { Language } from "src/language/language.entity";

export class CreatedRaceDto {
    @IsNotEmpty()
    name: string;

    
    @IsNotEmpty()
    speed: number;

    @IsNotEmpty()
    size: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    languages: Language[];
}