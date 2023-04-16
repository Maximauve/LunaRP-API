import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class DeletedClasseDto {
    
    @IsNotEmpty()
    id: number;
}