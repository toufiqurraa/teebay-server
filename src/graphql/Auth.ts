import { objectType, nonNull, stringArg, extendType } from 'nexus'
import argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import { Context } from '../types/Context'
import { User } from '../entities/User'

export const AuthType = objectType({
  name: 'AuthType',
  definition(t) {
    t.nonNull.string('token'),
      t.nonNull.field('user', {
        type: 'User'
      })
  }
})

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('register', {
      type: 'AuthType',
      args: {
        first_name: nonNull(stringArg()),
        last_name: nonNull(stringArg()),
        address: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        confirm_password: nonNull(stringArg())
      },

      async resolve(_parent, args, context: Context, _info) {
        const { first_name, last_name, address, email, password, confirm_password } = args

        if (password === confirm_password && email.includes('@')) {
          const hashedPassword = await argon2.hash(password)

          let user
          let token

          try {
            // query builder
            const result = await context.conn
              .createQueryBuilder()
              .insert()
              .into(User)
              .values({
                first_name,
                last_name,
                address,
                password: hashedPassword,
                email
              })
              .returning('*')
              .execute()

            user = result.raw[0]

            token = jwt.sign({ userId: user.user_id }, process.env.TOKEN_SECRET as jwt.Secret)
          } catch (error) {
            console.dir(error)
          }

          return {
            user,
            token
          }
        } else {
          throw new Error('Email or Password incorrect')
        }
      }
    })

    t.nonNull.field('login', {
      type: 'AuthType',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg())
      },
      async resolve(_parent, args, _context: Context, _info) {
        const { email, password } = args
        const user = await User.findOne({ where: { email } })

        if (!user) {
          throw new Error('User not found')
        }

        const isValid = await argon2.verify(user.password, password)

        if (!isValid) {
          throw new Error('Invalid email or password')
        }

        const token = jwt.sign({ userId: user.user_id }, process.env.TOKEN_SECRET as jwt.Secret)

        return {
          token,
          user
        }
      }
    })
  }
})
