import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { In, Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY')
    private itemRepository: Repository<Item>,
  ) { }
  async create(createItemDto: CreateItemDto) {
    Number(createItemDto.storeId)
    const createdItem = await this.itemRepository.save(createItemDto)
    return createdItem;
  }

  findOne(id: number) {
    return this.itemRepository.findOne({ where: { id } });
  }

  findByIds(ids: number[]) {
    return this.itemRepository.find({ where: { id: In(ids) } });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    console.log("updateItemDto", updateItemDto);
    this.itemRepository.update(id, updateItemDto);
    return `Item #${id} updated successfully`;
  }

  remove(id: number) {
    this.itemRepository.delete({ id })
    return `Item #${id} deleted successfully`;
  }
}
