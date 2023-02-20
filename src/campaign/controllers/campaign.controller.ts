import { Body, Controller, Post, Get, Logger, Param } from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Req, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/services/auth.service';
import { CampaignsService } from '../services/campaign.service';


@Controller('campaigns')
export class CampaignsController {

  constructor(private campaignsService: CampaignsService) {}

  @Get()
  GetAll(): {} {
    return this.campaignsService.GetAll();
  }
}