import { Module } from "@nestjs/common";
import { authService } from "./auth.service";
import { authController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";

@Module({
    imports:[JwtModule.register({}), ],
    controllers:[authController],
    providers:[authService,JwtStrategy],
})
export class authModule{

}