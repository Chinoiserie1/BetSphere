import { Module } from '@nestjs/common';
import { WhitelistedUrlModule } from './whitelisted-url/whitelisted-url.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [WhitelistedUrlModule, PrismaModule],
})
export class AppModule {}
