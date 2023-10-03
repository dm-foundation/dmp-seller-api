import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Order, Status } from './entities/order.entity';
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
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { items, ...orderData } = createOrderDto;

    try {
      const createdOrder = await this.orderRepository.save(orderData);

      const createdOrderObj = {
        ...createdOrder,
        orderItems: [],
      };

      for (const itemData of items) {
        const { itemId, quantity, unitPrice } = itemData;

        const item = await this.itemsRepository.findOne({
          where: { id: itemId },
        });

        if (item) {
          const storeOrderItemObj: CreateStoreOrdersItemDto = {
            storeId: item.storeId,
            itemId: item.id,
            orderId: createdOrder.id,
            quantity,
            unitPrice,
          };

          const createdStoreOrderItem =
            await this.storeOrdersItemsRepository.save(storeOrderItemObj);

          createdOrderObj.orderItems.push(createdStoreOrderItem);
        }
      }

      return createdOrderObj;
    } catch (error) {
      console.error(error);
      return error;
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

  async updateOrderStatus(id: number, newStatus: Status) {
    const order = await this.orderRepository.findOne({where: {id}});

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    order.status = newStatus;
    await this.orderRepository.update(id, order);

    return `Order status updated to "${newStatus}" successfully`;
  }
}
