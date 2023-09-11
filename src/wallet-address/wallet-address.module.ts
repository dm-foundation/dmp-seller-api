import { Module } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddressController } from './wallet-address.controller';

@Module({
  controllers: [WalletAddressController],
  providers: [WalletAddressService],
})
export class WalletAddressModule {}
