import { Req, UseGuards } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)    //custom define guard 
@Controller('users')
export class UserController {
    @Get('me')
    getMe(@GetUser() user:User){    //Custom define decorator
        console.log(
            {
                'user':user
            }
        )
        return user
    }
}
