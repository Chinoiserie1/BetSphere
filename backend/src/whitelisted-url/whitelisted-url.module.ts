import { Module } from '@nestjs/common';
import { WhitelistedUrlService } from './whitelisted-url.service';
import { WhitelistedUrlController } from './whitelisted-url.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WhitelistedUrlService],
  controllers: [WhitelistedUrlController],
})
export class WhitelistedUrlModule {}
