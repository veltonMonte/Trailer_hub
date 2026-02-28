import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    userName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}