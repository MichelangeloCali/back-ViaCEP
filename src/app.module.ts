import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { config } from './typeorm/ormconfig';
import { RedisModule } from './redis/redis.module';
import { RedisService } from './redis/redis.service';
import { RedisRepository } from './redis/redis.repository';
import { redisClientFactory } from './redis/redis-client.factory';

@Module({
  imports: [
    AddressModule,
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot(),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService, RedisRepository, redisClientFactory],
})
export class AppModule {}
