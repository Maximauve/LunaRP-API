import { IsInt, IsNotEmpty } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";
import { CreatedCharacterDto } from "./character.dto";

export class UpdatedCharacterDto extends PartialType(CreatedCharacterDto) {
    @IsNotEmpty()
    
    id: number;
}