import { IsNotEmpty } from "class-validator";
import { User } from "../schema/user.schema";
import { ResponseDto } from "src/helper/response.dto";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserResponseDto extends ResponseDto {
    @IsNotEmpty()
    @Field({ nullable: true })
    data: User;
}