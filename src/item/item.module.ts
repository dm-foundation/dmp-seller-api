import { Module, ValidationPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { DatabaseModule } from 'src/database/database.module';
import { itemProviders } from 'src/providers/item.providers';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';

@Module({
  imports: [DatabaseModule, MulterModule.register(multerConfig)],
  controllers: [ItemController],
  providers: [...itemProviders, ItemService],
})
export class ItemModule {}
