import { getStringWordCount, getStringWordOccurences, getArrayWordOccurences } from "./string-statistics";

describe("String statistics", () => {

  const stringOne = "I am a six words string";
  const stringTwo = "I believe I am an eight words string";

  test("getArrayWordCount function", () => {
    expect(getStringWordCount("")).toEqual(0);
    expect(getStringWordCount("One")).toEqual(1);
    expect(getStringWordCount(stringOne)).toEqual(6);
    expect(getStringWordCount(stringTwo)).toEqual(8);
  });

  test("getStringWordOccurences function", () => {
    expect(getStringWordOccurences(stringOne)).toEqual([
      {name: "I", count: 1},
      {name: "am", count: 1},
      {name: "a", count: 1},
      {name: "six", count: 1},
      {name: "words", count: 1},
      {name: "string", count: 1}
    ]);
  });

  test("getArrayWordOccurences function", () => {
    expect(getArrayWordOccurences([stringOne, stringTwo])).toEqual([
      {name: "I", count: 3},
      {name: "am", count: 2},
      {name: "words", count: 2},
      {name: "string", count: 2},
      {name: "a", count: 1},
      {name: "six", count: 1},
      {name: "believe", count: 1},
      {name: "an", count: 1},
      {name: "eight", count: 1},
    ]);
  });
});