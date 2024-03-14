import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpInput } from './dto/signUp-input.dto';
import { message } from 'src/constant/message';
import { ResponseDto } from 'src/helper/response.dto';
import * as bcrypt from "bcrypt";
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
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
}
