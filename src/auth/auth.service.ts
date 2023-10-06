import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WalletAddress } from 'src/wallet-address/entities/wallet-address.entity';
import { WalletAddressService } from 'src/wallet-address/wallet-address.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }


    async signIn(username: string, password: string): Promise<any> {
        const payload = { sub: username, username: username, password: password };
        const frontendPassword = process.env.JWT_WALLET_ADDRESS_SECRET;

        if (password !== frontendPassword) {
            throw new UnauthorizedException();
        }

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}