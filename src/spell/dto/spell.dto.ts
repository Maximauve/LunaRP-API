import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"
import { Classe } from "src/class/classe.entity";
import { isFloat64Array } from "util/types";

export class CreatedSpellDto {
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    level: number;

    @IsNotEmpty()
    scope: GLfloat;

    @IsNotEmpty()
    component: string;

    @IsNotEmpty()
    casting_time: string;

    @IsNotEmpty()
    duration: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    classes: Classe[];
}