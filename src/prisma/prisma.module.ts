import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()    // Global() decorator, which is used to define controllers or providers as global-scoped within the application context. When a provider or controller is marked as global, it means that the same instance of that provider or controller will be shared across all modules within the NestJS application.
@Module({
  providers: [PrismaService],
  exports:[PrismaService]
})
export class PrismaModule {}
