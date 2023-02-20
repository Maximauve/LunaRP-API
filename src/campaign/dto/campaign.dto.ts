import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class CreatedCampaignDto {
    @IsNotEmpty()
    is_done: boolean;

    @IsInt()
    @IsNotEmpty()
    character_min_level: number;

    @IsInt()
    @IsNotEmpty()
    character_max_level: number;
}