import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class DeletedCharacterDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}