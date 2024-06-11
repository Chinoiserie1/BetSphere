import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { WhitelistedUrlService } from './whitelisted-url.service';
import { WhitelistedUrl } from '@prisma/client';
import { CreateWhitelistedUrlDto } from './dto/create-whitelisted-url.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.enum';

@Controller('whitelisted-url')
export class WhitelistedUrlController {
  constructor(private readonly whitelistedUrlService: WhitelistedUrlService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  create(
    @Body() createWhitelistedUrlDto: CreateWhitelistedUrlDto,
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
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
