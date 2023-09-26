import { Sale } from 'src/sale/entities/sale.entity';
import { DataSource } from 'typeorm';

export const saleProviders = [
    {
        provide: 'SALE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Sale),
        inject: ['DATA_SOURCE'],
    },
];