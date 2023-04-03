import { IsInt, IsNotEmpty } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";
import { CreatedSpellDto } from "./spell.dto";

export class UpdatedSpellDto extends PartialType(CreatedSpellDto) {
    @IsNotEmpty()
    @IsInt()
    id: number;
}