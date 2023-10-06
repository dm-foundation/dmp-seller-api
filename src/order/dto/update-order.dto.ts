import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { Status } from '../entities/order.entity';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    status: Status;
}
