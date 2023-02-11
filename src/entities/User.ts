import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id!: number

  @Column('varchar', { length: 100 })
  first_name!: string

  @Column('varchar', { length: 100 })
  last_name!: string

  @Column()
  address!: string

  @Column({ unique: true })
  email!: string

  @Column('text')
  password!: string

  @CreateDateColumn()
  create_date: Date
}
