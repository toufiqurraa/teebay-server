import { objectType, extendType, nonNull, stringArg } from 'nexus'
import { Category } from '../entities/Category'

export const CategoryType = objectType({
  name: 'Category',
  definition(t) {
    t.nonNull.int('category_id')
    t.nonNull.string('category_name')
  }
})

export const CategoryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('categories', {
      type: 'Category',
      resolve(_parent, _args, _context, _info): Promise<Category[]> {
        return Category.find()
      }
    })
  }
})

export const CreateCategoryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createCategory', {
      type: 'Category',
      args: {
        category_name: nonNull(stringArg())
      },
      resolve(_parent, args, _context, _info): Promise<Category> {
        const { category_name } = args

        return Category.create({ category_name }).save()
      }
    })
  }
})
