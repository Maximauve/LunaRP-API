import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"
import { Classe } from "src/class/classe.entity";
import { isFloat64Array } from "util/types";

export class CreatedSpellDto {
    @IsNotEmpty()
    name: string;

    
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
    description: Text;

    @IsNotEmpty()
    classes: Classe[];
}