import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { WalletAddressController } from 'src/wallet-address/wallet-address.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { walletAddressProviders } from 'src/providers/wallet-address.providers';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_AUTH_SECRET
      })
    }),
  ],
  providers: [
    AuthService,
    ...walletAddressProviders,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }