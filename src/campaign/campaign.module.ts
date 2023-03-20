import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { Campaign } from './campaign.entity';
import { CampaignsController } from './controllers/campaign.controller';
import { CampaignsService } from './services/campaign.service';
import { UsersModule } from 'src/users/users.module';
import { ClasseModule } from 'src/class/class.module';
import { RaceModule } from 'src/race/race.module';

@Module({
    imports: [TypeOrmModule.forFeature([Campaign]), forwardRef(() => UsersModule), forwardRef(() => ClasseModule), forwardRef(() => RaceModule)],
    controllers: [CampaignsController],
    providers: [CampaignsService],
    exports: [CampaignsService],
})
export class CampaignModule {}