import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { StoreOrdersItems } from 'src/store-orders-items/entities/store-orders-items.entity';
import { Item } from 'src/item/entities/item.entity';
import { CreateStoreOrdersItemDto } from 'src/store-orders-items/dto/create-store-orders-item.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    @Inject('STORE_ORDERS_ITEMS_REPOSITORY')
    private storeOrdersItemsRepository: Repository<StoreOrdersItems>,
    @Inject('ITEM_REPOSITORY')
    private itemsRepository: Repository<Item>,
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    const { items, ...orderData } = createOrderDto;

    try {
      const order = this.orderRepository.create(orderData);
      const createdOrder = await this.orderRepository.save(order);
      const createdOrderObj = {
        ...createdOrder,
        orderItems: [],
      };

      for (const itemId of items) {
        const item = await this.itemsRepository.findOne({
          where: { id: itemId },
        });

        createdOrderObj.orderItems.push(item);

        if (item) {
          const storeOrderItemObj: CreateStoreOrdersItemDto = {
            orderId: createdOrder.id,
            itemId: item.id,
            storeId: item.storeId,
          };
          await this.storeOrdersItemsRepository.save(storeOrderItemObj);
        }
      }
      return createdOrderObj;
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }
}
