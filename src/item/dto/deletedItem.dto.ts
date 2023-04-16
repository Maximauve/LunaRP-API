import { IsEmail, IsInt, IsNotEmpty, MinLength } from "class-validator"

export class DeletedItemDto {
    
    @IsNotEmpty()
    id: number;
}