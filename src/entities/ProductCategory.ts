import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Category } from './Category'
import { Product } from './Product'

@Entity()
export class ProductCategory extends BaseEntity {
  @PrimaryColumn()
  product_id!: number

  @PrimaryColumn()
  category_id!: number

  @ManyToOne(() => Product, (product) => product.productCategories)
  product: Product

  @ManyToOne(() => Category, (category) => category.productCategories)
  category: Category

  @CreateDateColumn()
  category_createdAt: Date
}
