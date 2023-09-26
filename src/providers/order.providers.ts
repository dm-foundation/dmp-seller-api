import { Order } from 'src/order/entities/order.entity';
import { DataSource } from 'typeorm';

export const orderProviders = [
    {
        provide: 'ORDER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
        inject: ['DATA_SOURCE'],
    },
];