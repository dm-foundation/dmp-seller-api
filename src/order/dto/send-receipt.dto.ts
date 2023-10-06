export class ItemProps {
    id: number;
    name: string;
    sku: string;
    unitPrice: number;
    quantity: number;
    thumbnail: string;
    storeId: number;
    created_at: Date;
  }
  
  export class SendReceiptDto {
    id: number;
    customer_email: string;
    storeId: number;
    storeName: string;
    amountInUSD: number;
    amountInEth: number;
    amountInWei: number;
    amountInUSDC: number;
    items: ItemProps[];
    paymentProof: string;
    paymentFactoryAddress: string;
    paymentAddress: string;
    paymentTransactionHash: string;
    paymentReceipt: string;
    created_at: Date;
  }