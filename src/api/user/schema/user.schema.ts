import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/constant/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
@ObjectType()
export class User {
    @Prop()
    @Field()
    first_name: string;

    @Prop()
    @Field()
    last_name: string;

    @Prop()
    @Field()
    email: string;

    @Prop()
    @Field()
    password: string;

    @Prop({ default: Role.USER })
    @Field()
    role: Role;

    @Prop({ default: false })
    @Field()
    isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);