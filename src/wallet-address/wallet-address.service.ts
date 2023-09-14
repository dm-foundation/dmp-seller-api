import { Inject, Injectable } from '@nestjs/common';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';
import { Repository } from 'typeorm';
import { WalletAddress } from './entities/wallet-address.entity';

@Injectable()
export class WalletAddressService {
  constructor(
    @Inject('WALLET_ADDRESS_REPOSITORY')
    private walletAddressRepository: Repository<WalletAddress>,
  ) { }
  create(createWalletAddressDto: CreateWalletAddressDto) {
    const createdWalletSore = this.walletAddressRepository.save(
      createWalletAddressDto,
    );
    return createdWalletSore;
  }

  findOneByEthAddress(ethAddress: string) {
    return this.walletAddressRepository.findOne({ where: { ethAddress } });
  }

  update(ethAddress: number, updateWalletAddressDto: UpdateWalletAddressDto) {
    this.walletAddressRepository.update(
      ethAddress,
      updateWalletAddressDto,
    );
    return `WalletAddress #${ethAddress} updated successfully`;
  }

  remove(ethAddress: string) {
    this.walletAddressRepository.delete({ ethAddress });
    return `WalletAddress #${ethAddress} deleted successfully`;
  }
}
