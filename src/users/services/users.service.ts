import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users.entity';
import { CreatedUsersDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    
    async GetAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    Create(user: CreatedUsersDto): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    FindOneEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: {email: email} });
    }
}
