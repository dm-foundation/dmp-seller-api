import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail', multerConfig))
  async create(
    @Body() createItemDto: CreateItemDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    if (!thumbnail) {
      throw new BadRequestException(
        'Thumbnail must be provided or file extension is invalid.',
      );
    }

    createItemDto.thumbnail = thumbnail.path.toString();

    return await this.itemService.create(createItemDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
