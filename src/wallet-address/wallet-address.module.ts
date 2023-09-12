import { Module } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddressController } from './wallet-address.controller';
import { walletAddressProviders } from 'src/providers/wallet-address.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WalletAddressController],
  providers: [...walletAddressProviders, WalletAddressService],
})
export class WalletAddressModule {}
