import * as fc from 'fast-check'
import * as fs from 'fs'
import * as path from 'path'

const outputPath = "./temp-output/"

export const generate = <A>(arb: fc.Arbitrary<A>) => {
  fc.sample(arb, 100).map(a => JSON.stringify(a)).map((json, index) => {
    const filename = path.resolve(`${outputPath}${index}.json`)
    console.log(filename)
    fs.writeFileSync(filename, json)
  })
}