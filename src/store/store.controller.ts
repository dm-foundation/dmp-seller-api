import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Res } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import * as fs from 'fs';
import { Response } from 'express';

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
  async findAllItemsFromStore(@Param('storeId') storeId: number, @Res() res: Response) {
    const items = await this.storeService.findAllItemsFromStore(storeId);

    if (!items || items.length === 0) {
      throw new NotFoundException('No items found for this store');
    }

    const itemsWithBase64Images = await Promise.all(
      items.map(async (item) => {
        const imageBuffer = fs.readFileSync(item.thumbnail);
        const base64Image = imageBuffer.toString('base64');
        return { ...item, thumbnail: "data:image/jpeg;base64," + base64Image };
      }),
    );

    return res.status(200).json(itemsWithBase64Images);
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
