import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get('/:id_store/items')
  findAllItemsFromStore(@Param('id_store') id_store: number) {
    return this.storeService.findAllItemsFromStore(id_store);
  }

  @Get('/:id_store/wallet-addresses')
  findAllWalletAdressesFromStore(@Param('id_store') id_store: number) {
    return this.storeService.findAllWalletAdressesFromStore(id_store);
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
