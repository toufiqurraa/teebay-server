import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import dotenv from 'dotenv'
import typeormConfig from './typeorm.config'

dotenv.config()

const port = process.env.PORT || 8000

const boot = async () => {
  const conn = await typeormConfig.initialize()

  const server = new ApolloServer({ schema, context: () => ({ conn }) })

  server.listen(port).then(({ url }) => {
    console.log(`Server is listening at ${url}`)
  })
}

boot()
