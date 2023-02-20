import { IsEmail, IsInt, IsNotEmpty, MinLength } from "class-validator"

export class DeletedLanguageDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}