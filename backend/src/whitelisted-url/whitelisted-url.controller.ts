import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WhitelistedUrlService } from './whitelisted-url.service';
import { WhitelistedUrl } from './whitelisted-url.entity';

@Controller('whitelisted-url')
export class WhitelistedUrlController {
  constructor(private readonly whitelistedUrlService: WhitelistedUrlService) {}

  @Post()
  create(
    @Body()
    createWhitelistedUrlDto: {
      url: string;
      headers: Record<string, string>;
    },
  ): Promise<WhitelistedUrl> {
    return this.whitelistedUrlService.create(
      createWhitelistedUrlDto.url,
      createWhitelistedUrlDto.headers,
    );
  }

  @Get()
  findAll(): Promise<WhitelistedUrl[]> {
    return this.whitelistedUrlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<WhitelistedUrl> {
    return this.whitelistedUrlService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.whitelistedUrlService.remove(id);
  }

  @Get('is-whitelisted/:url')
  async isWhitelisted(
    @Param('url') url: string,
  ): Promise<{ whitelisted: boolean }> {
    const whitelisted = await this.whitelistedUrlService.isWhitelisted(url);
    return { whitelisted };
  }

  @Post('is-whitelisted')
  async isWhitelistedPost(
    @Body() body: { url: string },
  ): Promise<{ whitelisted: boolean }> {
    const whitelisted = await this.whitelistedUrlService.isWhitelisted(
      body.url,
    );
    return { whitelisted };
  }
}
