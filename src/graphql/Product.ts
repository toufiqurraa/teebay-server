import { objectType, extendType, nonNull, stringArg, floatArg, list, intArg } from 'nexus'
import { Context } from '../types/Context'
import { Product } from '../entities/Product'
import { User } from '../entities/User'
import { ProductCategory } from '../entities/ProductCategory'

export const ProductCategoryType = objectType({
  name: 'ProductCategory',
  definition(t) {
    t.nonNull.int('product_id')
    t.nonNull.int('category_id')
  }
})

export const ProductType = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.int('product_id')
    t.nonNull.string('product_name')
    t.nonNull.string('product_description')
    t.nonNull.float('product_price')
    t.nonNull.list
    t.nonNull.int('creatorId')
    t.field('createdBy', {
      type: 'User',
      resolve(parent, _args, _context): Promise<User | null> {
        return User.findOne({ where: { user_id: parent.creatorId } })
      }
    })
    t.list.field('categories', {
      type: 'ProductCategory',
      resolve: (_parent, _args, _context): Promise<ProductCategory[] | null> => {
        return ProductCategory.find({
          relations: {
            product: true
          }
        })
      }
    })
  }
})

export const ProductsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('products', {
      type: 'Product',
      resolve(_parent, _args, context: Context): Promise<Product[]> {
        // return Product.find()
        const { conn } = context

        return conn.query(`SELECT * FROM product`)
      }
    })
  }
})

// create product
export const CreateProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createProduct', {
      type: 'Product',
      args: {
        product_name: nonNull(stringArg()),
        product_price: nonNull(floatArg()),
        product_description: nonNull(stringArg()),
        categoryIds: list(intArg())
      },
      async resolve(_parent, args, context: Context): Promise<Product> {
        const { product_name, product_price, product_description, categoryIds } = args

        const { userId } = context

        if (!userId) {
          throw new Error(`Can't create a product without loggin in`)
        }

        const { conn } = context
        const queryRunner = conn.createQueryRunner()

        let product: Product

        try {
          // start transaction
          await queryRunner.startTransaction()

          // insert product
          const insertedProduct = await queryRunner.manager.save(queryRunner.manager.create(Product, { product_name, product_price, product_description, creatorId: userId }))

          product = insertedProduct

          // insert into product_category
          const productCategories = categoryIds.map((categoryId: number) => {
            return queryRunner.manager.create(ProductCategory, {
              product_id: insertedProduct.product_id,
              category_id: categoryId
            })
          })
          await queryRunner.manager.save(productCategories)

          // commit transaction
          await queryRunner.commitTransaction()
        } catch (error) {
          console.error(error)

          // rollback transaction on error
          await queryRunner.rollbackTransaction()
          throw error
        } finally {
          // release query runner
          await queryRunner.release()
        }

        return product
      }
    })
  }
})

// edit product
export const EditProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('editProduct', {
      type: 'Product',
      args: {
        product_name: nonNull(stringArg()),
        product_price: nonNull(floatArg()),
        product_description: nonNull(stringArg()),
        categoryIds: list(intArg())
      }
    })
  }
})
