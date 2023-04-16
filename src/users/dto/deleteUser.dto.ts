import { IsEmail, IsInt, IsNotEmpty, MinLength } from "class-validator"

export class DeletedUserDto {
    
    @IsNotEmpty()
    id: number;
}