import { mergeCountObjectArrays } from "./count";

test('mergeCountObjectArray function', () => {
  const target = [
    {name: 2, count: 1},
    {name: 3, count: 2}
  ]
  const selected = [
    {name: 2, count: 1},
    {name: 4, count: 2}
  ]
  const expected = [
    {name: 2, count: 2},
    {name: 3, count: 2},
    {name: 4, count: 2}
  ]
  mergeCountObjectArrays(target, selected);
  expect(target).toEqual(expected);
});