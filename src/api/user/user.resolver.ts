import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UserResponseDto } from './dto/user-response.dto';

@Resolver(() => UserResponseDto)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => UserResponseDto, { name: 'createUser' })
  async createUser(@Args('CreateUserInput') body: CreateUserInput) {
    return await this.userService.createUser(body);
  }

  @Query(() => [User], { name: 'findAllUser' })
  findAll() {
    return this.userService.findAll();
  }
}
