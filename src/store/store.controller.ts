import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get('/:storeId/items')
  findAllItemsFromStore(@Param('storeId') storeId: number) {
    return this.storeService.findAllItemsFromStore(storeId);
  }

  @Get('/:storeId/wallet-addresses')
  findAllWalletAdressesFromStore(@Param('storeId') storeId: number) {
    return this.storeService.findAllWalletAdressesFromStore(storeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  toggleActivation(@Param('id') id: string) {
    return this.storeService.toggleActivation(+id);
  }
}
