import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreOrdersItemsService } from './store-orders-items.service';
import { CreateStoreOrdersItemDto } from './dto/create-store-orders-item.dto';
import { UpdateStoreOrdersItemDto } from './dto/update-store-orders-item.dto';

@Controller('store-orders-items')
export class StoreOrdersItemsController {
  constructor(private readonly storeOrdersItemsService: StoreOrdersItemsService) {}

  @Post()
  create(@Body() createStoreOrdersItemDto: CreateStoreOrdersItemDto) {
    return this.storeOrdersItemsService.create(createStoreOrdersItemDto);
  }

}
