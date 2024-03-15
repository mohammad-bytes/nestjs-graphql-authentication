import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from 'src/api/user/schema/user.schema';
import { ResponseDto } from 'src/helper/response.dto';

@ObjectType()
export class AuthResponseDto extends ResponseDto {
    @Field()
    data: User;

    @Field({ nullable: true })
    @IsString()
    accessToken: string;
}
