import { Test, TestingModule } from '@nestjs/testing';
import { StoreOrdersItemsService } from './store-orders-items.service';

describe('StoreOrdersItemsService', () => {
  let service: StoreOrdersItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreOrdersItemsService],
    }).compile();

    service = module.get<StoreOrdersItemsService>(StoreOrdersItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
