import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [StoreModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
