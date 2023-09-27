import { StoreOrdersItems } from 'src/store-orders-items/entities/store-orders-items.entity';
import { Store } from 'src/store/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column()
  price: number;

  @Column()
  units: number;

  @Column()
  thumbnail: string;

  @Column({nullable: false})
  storeId: number;

  @ManyToOne(() => Store, (store) => store.items)
  @JoinColumn({name: 'storeId'})
  store: Store;

  @ManyToMany(() => StoreOrdersItems)
  storeOrdersItems: StoreOrdersItems[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
