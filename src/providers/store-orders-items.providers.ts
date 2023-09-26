import { StoreOrdersItems } from 'src/store-orders-items/entities/store-orders-items.entity';
import { DataSource } from 'typeorm';

export const storeOrdersItemsProviders = [
    {
        provide: 'STORE_ORDERS_ITEMS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(StoreOrdersItems),
        inject: ['DATA_SOURCE'],
    },
];