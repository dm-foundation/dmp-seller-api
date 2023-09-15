import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';

@Controller('wallet-address')
export class WalletAddressController {
  constructor(private readonly walletAddressService: WalletAddressService) { }

  @Post()
  create(@Body() createWalletAddressDto: CreateWalletAddressDto) {
    return this.walletAddressService.create(createWalletAddressDto);
  }

  @Get(':ethAddress')
  async findOne(@Param('ethAddress') ethAddress: string) {
    return await this.walletAddressService.findOneByEthAddress(ethAddress);
  }

  @Patch(':ethAddress')
  update(@Param('ethAddress') ethAddress: string, @Body() updateWalletAddressDto: UpdateWalletAddressDto) {
    return this.walletAddressService.update(+ethAddress, updateWalletAddressDto);
  }

  @Delete(':ethAddress')
  remove(@Param('ethAddress') ethAddress: string) {
    return this.walletAddressService.remove(ethAddress);
  }
}
