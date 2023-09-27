import { CreateItemDto } from "src/item/dto/create-item.dto";

export class CreateOrderDto {
    customer_email: string;
    storeId: number;
    amountInUSD: number;
    amountInEth: number;
    amountInWei: number;
    items: number[];
    paymentFactoryAddress: string;
    paymentAddress: string;
    paymentTransactionHash: string
    hashedCart: string;
}
