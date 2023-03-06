import { IsInt, IsNotEmpty } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";
import { CreatedRaceDto } from "./race.dto";

export class UpdatedRaceDto extends PartialType(CreatedRaceDto) {
    @IsNotEmpty()
    @IsInt()
    id: number;
}