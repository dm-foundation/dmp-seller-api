import { Inject, Injectable } from '@nestjs/common';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';
import { Repository } from 'typeorm';
import { WalletAddress } from './entities/wallet-address.entity';

@Injectable()
export class WalletAddressService {
  constructor(
    @Inject('WALLET_ADDRESS_REPOSITORY')
    private walletStoreRepository: Repository<WalletAddress>,
  ) {}
  create(createWalletAddressDto: CreateWalletAddressDto) {
    const createdWalletSore = this.walletStoreRepository.save(
      createWalletAddressDto,
    );
    return createdWalletSore;
  }

  findOneByEthAddress(eth_address: string) {
    return this.walletStoreRepository.findOne({ where: { eth_address } });
  }

  update(eth_address: number, updateWalletAddressDto: UpdateWalletAddressDto) {
    this.walletStoreRepository.update(
      eth_address,
      updateWalletAddressDto,
    );
    return `WalletAddress #${eth_address} updated successfully`;
  }

  remove(eth_address: string) {
    this.walletStoreRepository.delete({ eth_address });
    return `WalletAddress #${eth_address} deleted successfully`;
  }
}
