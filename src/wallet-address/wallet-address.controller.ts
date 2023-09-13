import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';

@Controller('wallet-address')
export class WalletAddressController {
  constructor(private readonly walletAddressService: WalletAddressService) {}

  @Post()
  create(@Body() createWalletAddressDto: CreateWalletAddressDto) {
    return this.walletAddressService.create(createWalletAddressDto);
  }

  @Get(':eth_address')
  findOne(@Param('eth_address') eth_address: string) {
    return this.walletAddressService.findOneByEthAddress(eth_address);
  }

  @Patch(':eth_address')
  update(@Param('eth_address') eth_address: string, @Body() updateWalletAddressDto: UpdateWalletAddressDto) {
    return this.walletAddressService.update(+eth_address, updateWalletAddressDto);
  }

  @Delete(':eth_address')
  remove(@Param('eth_address') eth_address: string) {
    return this.walletAddressService.remove(eth_address);
  }
}
