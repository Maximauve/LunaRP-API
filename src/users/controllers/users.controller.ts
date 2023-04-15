import { Body, Controller, Post, Get, Logger, Param } from '@nestjs/common';
import { CreatedUserDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Req, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/services/auth.service';
import { DeletedUserDto } from '../dto/deleteUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from '../role.enum';
import { UpdatedUserDto } from '../dto/updateUser.dto';
import { createHash } from "crypto"
import LocalFilesInterceptor from 'src/localFile/localFile.interceptor';
import LocalFile from 'src/localFile/localFile.entity';
import { UserFileDto } from '../dto/usersFile.dto';
import LocalFilesService from 'src/localFile/localFile.service';


@Controller('users')
export class UsersController {

	constructor(private usersService: UsersService, private authService: AuthService, private localFileService: LocalFilesService) { }

	@UseGuards(JwtAuthGuard)
	@Get()
	async GetAll() {
		let users = await this.usersService.GetAll();
		let newUsersArray = [];
		await Promise.all(users.map(async (user: any) => {
			if (user.userId) {
				let localFile = await this.localFileService.getFileById(user.userId);
				let newItem: UserFileDto = {
					...user,
					path: `${localFile.path}.${localFile.mimetype.split('/')[1]}`
				}
				newUsersArray.push(newItem);
			} else {
				newUsersArray.push(user);
			}
		}));
		return newUsersArray;
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:id')
	async GetOne(@Param('id') id: string) {
		let localFile: LocalFile;
		let user = await this.usersService.FindOneId(+id);
		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		} else if (user.userId) {
			localFile = await this.localFileService.getFileById(user.userId);
			let newUser: UserFileDto = {
				...user,
				path: `${localFile.path}.${localFile.mimetype.split('/')[1]}`
			}
			return newUser;
		}
		return user
	}

	@UsePipes(ValidationPipe)
	@Post('/auth/sign-up')
	@UseInterceptors(LocalFilesInterceptor({
		fieldName: 'file',
		path: '/users'
	}))
	async SignUp(@Body() body: CreatedUserDto, @UploadedFile() file?: Express.Multer.File) {
		body.password = createHash("sha512").update(body.password).digest("hex")
		if (!file) {
			return this.usersService.Create(body);
		}

		return this.usersService.CreateWithFile(body, {
			path: file.path,
			mimetype: file.mimetype,
			filename: file.originalname
		});
	}

	@Post('/auth/login')
	async login(@Body() body) {
		let user = await this.usersService.FindOneEmail(body.email);
		if (!user || user.password !== createHash("sha512").update(body.password).digest("hex")) {
			throw new UnauthorizedException();
		}
		return {
			"username": user.username,
			"email": user.email,
			"token": (await this.authService.Login(user)).access_token,
			"role": user.role,
			"userId": user.userId,
		};
	}

	@UseGuards(JwtAuthGuard)
	@Post('/delete')
	async Delete(@Req() req, @Body() deletedUser: DeletedUserDto) {
		let me = await this.usersService.FindOneId(req.user.id);
		if (me.role !== Role.Admin) {
			throw new HttpException('Vous devez être administrateur pour accéder à ce contenu.', HttpStatus.UNAUTHORIZED);
		}
		return this.usersService.Delete(deletedUser.id);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(ValidationPipe)
	@Post('/update')
	@UseInterceptors(LocalFilesInterceptor({
		fieldName: 'file',
		path: '/users'
	}))
	async Update(@Req() req, @Body() updatedUser: UpdatedUserDto, @UploadedFile() file?: Express.Multer.File) {
		let me = await this.usersService.FindOneId(req.user.id);
		let person = await this.usersService.FindOneId(updatedUser.id);
		if (me.role !== Role.Admin && me.id !== updatedUser.id) {
			throw new HttpException('Vous devez être administrateur pour accéder à ce contenu.', HttpStatus.UNAUTHORIZED);
		} else if (!person) {
			throw new HttpException('Utilisateur non trouvé.', HttpStatus.NOT_FOUND);
		} else if (file) {
			await this.usersService.UpdateWithFile(updatedUser.id, {
				path: file.path,
				filename: file.originalname,
				mimetype: file.mimetype
			});
			if (person.userId) await this.localFileService.deleteFileById(person.userId);
		}
		let newUser: CreatedUserDto = {
			username: updatedUser.username ? updatedUser.username : person.username,
			email: updatedUser.email ? updatedUser.email : person.email,
			password: updatedUser.password ? createHash("sha512").update(updatedUser.password).digest("hex") : person.password,
			role: updatedUser.role ? updatedUser.role : Role.User
		}
		await this.usersService.Update(updatedUser.id, newUser);
		return { message: 'User updated' }
	}
}