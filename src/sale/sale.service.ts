import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    @Inject('SALE_REPOSITORY')
    private saleRepository: Repository<Sale>) { }

  async create(createSaleDto: CreateSaleDto) {
    const createdSale = await this.saleRepository.save(createSaleDto)
    return createdSale;
  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
