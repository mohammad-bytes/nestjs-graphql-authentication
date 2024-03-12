import { Field, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@ObjectType()
export class ResponseDto {
    @IsNumber()
    @Field()
    statusCode: number;

    @IsString()
    @Field()
    message: string;
}