import { Logger } from '@nestjs/common';
import { Item } from 'src/item/entities/item.entity';
import { Store } from 'src/store/entities/store.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export enum Status {
  PENDING = 'pending',
  COMPLETE = 'complete',
  INVOICE_CREATED = 'invoice_created',
  INVOICE_SENT = 'invoice_sent',
}

@Entity('sales')
export class Sale {

  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ default: '' })
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

  @Column({ type: 'bigint' })
  amountInUSD: number

  @Column({ type: 'float' })
  amountInEth: number

  @Column({ type: 'bigint' })
  amountInWei: number

  @Column()
  paymentFactoryAddress: string

  @Column()
  paymentAddress: string

  @Column({ unique: true, nullable: true })
  paymentTransactionHash: string

  @Column()
  hashedCart: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  static Created: any;
}
