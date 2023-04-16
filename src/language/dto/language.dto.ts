import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class CreatedLanguageDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}