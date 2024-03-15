import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpInput } from './dto/signUp-input.dto';
import { message } from 'src/constant/message';
import { ResponseDto } from 'src/helper/response.dto';
import * as bcrypt from "bcrypt";
import { SignInInput } from './dto/signIn-input.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schema/user.schema';
import { AuthResponseDto } from './dto/auth-response.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    /** sign up method */
    async signUp(body: SignUpInput): Promise<ResponseDto> {
        try {
            const isExits = await this.userService.getTable().findOne({ email: body.email.trim() });
            if (isExits) {
                throw new BadRequestException(message.EMAIL_EXITS);
            }
            await this.userService.getTable().create({
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
            });
            return {
                statusCode: HttpStatus.CREATED,
                message: message.SIGN_UP_SUCCESS,
            }
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async signIn(body: SignInInput): Promise<AuthResponseDto> {
        try {
            const user: User = await this.userService.getTable().findOne({ email: body.email.trim() });
            if (!user) {
                throw new UnauthorizedException(message.INVALID_CREDENTIAL);
            }
            const isPassword: Boolean = await bcrypt.compare(body.password.trim(), user?.password);
            if (!isPassword) {
                throw new UnauthorizedException(message.INVALID_CREDENTIAL);
            }
            const accessToken: string = await this.jwtService.sign({
                id: user.email,
                role: user.role
            }, { secret: process.env.JET_SECRET })
            return {
                statusCode: HttpStatus.CREATED,
                message: message.SIGN_IN_SUCCESS,
                data: user,
                accessToken
            }
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
