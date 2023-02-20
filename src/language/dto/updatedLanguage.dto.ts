import { IsNotEmpty } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";
import { CreatedLanguageDto } from "./language.dto";

export class UpdatedLanguageDto extends PartialType(CreatedLanguageDto) {
    @IsNotEmpty()
    id: number;
}