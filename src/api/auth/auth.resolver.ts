import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signUp-input.dto';
import { ResponseDto } from 'src/helper/response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => ResponseDto, { name: 'signUp' })
  async signUp(@Args('signUpInput') body: SignUpInput): Promise<ResponseDto> {
    return await this.authService.signUp(body);
  }
}
