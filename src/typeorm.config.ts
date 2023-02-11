import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { User } from './entities/User'

dotenv.config()

export default new DataSource({
  type: 'postgres',
  url: process.env.CONNECTION_STRING,
  entities: [User],
  synchronize: true
})
