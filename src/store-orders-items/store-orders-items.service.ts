import { Inject, Injectable } from '@nestjs/common';
import { CreateStoreOrdersItemDto } from './dto/create-store-orders-item.dto';
import { Repository } from 'typeorm';
import { StoreOrdersItems } from './entities/store-orders-items.entity';

@Injectable()
export class StoreOrdersItemsService {
  constructor(
    @Inject('STORE_ORDERS_ITEMS_REPOSITORY')
    private storeOrdersItemsRepository: Repository<StoreOrdersItems>,
  ) {}
  async create(createStoreOrdersItemDto: CreateStoreOrdersItemDto) {
    const createdStoreOrdersItem = await this.storeOrdersItemsRepository.save(
      createStoreOrdersItemDto,
    );
    return createdStoreOrdersItem;
  }
}
