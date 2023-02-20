import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";
import { Role } from "../role.enum";
import { CreatedUserDto } from "./users.dto";

export class UpdatedUserDto extends PartialType(CreatedUserDto) {
    @IsNotEmpty()
    id: number;
}