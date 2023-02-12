// import { extendType, intArg, nonNull, objectType } from 'nexus'
// import { ProductCategory } from '../entities/ProductCategory'
// import { Context } from '../types/Context'

// export const ProductCategoryType = objectType({
//   name: 'ProductCategory',
//   definition(t) {
//     t.nonNull.int('id')
//     t.nonNull.int('productProductId')
//     t.nonNull.int('categoryCategoryId')
//   }
// })

// export const CreateProductCategoryMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('createProductCategory', {
//       type: 'ProductCategory',
//       args: {
//         productProductId: nonNull(intArg()),
//         categoryCategoryId: nonNull(intArg())
//       },
//       resolve(_parent, args, context: Context, _info): Promise<ProductCategory> {
//         const { productProductId, categoryCategoryId } = args

//         // const { userId } = context

//         // if (!userId) {
//         //   throw new Error(`Can't create a product without loggin in`)
//         // }

//         return ProductCategory.create({ productProductId, categoryCategoryId }).save()
//       }
//     })
//   }
// })
