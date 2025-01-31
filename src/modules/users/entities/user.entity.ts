import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  gender: 'male' | 'female';

  @Column({ type: 'enum', enum: ['avtice', 'inactive'], nullable: true })
  status: 'avtice' | 'inactive';

  @Column({
    type: 'enum',
    enum: ['normal', 'admin', 'gold'],
    default: 'normal',
  })
  role: 'normal' | 'admin' | 'gold';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
