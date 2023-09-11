import { Store } from 'src/store/entities/store.entity';
import {
    Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('wallets_addresses')
export class WalletAddress {
  @PrimaryColumn({ unique: true })
  eth_address: string;

  @Column()
  id_store: number

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'id_store' })
  store: Store;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated: Date;
}
