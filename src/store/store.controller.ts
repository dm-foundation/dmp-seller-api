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
  async findAll() {
    return await this.storeService.findAll();
  }

  @Get('/:storeId/items')
  async findAllItemsFromStore(@Param('storeId') storeId: number) {
    return await this.storeService.findAllItemsFromStore(storeId);
  }

  @Get('/:storeId/wallet-addresses')
  async findAllWalletAdressesFromStore(@Param('storeId') storeId: number) {
    return await this.storeService.findAllWalletAdressesFromStore(storeId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  async toggleActivation(@Param('id') id: string) {
    return await this.storeService.toggleActivation(+id);
  }
}
