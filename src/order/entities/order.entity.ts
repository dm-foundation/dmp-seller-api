import { Item } from 'src/item/entities/item.entity';
import { StoreOrdersItems } from 'src/store-orders-items/entities/store-orders-items.entity';
import { Store } from 'src/store/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Status {
  PENDING = 'pending',
  COMPLETE = 'complete',
  INVOICE_CREATED = 'invoice_created',
  INVOICE_SENT = 'invoice_sent',
}

export enum Currency {
  USDC = 'USDC',
  ETH = 'ETH',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  customer_email: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @ManyToOne(() => Store, (store) => store.orders)
  store: Store;

  @OneToMany(() => Item, (item) => item.id)
  items: Item[];

  @OneToOne(
    () => StoreOrdersItems,
    (storeOrdersItems) => storeOrdersItems.order,
  )
  storeOrdersItems: StoreOrdersItems;

  @Column({ type: 'bigint' })
  amountInUSD: number

  @Column({ type: 'float', nullable: true })
  amountInEth: number

  @Column({ type: 'bigint', nullable: true })
  amountInWei: number

  @Column({ type: 'bigint' })
  amountInUSDC: number

  @Column()
  paymentFactoryAddress: string

  @Column({ unique: true })
  paymentAddress: string

  @Column()
  paymentProof: string

  @Column({ unique: true, nullable: true })
  paymentTransactionHash: string

  @Column({ unique: true })
  paymentReceipt: string;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.USDC,
  })
  paymentCurrency: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
