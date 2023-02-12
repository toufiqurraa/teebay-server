import { BaseEntity, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './Category'
import { Product } from './Product'

@Entity()
export class ProductCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category

  @CreateDateColumn()
  category_createdAt: Date
}
