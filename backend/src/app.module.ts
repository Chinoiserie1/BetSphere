import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WhitelistedUrlModule } from './whitelisted-url/whitelisted-url.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WhitelistedUrlModule,
    PrismaModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
