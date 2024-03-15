import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { UserResponseDto } from './dto/user-response.dto';
import { SignUpInput } from '../auth/dto/signUp-input.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

@Resolver(() => UserResponseDto)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => UserResponseDto, { name: 'createUser' })
  @UseGuards(JwtAuthGuard)
  async createUser(@Args('CreateUserInput') body: SignUpInput) {
    return await this.userService.createUser(body);
  }

  @Query(() => [User], { name: 'findAllUser' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }
}
