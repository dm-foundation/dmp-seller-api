import { Store } from 'src/store/entities/store.entity';
import { WalletAddress } from 'src/wallet-address/entities/wallet-address.entity';
import { DataSource } from 'typeorm';

export const walletAddressProviders = [
    {
        provide: 'WALLET_ADDRESS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(WalletAddress),
        inject: ['DATA_SOURCE'],
    },
];