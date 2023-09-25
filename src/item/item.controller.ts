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
  NotFoundException,
  Res,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';
import * as fs from 'fs';
import { Response } from 'express';

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
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const item = await this.itemService.findOne(id);

    if (!item) {
      throw new NotFoundException('No items found for this store');
    }

    const imageBuffer = fs.readFileSync(item.thumbnail);
    const base64Image = imageBuffer.toString('base64');
    const itemWithBase64Image = {
      ...item,
      thumbnail: 'data:image/jpeg;base64,' + base64Image,
    };

    return res.status(200).json(itemWithBase64Image);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('thumbnail', multerConfig))
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    if (!thumbnail) {
      throw new BadRequestException(
        'Thumbnail must be provided or file extension is invalid.',
      );
    }
    updateItemDto.thumbnail = thumbnail.path.toString();

    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
