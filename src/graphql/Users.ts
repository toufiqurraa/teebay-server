import { objectType } from 'nexus'

export const UserType = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('user_id')
    t.nonNull.string('first_name')
    t.nonNull.string('last_name')
    t.nonNull.string('address')
    t.nonNull.string('email')
    t.nonNull.string('password')
  }
})
