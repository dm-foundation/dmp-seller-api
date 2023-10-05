import { Inject, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { In, Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { Item } from 'src/item/entities/item.entity';
import { WalletAddress } from 'src/wallet-address/entities/wallet-address.entity';
import { Order } from 'src/order/entities/order.entity';
import { StoreOrdersItems } from 'src/store-orders-items/entities/store-orders-items.entity';

@Injectable()
export class StoreService {
  constructor(
    @Inject('STORE_REPOSITORY')
    private storeRepository: Repository<Store>,

    @Inject('ITEM_REPOSITORY')
    private itemRepository: Repository<Item>,

    @Inject('WALLET_ADDRESS_REPOSITORY')
    private walletAddressRepository: Repository<WalletAddress>,

    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,

    @Inject('STORE_ORDERS_ITEMS_REPOSITORY')
    private storeOrdersItemsRepository: Repository<StoreOrdersItems>,
  ) {}

  create(createStoreDto: CreateStoreDto): Promise<Store> {
    const createdStore = this.storeRepository.save(createStoreDto);
    return createdStore;
  }

  findAll(): Promise<Store[]> {
    return this.storeRepository.find({ where: { active: true } });
  }

  async findAllItemsFromStore(storeId: number): Promise<Item[]> {
    return await this.itemRepository.find({
      relations: { store: true },
      where: {
        store: { id: storeId },
      },
    });
  }

  async findAllWalletAdressesFromStore(
    storeId: number,
  ): Promise<WalletAddress[]> {
    return await this.walletAddressRepository.find({
      relations: { store: true },
      where: {
        store: { id: storeId },
      },
    });
  }

  async findOrdersFromStore(storeId: number) {
    const storeOrdersItems = await this.storeOrdersItemsRepository.find({
      where: { storeId },
    });

    const orderIds = storeOrdersItems.map((item) => item.orderId);

    const orders = await this.orderRepository.find({
      where: { id: In(orderIds) },
    });

    const ordersWithItems = [];

    for (const order of orders) {
      const orderItems = storeOrdersItems.filter(
        (item) => item.orderId === order.id,
      );

      const itemIds = orderItems.map((item) => item.itemId);

      const items = await this.itemRepository.find({
        where: { id: In(itemIds) },
      });

      const itemsWithQuantityAndUnitPrice = [];

      for (const orderItem of orderItems) {
        const item = items.find((item) => item.id === orderItem.itemId);
        if (item) {
          const itemObj = {
            name: item.name,
            sku: item.sku,
            unitPrice: orderItem.unitPrice,
            quantity: orderItem.quantity,
            thumbnail: item.thumbnail,
            storeId: item.storeId,
          };
          itemsWithQuantityAndUnitPrice.push(itemObj);
        }
      }
      if (order.status === 'complete') {
        const orderObj = {
          customer_email: order.customer_email,
          amountInUSD: order.amountInUSD,
          amountInUSDC: order.amountInUSDC,
          amountInEth: order.amountInEth,
          amountInWei: order.amountInWei,
          paymentAddress: order.paymentAddress,
          paymentReceipt: order.paymentReceipt,
          paymentCurrency: order.paymentCurrency,
          paymentTransactionHash: order.paymentTransactionHash,
          paymentProof: order.paymentProof,
          paymentFactoryAddress: order.paymentFactoryAddress,
          id: order.id,
          status: order.status,
          created_at: order.created_at,
          updated_at: order.updated_at,
          items: itemsWithQuantityAndUnitPrice,
        };

        ordersWithItems.push(orderObj);
      }
    }

    return ordersWithItems;
  }

  findOne(id: number) {
    return this.storeRepository.findOne({ where: { id, active: true } });
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    this.storeRepository.update(id, updateStoreDto);
    return `Store #${id} updated successfully`;
  }

  async toggleActivation(id: number) {
    const store = await this.storeRepository.findOne({ where: { id } });
    if (store.active === true) {
      await this.storeRepository.update(id, { active: false });
      return `Store #${id} deactivated successfully`;
    }
    await this.storeRepository.update(id, { active: true });
    return `Store #${id} activated successfully`;
  }
}
