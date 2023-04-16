import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class DeletedRaceDto {
    
    @IsNotEmpty()
    id: number;
}