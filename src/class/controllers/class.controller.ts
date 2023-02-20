import { Body, Controller, Post, Get, Logger, Param } from '@nestjs/common';
import { ClassService } from '../services/class.service';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CreatedClassDto } from '../dto/class.dto';


@Controller('class')
export class ClassController {

  constructor(private classService: ClassService) {}

  @Get()
  GetAll(): {} {
    return this.classService.GetAll();
  }

  @Get('/:id')
  GetOne(@Param('id') id: string): {} {
    return this.classService.FindOneId(+id);
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  Create(@Body() classes: CreatedClassDto): {} {
    return this.classService.Create(classes);
  }

  @Post('/delete/:id')
  Delete(@Param('id') id: string): {} {
    return this.classService.Delete(+id);
  }

  @Post('/update/:id')
  Update(@Param('id') id: string, @Body() classes: CreatedClassDto): {} {
    return this.classService.Update(+id, classes);
  }
}