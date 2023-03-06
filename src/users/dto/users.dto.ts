import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Role } from "../role.enum";
import { Character } from "src/character/character.entity";

export class CreatedUserDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    role: Role;
}