import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY')
    private itemRepository: Repository<Item>,
  ) {}
  async create(createItemDto: CreateItemDto) {
    console.log("🚀 ~ file: item.service.ts:14 ~ ItemService ~ create ~ createItemDto:", createItemDto)
    Number(createItemDto.storeId)
    const createdItem = await this.itemRepository.save(createItemDto)
    console.log("🚀 ~ file: item.service.ts:16 ~ ItemService ~ create ~ createdItem:", createdItem)
    return createdItem;
  }

  findOne(id: number) {
    return this.itemRepository.findOne({ where: { id } });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    this.itemRepository.update(id, updateItemDto);
    return `Item #${id} updated successfully`;
  }

  remove(id: number) {
    this.itemRepository.delete({id})
    return `Item #${id} deleted successfully`;
  }
}
