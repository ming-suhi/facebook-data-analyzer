import { rawMessage } from "./raw";
import { 
  convertRawMessages,
  getArrayWordCount, 
  getArrayWordOccurences, 
  getMessageCountPerHour, 
  getMessageCountPerYear, 
  getStringWordCount, 
  getStringWordOccurences
} from "./message";

describe("Message statistics functions", () => {

  const stringOne = "I am a six words string";
  const stringTwo = "I believe I am an eight words string";

  test("getArrayWordCount function", () => {
    expect(getStringWordCount(stringOne)).toEqual(6);
    expect(getStringWordCount(stringTwo)).toEqual(8);
  });

  test("getArrayWordCount function", () => {
    expect(getArrayWordCount([stringOne, stringTwo])).toEqual(6 + 8);
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



describe("Message class functions", () => {

  const rawMessageTwo: rawMessage = {
    sender_name: "Sender Kun",
    timestamp_ms: 1638598670815,
    content: "Testing testing"
  };
  
  const rawMessageOne: rawMessage = {
    sender_name: "Sender San",
    timestamp_ms: 1638598592802,
    content: "Ping received"
  };

  test("getMessageCountPerHour function", () => {
    const messages = convertRawMessages([rawMessageOne, rawMessageTwo]);
    expect(getMessageCountPerHour(messages)).toEqual([{name: 14, count: 2}]);
  });

  test("getMessageCountPerYear function", () => {
    const messages = convertRawMessages([rawMessageOne, rawMessageTwo]);
    expect(getMessageCountPerYear(messages)).toEqual([{name: 2021, count: 2}]);
  });
})