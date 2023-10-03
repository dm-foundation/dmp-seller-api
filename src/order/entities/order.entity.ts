import { Item } from 'src/item/entities/item.entity';
import { StoreOrdersItems } from 'src/store-orders-items/entities/store-orders-items.entity';
import { Store } from 'src/store/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ nullable: false })
  storeId: number;

  @ManyToOne(() => Store, (store) => store.orders)
  @JoinColumn({ name: 'storeId' })
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

  @Column()
  paymentAddress: string

  @Column()
  paymentProof: string

  @Column({ nullable: true })
  paymentTransactionHash: string

  @Column()
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
