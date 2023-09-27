import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { saleProviders } from 'src/providers/sale.providers';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SaleController],
  providers: [
    ...saleProviders,
    SaleService
  ],
})
export class SaleModule { }
