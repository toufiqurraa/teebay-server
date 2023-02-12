import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ProductCategory } from './ProductCategory'
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
  product_description!: string

  @Column()
  creatorId!: number

  @ManyToOne(() => User, (user) => user.products)
  creator: User

  @OneToMany(() => ProductCategory, (productCategory) => productCategory.product)
  productCategories!: ProductCategory[]

  @CreateDateColumn()
  product_createdAt: Date

  @UpdateDateColumn()
  product_updatedAt: Date
}
