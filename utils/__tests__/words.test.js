import { getFirstWord, joinWord } from 'dict/utils/words'

test('getFirstWord will be get first word of message', () => {
  expect(getFirstWord('Hello from the next universe')).toEqual('Hello')
})

test('joinWord will join all word from array to string with "and" at last', () => {
  expect(joinWord(['A', 'B', 'C', 'D'])).toEqual('A, B, C and D')
  expect(joinWord(['A', 'B'])).toEqual('A and B')
  expect(joinWord(['A'])).toEqual('A')
})
