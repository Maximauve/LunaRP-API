import { Body, Controller, Post, Get, Logger, Param } from '@nestjs/common';
import { CreatedUserDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Req, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/services/auth.service';
import { DeletedUserDto } from '../dto/deleteUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from '../role.enum';
import { UpdatedUserDto } from '../dto/updateUser.dto';


@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService, private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  GetAll(): {} {
    return this.usersService.GetAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  GetOne(@Param('id') id: string): {} {
    return this.usersService.FindOneId(+id);
  }

  @UsePipes(ValidationPipe)
  @Post('/auth/sign-up')
  SignUp(@Body() body: CreatedUserDto): {} {   
    return this.usersService.Create(body);
  }

  @Post('/auth/login')
  async login(@Body() body) {
    let user = await this.usersService.FindOneEmail(body.email);
    if (!user || user.password !== body.password) {
      throw new UnauthorizedException();
    }
    return this.authService.Login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  async Delete(@Req() req, @Body() deletedUser: DeletedUserDto) {
    let me = await this.usersService.FindOneId(req.user.id);
    if (me.role !== Role.Admin) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.Delete(deletedUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/update')
  async Update(@Req() req, @Body() updatedUser: UpdatedUserDto) {
    if (!req.user || !req.user.id) throw new HttpException('You are not logged in', HttpStatus.UNAUTHORIZED);
    let me = await this.usersService.FindOneId(req.user.id);
    let person = await this.usersService.FindOneId(updatedUser.id);
    if (me.role !== Role.Admin && me.id !== updatedUser.id) {
      throw new HttpException('You are not an admin', HttpStatus.UNAUTHORIZED);
    } else if (!person) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    let newUser: CreatedUserDto = {
      username: updatedUser.username ? updatedUser.username : person.username,
      email: updatedUser.email ? updatedUser.email : person.email,
      password: updatedUser.password ? updatedUser.password : person.password,
      role: updatedUser.role ? updatedUser.role : Role.User
    }
    this.usersService.Update(updatedUser.id, newUser);
    return { message: 'User updated'}
  }
}