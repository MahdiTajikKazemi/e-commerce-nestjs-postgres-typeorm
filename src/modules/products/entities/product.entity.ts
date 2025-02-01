import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  quantity_in_stock: number;

  @Column({ type: 'float', default: 0 })
  unit_price: number;

  @Column({
    type: 'enum',
    enum: ['available', 'unavailable'],
    default: 'available',
  })
  status: 'available' | 'unavailable';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
