import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class DeletedCampaignDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}