import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../users.entity';
import { CreatedUserDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    
    async GetAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    Create(user: CreatedUserDto): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    FindOneEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: {email: email} });
    }

    FindOneId(id: number): Promise<User> {
        return this.usersRepository.findOne({ where: {id: id} });
    }

    async Delete(id: number): Promise<User[]> {
        let user = await this.usersRepository.findOne({ where: {id: id} });
        return await this.usersRepository.remove([user]);
    }

    async Update(id: number, user: CreatedUserDto): Promise<UpdateResult> {
        return await this.usersRepository.update(id, {...user});
    }
}
