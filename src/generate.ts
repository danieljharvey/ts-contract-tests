import * as fc from 'fast-check'
import * as fs from 'fs'
import * as path from 'path'

export const generate = <A>(outputPath: string, arb: fc.Arbitrary<A>) => {
  fc.sample(arb, 100).map(a => JSON.stringify(a)).map((json, index) => {
    const filename = path.resolve(`${outputPath}${index}.json`)
    fs.writeFileSync(filename, json)
  })
}
