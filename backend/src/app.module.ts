import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WhitelistedUrl } from './whitelisted-url/whitelisted-url.entity';
import { WhitelistedUrlModule } from './whitelisted-url/whitelisted-url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [WhitelistedUrl],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    WhitelistedUrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
