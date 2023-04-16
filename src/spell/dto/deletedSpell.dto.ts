import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class DeletedSpellDto {
	
	@IsNotEmpty()
	id: number;
}