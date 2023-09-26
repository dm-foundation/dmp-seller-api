import { Item } from "src/item/entities/item.entity";

export class CreateSaleDto {
    customer_email: string;
    storeId: number;
    amountInUSD: number;
    amountInEth: number;
    amountInWei: number;
    contractPaymentAddress: string;
    transactionHash: string;
    hashedCart: string;
}
