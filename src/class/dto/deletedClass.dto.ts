import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class DeletedClassDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}