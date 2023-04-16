import { IsInt, IsNotEmpty } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";
import { CreatedCharacterItemDto } from "./characterItem.dto";


export class UpdatedCharacterItemDto extends PartialType(CreatedCharacterItemDto) {
    @IsNotEmpty()
    
    id: number;
}