import { Item } from 'src/item/entities/item.entity';
import { Order } from 'src/order/entities/order.entity';
import { Store } from 'src/store/entities/store.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  Entity,
  JoinTable,
} from 'typeorm';

@Entity('store_orders_items')
export class StoreOrdersItems {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  storeId: number;

  @ManyToOne(() => Store, (store) => store.storeOrdersItems)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @Column()
  itemId: number;

  @ManyToMany(() => Item)
  @JoinTable({ name: 'Item' })
  items: Item[];

  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.storeOrdersItems)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  quantity: number;

  @Column({ type: 'decimal' })
  unitPrice: number;
}
