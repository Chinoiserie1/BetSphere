import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { WhitelistedUrlService } from '../src/whitelisted-url/whitelisted-url.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const whitelistedUrlService = app.get(WhitelistedUrlService);

  const urls = [
    {
      url: 'https://sportscore1.p.rapidapi.com',
      headers: {
        'x-rapidapi-key': '20288f0921mshf5460e176789bebp1e93cfjsn958b4d005283',
        'x-rapidapi-host': 'sportscore1.p.rapidapi.com',
      },
    },
    {
      url: 'https://api.example.com',
      headers: {
        Authorization: 'Bearer some-example-token',
      },
    },
    // Add more URLs as needed
  ];

  for (const url of urls) {
    await whitelistedUrlService.create(url.url, url.headers);
    console.log(`Whitelisted URL added: ${url.url}`);
  }

  await app.close();
}

bootstrap().catch((err) => {
  console.error('Error running script', err);
  process.exit(1);
});
