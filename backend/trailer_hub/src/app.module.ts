import { Module } from '@nestjs/common';
import { UsersModule } from './users/user-module.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrailerModule } from './trailers/trailerModule.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, TrailerModule],
})
export class AppModule {}