import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Status } from './entities/order.entity';
import { updateOrderStatusDto } from './dto/update-order-status';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id/status')
  updateOrderStatus(@Param('id') id: string, @Body() updateOrderStatusDto: updateOrderStatusDto) {
    return this.orderService.updateOrderStatus(+id, updateOrderStatusDto.status);
  }

  @Get(':id/send-email')
  async sendReceiptByEmail(@Param('id') id: string) {
    return this.orderService.sendReceiptByEmail(+id);
  }
}
