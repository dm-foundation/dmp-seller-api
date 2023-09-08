import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { storeProviders } from '../providers/store.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [
    ...storeProviders,
    StoreService
  ]
})

export class StoreModule { }
