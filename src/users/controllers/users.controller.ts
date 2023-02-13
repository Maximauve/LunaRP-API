import { Body, Controller, Post, Get, Logger, Param } from '@nestjs/common';
import { CreatedUsersDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Req, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/services/auth.service';


@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Get()
  GetAll(): {} {
    return this.usersService.GetAll();
  }

  @UsePipes(ValidationPipe)
  @Post('/auth/sign-up')
  SignUp(@Body() body: CreatedUsersDto): {} {   
    return this.usersService.Create(body);
  }

  @Post('auth/login')
  async login(@Body() body) {
    let user = await this.usersService.FindOneEmail(body.email);
    if (!user || user.password !== body.password) {
      throw new UnauthorizedException();
    }
    return this.authService.Login(user);
  }
}