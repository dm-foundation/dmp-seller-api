import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { DatabaseModule } from 'src/database/database.module';
import { itemProviders } from 'src/providers/item.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemController],
  providers: [...itemProviders, ItemService],
})
export class ItemModule {}
