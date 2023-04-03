import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class DeletedClasseDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}