import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class DeletedCharacterDto {
    
    @IsNotEmpty()
    id: number;
}