import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class CreatedClasseDto {
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    dice: number;

    @IsNotEmpty()
    description: string;
}