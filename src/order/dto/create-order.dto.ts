export class CreateOrderDto {
  customer_email: string;
  storeId: number;
  amountInUSD: number;
  amountInEth: number;
  amountInWei: number;
  amountInUSDC: number;
  items: itemHandle[];
  paymentProof: string;
  paymentFactoryAddress: string;
  paymentAddress: string;
  paymentTransactionHash: string;
  paymentReceipt: string;
}

class itemHandle {
  itemId: number;
  quantity: number;
  unitPrice: number;
}
