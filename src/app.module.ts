import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { ItemModule } from './item/item.module';
import { SaleModule } from './sale/sale.module';

import configuration from '../config/configuration';


let modelModules = [StoreModule, ItemModule, SaleModule];

@Module({
  imports:
    [ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    ...modelModules],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
