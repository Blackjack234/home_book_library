import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (ConfigService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: ConfigService.get<string>('REDIS_HOST'),
        port: parseInt(ConfigService.get<string>('REDIS_PORT')!),
      },
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};
