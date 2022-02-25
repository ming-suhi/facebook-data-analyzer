import { countObject } from "./statistics";
import Message from "../structures/message";

/**
 * Get a list of hours(0 - 24) and the number of messages sent that hour.
 * @param messages An array of messages
 */
export const getMessageCountPerHour = (messages: Message[]) => {
  const hours: countObject<number>[] = [
    {name: 0, count: 0}, {name: 1, count: 0}, {name: 2, count: 0}, {name: 3, count: 0},
    {name: 4, count: 0}, {name: 5, count: 0}, {name: 6, count: 0}, {name: 7, count: 0},
    {name: 8, count: 0}, {name: 9, count: 0}, {name: 10, count: 0}, {name: 11, count: 0}, 
    {name: 12, count: 0}, {name: 13, count: 0}, {name: 14, count: 0}, {name: 15, count: 0},
    {name: 16, count: 0}, {name: 17, count: 0}, {name: 18, count: 0}, {name: 19, count: 0},
    {name: 20, count: 0}, {name: 21, count: 0}, {name: 22, count: 0}, {name: 23, count: 0},
  ];
  for (let message of messages) {
    const reference = hours.find(hour => hour.name == message.hour)!;
    reference.count = reference.count + 1;
  }
  return hours;
}

/**
 * Get a list of years and the number of messages sent that year.
 * @param messages An array of messages
 */
export const getMessageCountPerYear = (messages: Message[]) => {
  const years: countObject<number>[] = [];
  for (let message of messages) {
    const reference = years.find(year => year.name == message.year);
    (!reference) ? years.push({name: message.year, count: 1}) : reference.count = reference.count + 1;
  }
  return years.sort((a, b) => a.name - b.name);
}