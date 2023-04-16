import { IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator"

export class DeletedCampaignDto {
    
    @IsNotEmpty()
    id: number;
}