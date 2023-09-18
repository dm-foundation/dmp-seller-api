import { Test, TestingModule } from '@nestjs/testing';
import { WalletAddressService } from './wallet-address.service';

describe('WalletAddressService', () => {
  let service: WalletAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: WalletAddressService,
        useValue: {}
      }],
    }).compile();

    service = module.get<WalletAddressService>(WalletAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
