import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseDto } from './dto/user-response.dto';
import { SignUpInput } from '../auth/dto/signIn-response.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  /** get access use model for any service */
  getTable() {
    return this.userModel;
  }

  async createUser(body: SignUpInput): Promise<UserResponseDto> {
    try {
      const user = await this.userModel.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: body.password,
      });
      return {
        statusCode: 201,
        message: 'User created successfully',
        data: user
      }
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const usersList = await this.userModel.find();
      return usersList;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
