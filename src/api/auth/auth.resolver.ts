import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signUp-input.dto';
import { ResponseDto } from 'src/helper/response.dto';
import { SignInInput } from './dto/signIn-input.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { plainToClass } from 'class-transformer';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => ResponseDto, { name: 'signUp' })
  async signUp(@Args('signUpInput') body: SignUpInput): Promise<ResponseDto> {
    return await this.authService.signUp(body);
  }

  @Mutation(() => AuthResponseDto, { name: 'signIn' })
  async signIn(@Args('signInInput') body: SignInInput): Promise<AuthResponseDto> {
    const result = await this.authService.signIn(body);
    return plainToClass(AuthResponseDto, result);
  }
}
