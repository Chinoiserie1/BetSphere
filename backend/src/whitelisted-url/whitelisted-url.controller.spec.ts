import { Test, TestingModule } from '@nestjs/testing';
import { WhitelistedUrlController } from './whitelisted-url.controller';

describe('WhitelistedUrlController', () => {
  let controller: WhitelistedUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhitelistedUrlController],
    }).compile();

    controller = module.get<WhitelistedUrlController>(WhitelistedUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
