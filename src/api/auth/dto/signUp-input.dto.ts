import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignUpInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;
}
