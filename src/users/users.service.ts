import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { SignupInput } from '../auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  private logger = new Logger('Users services');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10)
      });


      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
      this.handleDBError(error);
    }
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key ', ''));
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Check the  logs');
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  findOne(id: string): Promise<User> {
    throw new Error(`Not implemented`);
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  block(id: string): Promise<User> {
    throw new Error(`Not implemented`);
  }
}
