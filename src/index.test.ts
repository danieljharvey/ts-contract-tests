const fc = require('fast-check');
import { getArbitrary } from 'fast-check-io-ts';
import { either } from 'fp-ts'
import * as path from 'path'
import * as fs from 'fs'

import { User, UserShape } from './index'
import { generate } from './generate'

const userArbitrary = getArbitrary(UserShape)

const rangeArr = [...Array(100).keys()];

const outputPath = './temp-output/'

describe('User', () => {
  test('Round trip encode and decode', () => {
    fc.assert(fc.property(userArbitrary,
      (user: User) => either.isRight(UserShape.decode(user))
    ))
  })
  test('Write to and read from files', () => {
    generate(outputPath, userArbitrary)
    rangeArr.forEach(index => {
      const filename = path.resolve(`${outputPath}${index}.json`)
      const file = JSON.parse(fs.readFileSync(filename, "utf8"))
      expect(either.isRight(UserShape.decode(file))).toBeTruthy()
    })
  })
})

