import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhitelistedUrl } from './whitelisted-url.entity';
import * as url from 'url';

@Injectable()
export class WhitelistedUrlService {
  constructor(
    @InjectRepository(WhitelistedUrl)
    private readonly whitelistedUrlRepository: Repository<WhitelistedUrl>,
  ) {}

  create(
    url: string,
    headers: Record<string, string>,
  ): Promise<WhitelistedUrl> {
    const newWhitelistedUrl = this.whitelistedUrlRepository.create({
      url,
      headers,
    });
    return this.whitelistedUrlRepository.save(newWhitelistedUrl);
  }

  findAll(): Promise<WhitelistedUrl[]> {
    return this.whitelistedUrlRepository.find();
  }

  findOne(id: number): Promise<WhitelistedUrl> {
    return this.whitelistedUrlRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.whitelistedUrlRepository.delete(id);
  }

  async isWhitelisted(checkUrl: string): Promise<boolean> {
    const { hostname } = url.parse(checkUrl);
    const whitelisted = await this.whitelistedUrlRepository.find();
    return whitelisted.some((entry) => {
      const whitelistedHostname = url.parse(entry.url).hostname;
      return hostname === whitelistedHostname;
    });
  }
}
