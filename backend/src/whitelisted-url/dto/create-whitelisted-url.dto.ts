import { IsString, IsObject } from 'class-validator';

export class CreateWhitelistedUrlDto {
  @IsString()
  url: string;

  @IsObject()
  headers: Record<string, string>;
}
