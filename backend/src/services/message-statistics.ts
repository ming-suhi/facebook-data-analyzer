import { countObject } from "./statistics";
import Message from "../structures/message";

/**
 * Get a list of hours(0 - 24) and the number of messages sent that hour.
 * @param messages An array of messages
 */
 export const getMessageCountPerHour = (messages: Message[]) => {
  const hours: countObject<number>[] = [];
  for (let message of messages) {
    const reference = hours.find(hour => hour.name == message.hour);
    (!reference) ? hours.push({name: message.hour, count: 1}) : reference.count = reference.count + 1;
  }
  return hours.sort((a, b) => a.name - b.name);
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