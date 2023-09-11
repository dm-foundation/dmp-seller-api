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
  ) {}

  create(createStoreDto: CreateStoreDto): Promise<Store> {
    const createdStore = this.storeRepository.save(createStoreDto);
    return createdStore;
  }

  findAll(): Promise<Store[]> {
    return this.storeRepository.find();
  }

  findOne(id: number) {
    return this.storeRepository.findOne({ where: { id } });
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    const updatedStore = this.storeRepository.update(id, updateStoreDto);
    return `Store #${id} updated successfully`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
