import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { StoreModule } from './store/store.module';
import { ItemModule } from './item/item.module';
import { SaleModule } from './sale/sale.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from '../config/configuration';
import { Item } from './item/entities/item.entity';
import { Sale } from './sale/entities/sale.entity';
import { Store } from './store/entities/store.entity';

let modelModules = [StoreModule, ItemModule, SaleModule];

let configModuleConfig = ConfigModule.forRoot({
  load: [configuration],
  envFilePath: ['.env.development.local', '.env.development'],
})

let typeOrmConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: '',
  entities: [Item, Sale, Store],
  // synchronize: true,
})


@Module({
  imports:
    [
      typeOrmConfig,
      configModuleConfig,
      ...modelModules
    ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
