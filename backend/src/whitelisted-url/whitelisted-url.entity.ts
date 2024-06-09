import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WhitelistedUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column('jsonb')
  headers: Record<string, string>;
}
