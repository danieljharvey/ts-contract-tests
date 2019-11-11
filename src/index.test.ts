const fc = require('fast-check');
import { getArbitrary } from 'fast-check-io-ts';
import { either } from 'fp-ts'

import { User, UserShape } from './index'
import { generate } from './generate'

const userArbitrary = getArbitrary(UserShape)

describe('User', () => {
  test('Round trip encode and decode', () => {
    fc.assert(fc.property(userArbitrary,
      (user: User) => either.isRight(UserShape.decode(user))
    ))
    generate(userArbitrary)
  })
})


