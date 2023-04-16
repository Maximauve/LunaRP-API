import { IsInt, IsNotEmpty } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";
import { CreatedCampaignDto } from "./campaign.dto";

export class UpdatedCampaignDto extends PartialType(CreatedCampaignDto) {
    @IsNotEmpty()
    
    id: number;
}