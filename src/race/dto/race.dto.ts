import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

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
}