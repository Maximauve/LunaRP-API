import { IsInt, IsNotEmpty } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";
import { CreatedClasseDto } from "./classe.dto";

export class UpdatedClasseDto extends PartialType(CreatedClasseDto) {
    @IsNotEmpty()
    @IsInt()
    id: number;
}