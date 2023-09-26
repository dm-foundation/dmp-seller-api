import { Item } from 'src/item/entities/item.entity';
import { Order } from 'src/order/entities/order.entity';
import { StoreOrdersItems } from 'src/store-orders-items/entities/store-orders-items.entity';
import { WalletAddress } from 'src/wallet-address/entities/wallet-address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Item, (item) => item.store, { cascade: true })
  items: Item[];

  @OneToMany(() => WalletAddress, (walletAddress) => walletAddress.store)
  walletAddresses: WalletAddress[];

  @OneToMany(() => Order, (order) => order.store)
  orders: Order[];

  @OneToMany(() => StoreOrdersItems, (storeOrdersItems) => storeOrdersItems.store)
  storeOrdersItems: StoreOrdersItems[];

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
