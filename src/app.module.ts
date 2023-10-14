import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ItemModule } from './item/item.module';
import { StoreModule } from './store/store.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ThrottlerModule } from '@nestjs/throttler';
import configuration from '../config/configuration';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { Item } from './item/entities/item.entity';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Order } from './order/entities/order.entity';
import { OrderModule } from './order/order.module';
import { SaleSubscriber } from './sale/sale.subscriber';
import { StoreOrdersItems } from './store-orders-items/entities/store-orders-items.entity';
import { StoreOrdersItemsModule } from './store-orders-items/store-orders-items.module';
import { Store } from './store/entities/store.entity';
import { WalletAddress } from './wallet-address/entities/wallet-address.entity';
import { WalletAddressModule } from './wallet-address/wallet-address.module';

const modelModules = [
  StoreModule,
  ItemModule,
  WalletAddressModule,
  OrderModule,
  StoreOrdersItemsModule
];

const configModuleConfig = ConfigModule.forRoot({
  load: [configuration],
  envFilePath: `.env.${process.env.NODE_ENV}`,
})


const throttlerModuleConfig = ThrottlerModule.forRoot([{
  ttl: 60000,
  limit: 10,
}])

const typeOrmConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [Item, Store, WalletAddress, Order, StoreOrdersItems],
  synchronize: true,
  autoLoadEntities: true,
  // logger: 'advanced-console',
  // logging: ''
})

@Module({
  imports:
    [
      typeOrmConfig,
      configModuleConfig,
      throttlerModuleConfig,
      HealthModule,
      ...modelModules,
      AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
