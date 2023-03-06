import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Campaign } from '../campaign.entity';
import { CreatedCampaignDto } from '../dto/campaign.dto';
import { UpdatedCampaignDto } from '../dto/updatedCampaign.dto';

@Injectable()
export class CampaignsService {
    constructor(
        @InjectRepository(Campaign)
        private campaignsRepository: Repository<Campaign>,
    ) {}
    
    async GetAll(): Promise<Campaign[]> {
        return await this.campaignsRepository.find({
            relations: {
                game_master: true,
                races: true
            },
        });
    }

    FindOneId(id: number): Promise<Campaign> {
        return this.campaignsRepository.findOne({ 
            relations: {
                game_master: true,
                races: true
            },
            where: {id: id} });
        }

    Create(campaign: CreatedCampaignDto): Promise<Campaign> {
        const newCampaign = this.campaignsRepository.create(campaign);
        return this.campaignsRepository.save(newCampaign);
    }

    async Delete(id: number): Promise<Campaign[]> {
        let campaign = await this.campaignsRepository.findOne({ where: {id: id} });
        return this.campaignsRepository.remove([campaign]);
    }

    async Update(campaign: UpdatedCampaignDto): Promise<Campaign> {
        return await this.campaignsRepository.save(campaign);
    }
}
