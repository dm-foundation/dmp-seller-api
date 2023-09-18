import { Store } from 'src/store/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
@Entity('walletAddresses')
export class WalletAddress {
  @PrimaryColumn({ unique: true })
  ethAddress: string;

  @ManyToOne(() => Store, (store) => store.walletAddresses)
  store: Store;

  @Column()
  storeId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated: Date;
}
