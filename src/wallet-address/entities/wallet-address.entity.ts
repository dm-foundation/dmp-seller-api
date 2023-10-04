import { Store } from 'src/store/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
@Entity('walletAddresses')
export class WalletAddress {
  @PrimaryColumn()
  ethAddress: string;

  @Column({ primary: true })
  storeId: number;

  @ManyToOne(() => Store, (store) => store.walletAddresses)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated: Date;
}
