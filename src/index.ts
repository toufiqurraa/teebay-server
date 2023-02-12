import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import dotenv from 'dotenv'
import typeormConfig from './typeorm.config'
import { Context } from './types/Context'
import { auth } from './utils/authorization'

dotenv.config()

const port = process.env.PORT || 8000

const boot = async () => {
  const conn = await typeormConfig.initialize()

  const server = new ApolloServer({
    schema,
    context: ({ req }): Context => {
      const token = req?.headers.authorization ? auth(req.headers.authorization) : null

      return { conn, userId: token?.userId }
    }
  })

  server.listen(port).then(({ url }) => {
    console.log(`Server is listening at ${url}`)
  })
}

boot()
