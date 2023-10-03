
export class CreateOrderDto {
    customer_email: string;
    storeId: number;
    amountInUSD: number;
    amountInEth: number;
    amountInWei: number;
    items: itemHandle[];
    paymentFactoryAddress: string;
    paymentAddress: string;
    paymentTransactionHash: string
    hashedCart: string;
}

class itemHandle {
    itemId: number;
    quantity: number;
    unitPrice: number;
}
