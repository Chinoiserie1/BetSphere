import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WhitelistedUrl } from '@prisma/client';

@Injectable()
export class WhitelistedUrlService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    url: string,
    headers: Record<string, string>,
  ): Promise<WhitelistedUrl> {
    return this.prisma.whitelistedUrl.create({
      data: { url, headers },
    });
  }

  async findAll(): Promise<WhitelistedUrl[]> {
    return this.prisma.whitelistedUrl.findMany();
  }

  async findOne(id: number): Promise<WhitelistedUrl> {
    return this.prisma.whitelistedUrl.findUnique({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.whitelistedUrl.delete({ where: { id } });
  }

  async isWhitelisted(checkUrl: string): Promise<boolean> {
    const whitelistedUrls = await this.prisma.whitelistedUrl.findMany();
    return whitelistedUrls.some((entry) => {
      const { hostname } = new URL(checkUrl);
      const whitelistedHostname = new URL(entry.url).hostname;
      return hostname === whitelistedHostname;
    });
  }
}
