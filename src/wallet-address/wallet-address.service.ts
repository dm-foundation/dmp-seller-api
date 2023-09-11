import { Injectable } from '@nestjs/common';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';

@Injectable()
export class WalletAddressService {
  create(createWalletAddressDto: CreateWalletAddressDto) {
    return 'This action adds a new walletAddress';
  }

  findAll() {
    return `This action returns all walletAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} walletAddress`;
  }

  update(id: number, updateWalletAddressDto: UpdateWalletAddressDto) {
    return `This action updates a #${id} walletAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} walletAddress`;
  }
}
