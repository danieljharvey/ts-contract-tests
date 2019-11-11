import * as t from 'io-ts'

export const PetShape = t.type({
  petName: t.string
})

export const UserShape = t.type({
  userId: t.number,
  name: t.string,
  pets: t.array(PetShape)
})

type Pet = t.TypeOf<typeof PetShape>

export type User = t.TypeOf<typeof UserShape>

