import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhitelistedUrlService } from './whitelisted-url.service';
import { WhitelistedUrlController } from './whitelisted-url.controller';
import { WhitelistedUrl } from './whitelisted-url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhitelistedUrl])],
  providers: [WhitelistedUrlService],
  controllers: [WhitelistedUrlController],
  exports: [WhitelistedUrlService],
})
export class WhitelistedUrlModule {}
