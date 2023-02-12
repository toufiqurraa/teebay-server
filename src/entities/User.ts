import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './Product'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id!: number

  @Column('varchar', { length: 100 })
  first_name!: string

  @Column('varchar', { length: 100 })
  last_name!: string

  @Column('text')
  address!: string

  @Column({ unique: true })
  email!: string

  @Column('text')
  password!: string

  @OneToMany(() => Product, (product) => product.creator)
  products: Product[]

  @CreateDateColumn()
  create_date: Date
}
