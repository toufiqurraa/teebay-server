import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  category_id!: number

  @Column()
  category_name!: string

  @CreateDateColumn()
  category_createdAt: Date
}
