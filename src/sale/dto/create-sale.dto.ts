import { Item } from "src/item/entities/item.entity";
import { Status } from "../entities/sale.entity";

export class CreateSaleDto {
    customer_email: string;
    status: Status;
    storeId: number;
    amountInUSD: number;
    amountInEth: number;
    amountInWei: number;
    contractPaymentAddress: string;
    transactionHash: string;
    hashedCart: string;
}
