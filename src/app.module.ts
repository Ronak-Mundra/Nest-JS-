import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { authModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal:true,
     }),
     authModule, 
     UserModule, 
     BookmarkModule, 
     PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
