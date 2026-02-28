import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    userName?: string

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;
}