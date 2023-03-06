import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class DeletedRaceDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}