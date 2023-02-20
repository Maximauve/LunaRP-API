import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Campaign } from './campaign.entity';
import { CampaignsController } from './controllers/campaign.controller';
import { CampaignsService } from './services/campaign.service';

@Module({
    imports: [TypeOrmModule.forFeature([Campaign])],
    controllers: [CampaignsController],
    providers: [CampaignsService],
    exports: [CampaignsService],
})
export class CampaignModule {}