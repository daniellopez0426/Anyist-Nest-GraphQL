import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthReponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthReponse, { name: 'signup' })
  async signup(
    @Args('singupInput') singupInput: SignupInput
  ): Promise<AuthReponse> {
    return this.authService.signup(singupInput);
  }

  // @Mutation(id: string,{name: 'login'})
  // async login(): Promise<>{
  //   return this.authService.login();
  // }

  // @Query(, {name: 'revalidate'})
  // async revalidateToken(): Promise<> {
  //   return this.authService.revalidateToken();
  // }
}
