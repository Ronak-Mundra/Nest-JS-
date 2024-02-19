import { ForbiddenException, HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class authService {
    constructor(private prisma: PrismaService, private Jwt: JwtService, private config: ConfigService) {

    }

    async signUp(data: AuthDto) {
        try {
            // generate the hash password 
            const hash = await argon.hash(data.password);

            //  save the new user in the db
            const user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    hash
                },
                select: {     // This is used to send only the selected data
                    id: true,
                    email: true,
                    createdeAt: true
                }
            })

            // send the user JWT Token   
            return this.signToken(user.id, user.email)
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('User Already Exist !!')
                }
            }
        }
    }

    async signIn(signInData: AuthDto) {

        // check for the user in the db by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: signInData.email
            }
        })

        // if user doen'st exist then throw exception
        if (!user)
            throw new ForbiddenException("User Does not Exist")

        // Compare password 
        const pwMatches = await argon.verify(user.hash, signInData.password)

        // if password is incorrect then throw error
        if (!pwMatches)
            throw new ForbiddenException("Invalid Credentails !!")

        // send the user JWT Token   
        return this.signToken(user.id, user.email)
    }

    async signToken(
        userId: number,
        email: string): Promise<{access_token:string}> {

        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET')
        const token = await this.Jwt.signAsync(payload, {
            expiresIn: '60m',
            secret: this.config.get('JWT_SECRET')
        })
        return { access_token: token };


    }

}
