import { Item } from "src/item/entities/item.entity";

export class CreateSaleDto {
    customer_email: string;
    status: string;
    storeId: number;
    amountInUSD: number;
    amountInEth: number;
    amountInWei: number;
    items: Item[];
    contractPaymentAddress: string;
    hashedCart: string;
}
