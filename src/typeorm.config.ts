import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { User } from './entities/User'
import { Product } from './entities/Product'
import { Category } from './entities/Category'
import { ProductCategory } from './entities/ProductCategory'

dotenv.config()

export default new DataSource({
  type: 'postgres',
  url: process.env.CONNECTION_STRING,
  entities: [User, Product, Category, ProductCategory],
  synchronize: true
})
