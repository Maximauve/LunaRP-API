import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";
import { CreatedItemDto } from "./item.dto";

export class ItemFileDto extends PartialType(CreatedItemDto) {
    @IsNotEmpty()
    path: string;
}