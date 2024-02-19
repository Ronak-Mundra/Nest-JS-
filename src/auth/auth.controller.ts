import { authService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import { AuthDto } from './dto';

@Controller('auth')
export class authController{
    constructor(private authService:authService){}

    @Post('signup')
    signUp(@Body() signUpData:AuthDto ){
        console.log({signUpData,})
        return this.authService.signUp(signUpData)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() signInData:AuthDto){
        console.log({signInData,})
        return this.authService.signIn(signInData)
    }
}