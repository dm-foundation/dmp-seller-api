import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { orderProviders } from 'src/providers/order.providers';
import { storeOrdersItemsProviders } from 'src/providers/store-orders-items.providers';
import { itemProviders } from 'src/providers/item.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    ...orderProviders,
    ...storeOrdersItemsProviders,
    ...itemProviders,
    OrderService],
})
export class OrderModule {}
