import { Test, TestingModule } from '@nestjs/testing';
import { WhitelistedUrlService } from './whitelisted-url.service';

describe('WhitelistedUrlService', () => {
  let service: WhitelistedUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhitelistedUrlService],
    }).compile();

    service = module.get<WhitelistedUrlService>(WhitelistedUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
