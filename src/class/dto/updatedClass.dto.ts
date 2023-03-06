import { IsInt, IsNotEmpty } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";
import { CreatedClassDto } from "./class.dto";

export class UpdatedClassDto extends PartialType(CreatedClassDto) {
    @IsNotEmpty()
    @IsInt()
    id: number;
}