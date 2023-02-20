import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";
import { CreatedItemDto } from "./item.dto";

export class UpdatedItemDto extends PartialType(CreatedItemDto) {
    @IsNotEmpty()
    id: number;
}