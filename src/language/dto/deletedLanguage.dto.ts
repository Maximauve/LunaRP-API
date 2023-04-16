import { IsEmail, IsInt, IsNotEmpty, MinLength } from "class-validator"

export class DeletedLanguageDto {
    
    @IsNotEmpty()
    id: number;
}