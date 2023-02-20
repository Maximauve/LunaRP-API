import { Body, Controller, Post, Get, Logger, Param } from '@nestjs/common';
import { RacesService } from '../services/race.service';


@Controller('races')
export class RacesController {

  constructor(private racesService: RacesService) {}

  @Get()
  GetAll(): {} {
    return this.racesService.GetAll();
  }
}