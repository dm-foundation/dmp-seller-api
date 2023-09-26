import { Test, TestingModule } from '@nestjs/testing';
import { StoreOrdersItemsController } from './store-orders-items.controller';
import { StoreOrdersItemsService } from './store-orders-items.service';

describe('StoreOrdersItemsController', () => {
  let controller: StoreOrdersItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreOrdersItemsController],
      providers: [StoreOrdersItemsService],
    }).compile();

    controller = module.get<StoreOrdersItemsController>(StoreOrdersItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
