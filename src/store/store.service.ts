import { Inject, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {

  constructor(
    @Inject('STORE_REPOSITORY')
    private storeRepository: Repository<Store>,
  ) { }

  create(createStoreDto: CreateStoreDto) {
    return 'This action adds a new store';
  }

  findAll(): Promise<Store[]> {
    return this.storeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
