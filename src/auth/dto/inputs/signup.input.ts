import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class SignupInput {

    @Field(() => String)
    @IsEmail()
    email: string;

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @Field(() => String)
    @IsString()
    @MinLength(6)
    password: string;

}