import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Weather } from 'weather/weather.entity';

const DATABASE_TYPE = 'postgres';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Weather],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Weather]),
  ],
})
export class DatabaseModule {}
