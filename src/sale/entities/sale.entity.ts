import { Item } from 'src/item/entities/item.entity';
import { Store } from 'src/store/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Status {
  PENDING = 'pending',
  COMPLETE = 'complete',
  INVOICE_CREATED = 'invoice_created',
  INVOICE_SENT = 'invoice_sent',
}

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  customer_email: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @ManyToOne(() => Store, (store) => store.sales)
  store: Store;

  @OneToMany(() => Item, (item) => item.id)
  items: Item[];

  @Column()
  amountInUSD: number

  @Column()
  amountInEth: number

  @Column()
  amountInWei: number

  @Column()
  contractPaymentAddress: string

  @Column()
  hashedCart: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
