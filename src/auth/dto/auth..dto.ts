import { IsEmail, IsNotEmpty, IsString,  } from "class-validator";

export class AuthDto {
    @IsNotEmpty()   //to use pipes or class validator and class transformer we need to use it in main.ts
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}