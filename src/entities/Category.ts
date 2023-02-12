import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProductCategory } from './ProductCategory'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  category_id!: number

  @Column()
  category_name!: string

  @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
  productCategories!: ProductCategory[]

  @CreateDateColumn()
  category_createdAt: Date
}
