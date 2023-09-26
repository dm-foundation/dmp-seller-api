import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { DatabaseModule } from 'src/database/database.module';
import { saleProviders } from 'src/providers/sale.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SaleController],
  providers: [
    ...saleProviders,
    SaleService
  ],
})
export class SaleModule { }
