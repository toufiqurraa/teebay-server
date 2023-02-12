import { objectType, extendType, nonNull, stringArg, floatArg } from 'nexus'
import { Context } from '../types/Context'
import { Product } from '../entities/Product'
import { User } from '../entities/User'

export const ProductType = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.int('product_id')
    t.nonNull.string('product_name')
    t.nonNull.float('product_price')
    t.nonNull.list
    t.nonNull.int('creatorId')
    t.field('createdBy', {
      type: 'User',
      resolve(parent, _args, _context): Promise<User | null> {
        return User.findOne({ where: { user_id: parent.creatorId } })
      }
    })
  }
})

export const ProductsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('products', {
      type: 'Product',
      resolve(_parent, _args, context: Context, _info): Promise<Product[]> {
        // return Product.find()
        const { conn } = context

        return conn.query(`SELECT * FROM product`)
      }
    })
  }
})

export const CreateProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createProduct', {
      type: 'Product',
      args: {
        product_name: nonNull(stringArg()),
        product_price: nonNull(floatArg())
      },
      resolve(_parent, args, context: Context, _info): Promise<Product> {
        const { product_name, product_price } = args

        const { userId } = context

        if (!userId) {
          throw new Error(`Can't create a product without loggin in`)
        }

        return Product.create({ product_name, product_price, creatorId: userId }).save()
      }
    })
  }
})
