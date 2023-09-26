import { Module } from '@nestjs/common';
import { StoreOrdersItemsService } from './store-orders-items.service';
import { StoreOrdersItemsController } from './store-orders-items.controller';
import { DatabaseModule } from 'src/database/database.module';
import { storeOrdersItemsProviders } from 'src/providers/store-orders-items.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreOrdersItemsController],
  providers: [
    ...storeOrdersItemsProviders,
    StoreOrdersItemsService],
})
export class StoreOrdersItemsModule {}
