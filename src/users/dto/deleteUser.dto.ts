import { IsEmail, IsInt, IsNotEmpty, MinLength } from "class-validator"

export class DeletedUserDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}