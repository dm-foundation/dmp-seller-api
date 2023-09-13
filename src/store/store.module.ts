import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { storeProviders } from '../providers/store.providers';
import { DatabaseModule } from 'src/database/database.module';
import { itemProviders } from 'src/providers/item.providers';
import { walletAddressProviders } from 'src/providers/wallet-address.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [
    ...storeProviders,
    ...itemProviders,
    ...walletAddressProviders,
    StoreService
  ]
})

export class StoreModule { }
