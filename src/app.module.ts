import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { StoreModule } from './store/store.module';
import { ItemModule } from './item/item.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from '../config/configuration';
import { Item } from './item/entities/item.entity';
import { Store } from './store/entities/store.entity';
import { WalletAddress } from './wallet-address/entities/wallet-address.entity';
import { WalletAddressModule } from './wallet-address/wallet-address.module';
import { HealthModule } from './health/health.module';
import { OrderModule } from './order/order.module';
import { StoreOrdersItemsModule } from './store-orders-items/store-orders-items.module';
import { StoreOrdersItems } from './store-orders-items/entities/store-orders-items.entity';
import { Order } from './order/entities/order.entity';

let modelModules = [
  StoreModule,
  ItemModule,
  WalletAddressModule,
  OrderModule,
  StoreOrdersItemsModule
];

let configModuleConfig = ConfigModule.forRoot({
  load: [configuration],
  envFilePath: `.env.${process.env.NODE_ENV}`,
})

let typeOrmConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [Item, Store, WalletAddress, Order, StoreOrdersItems],
  synchronize: true,
  autoLoadEntities: true,
})

@Module({
  imports:
    [
      typeOrmConfig,
      configModuleConfig,
      HealthModule,
      ...modelModules,
    ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
