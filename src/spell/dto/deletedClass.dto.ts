import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class DeletedSpellDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}