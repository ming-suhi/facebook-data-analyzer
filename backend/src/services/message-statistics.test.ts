import { rawMessage } from "../structures/raw";
import Message from "../structures/message";
import { getMessageCountPerHour, getMessageCountPerYear } from "./message-statistics";

describe("Message statistics", () => {
  const rawMessageTwo: rawMessage = {
    sender_name: "Sender Kun",
    timestamp_ms: 1638598670815,
    content: "Testing testing"
  };
  const rawMessageOne: rawMessage = {
    sender_name: "Sender San",
    timestamp_ms: 1638598592802,
    content: ""
  };
  const rawMessageThree: rawMessage = {
    sender_name: "Sender Chi",
    timestamp_ms: 1601889740000,
    content: "Test success?"
  };

  const messages = [new Message(rawMessageOne), new Message(rawMessageTwo), new Message(rawMessageThree)];

  test("getMessageCountPerHour function", () => {
    expect(getMessageCountPerHour(messages)).toEqual([
      {name: 0, count: 0}, {name: 1, count: 0}, {name: 2, count: 0}, {name: 3, count: 0},
      {name: 4, count: 0}, {name: 5, count: 0}, {name: 6, count: 0}, {name: 7, count: 0},
      {name: 8, count: 0}, {name: 9, count: 0}, {name: 10, count: 0}, {name: 11, count: 0}, 
      {name: 12, count: 0}, {name: 13, count: 0}, {name: 14, count: 2}, {name: 15, count: 0},
      {name: 16, count: 0}, {name: 17, count: 1}, {name: 18, count: 0}, {name: 19, count: 0},
      {name: 20, count: 0}, {name: 21, count: 0}, {name: 22, count: 0}, {name: 23, count: 0},
    ]);
  });

  test("getMessageCountPerYear function", () => {
    expect(getMessageCountPerYear(messages)).toEqual([{name: 2020, count: 1}, {name: 2021, count: 2}]);
  });
})