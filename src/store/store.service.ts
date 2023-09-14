import { Inject, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { Item } from 'src/item/entities/item.entity';
import { WalletAddress } from 'src/wallet-address/entities/wallet-address.entity';

@Injectable()
export class StoreService {
  constructor(
    @Inject('STORE_REPOSITORY')
    private storeRepository: Repository<Store>,

    @Inject('ITEM_REPOSITORY')
    private itemRepository: Repository<Item>,

    @Inject('WALLET_ADDRESS_REPOSITORY')
    private walletAddressRepository: Repository<WalletAddress>,
  ) {}

  create(createStoreDto: CreateStoreDto): Promise<Store> {
    const createdStore = this.storeRepository.save(createStoreDto);
    return createdStore;
  }

  findAll(): Promise<Store[]> {
    return this.storeRepository.find({ where: { active: true } });
  }

  findAllItemsFromStore(id_store: number): Promise<Item[]> {
    return this.itemRepository.find({where: {id_store}});
  }

  findAllWalletAdressesFromStore(id_store: number): Promise<WalletAddress[]> {
    return this.walletAddressRepository.find({where: {id_store}});
  }

  findOne(id: number) {
    return this.storeRepository.findOne({ where: { id, active: true } });
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    this.storeRepository.update(id, updateStoreDto);
    return `Store #${id} updated successfully`;
  }

  async toggleActivation(id: number) {
    const store = await this.storeRepository.findOne({ where: { id } });
    if(store.active === true){
      await this.storeRepository.update(id, { active: false });
      return `Store #${id} deactivated successfully`;
    }
    await this.storeRepository.update(id, { active: true })
    return `Store #${id} activated successfully`;
  }
}
