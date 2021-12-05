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
    expect(getMessageCountPerHour(messages)).toEqual([{name: 14, count: 2}, {name: 17, count: 1}]);
  });

  test("getMessageCountPerYear function", () => {
    expect(getMessageCountPerYear(messages)).toEqual([{name: 2020, count: 1}, {name: 2021, count: 2}]);
  });
})