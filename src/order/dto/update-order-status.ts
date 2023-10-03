import { Status } from "../entities/order.entity";

export class updateOrderStatusDto {
    id: number;
    status: Status;
}