import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id!: number

  @Column()
  product_name!: string

  @Column({ type: 'decimal' })
  product_price!: number

  @Column()
  creatorId!: number

  @ManyToOne(() => User, (user) => user.products)
  creator: User

  @CreateDateColumn()
  product_createdAt: Date

  @UpdateDateColumn()
  product_updatedAt: Date
}
