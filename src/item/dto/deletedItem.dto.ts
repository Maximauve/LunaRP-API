import { IsEmail, IsInt, IsNotEmpty, MinLength } from "class-validator"

export class DeletedItemDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}