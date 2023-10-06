import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { orderProviders } from 'src/providers/order.providers';
import { storeOrdersItemsProviders } from 'src/providers/store-orders-items.providers';
import { itemProviders } from 'src/providers/item.providers';
import { MailerModule } from '@nestjs-modules/mailer';
import { storeProviders } from 'src/providers/store.providers';
import { transport } from 'config/nodemailer.config';

@Module({
  imports: [DatabaseModule, MailerModule.forRoot({
    transport,
    defaults: {
      from: process.env.SMTP_EMAIL,
    },
  })],
  controllers: [OrderController],
  providers: [
    ...orderProviders,
    ...storeOrdersItemsProviders,
    ...itemProviders,
    ...storeProviders,
    OrderService],
})
export class OrderModule {}