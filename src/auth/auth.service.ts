import { Injectable } from '@nestjs/common';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthReponse } from './types/auth-response.type';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    async signup(signupInput: SignupInput): Promise<AuthReponse> {

        const user = await this.usersService.create(signupInput);

        const token = 'abc123'

        return {
            token,
            user
        }
    }
}
