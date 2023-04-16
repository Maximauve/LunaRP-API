import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class CreatedClasseDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    dice: number;

    @IsNotEmpty()
    description: Text;
}