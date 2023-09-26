import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreOrdersItemDto } from './create-store-orders-item.dto';

export class UpdateStoreOrdersItemDto extends PartialType(CreateStoreOrdersItemDto) {}
