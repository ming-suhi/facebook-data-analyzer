import { rawMessage } from "./raw";
import { countObject, mergeCountObjectArrays } from "./count";

/**
 * Get the number of words from a string.
 * @param string A string
 */
export const getStringWordCount = (string: string) => {
  return string.split(" ")?.length || 0;
}


/**
 * Get the total number of words from an array of strings. 
 * @param array An array of string
 */
export const getArrayWordCount = (array: Array<string>) => {
  var count = 0;
  for (let string of array) {
    count = count + getStringWordCount(string);
  }
  return count;
}


/**
 * Get a list of words that occur on a string and how many times it occurs.
 * @param string A string
 */
export const getStringWordOccurences = (string: string) => {
  const occurences: countObject<string>[] = [];
  const words = string.split(" ");
  for (let word of words) {
    const reference = occurences.find(occurence => occurence.name == word);
    (!reference) ? occurences.push({name: word, count: 1}) : reference.count = reference.count + 1;
  }
  return occurences.sort((a, b) => b.count - a.count);
}


/**
 * Get a list of words that occur on a string on an array and how many times it occurs.
 * @param array An array
 */
export const getArrayWordOccurences = (array: string[]) => {
  const occurences: countObject<string>[] = [];
  for (let occurence of array) {
    mergeCountObjectArrays(occurences, getStringWordOccurences(occurence));
  }
  return occurences.sort((a, b) => b.count - a.count);
}


/**
 * Message structure. 
 * Generated from raw message for more accessible properties.
 */
export class Message {
  /** 
   * The name of the sender 
   */
  readonly sender: string;
  /** 
   * The date the message was sent 
   */
  readonly date: Date;
  /** 
   * The year the message was sent 
   */
  readonly year: number;
  /** 
   * The hour the message was sent 
   */
  readonly hour: number;
  /** 
   * The content of the message 
   */
  readonly content: string;
  /**
   * @param message The raw message
   */
  constructor(message: rawMessage) {
    this.sender = message.sender_name;
    this.date = new Date(message.timestamp_ms);
    this.year = this.date.getFullYear();
    this.hour = this.date.getHours();
    this.content = message.content || "";
  }
}


/**
 * Convert an array of raw messages to an array of messages
 * @param rawMessages An array of raw messages
 */
 export const convertRawMessages = (rawMessages: rawMessage[]) => {
  return rawMessages.map(rawMessage => new Message(rawMessage));
}


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
  return hours.sort((a, b) => b.name - a.name);
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
  return years.sort((a, b) => b.name - a.name);
}


/**
 * Group of messages.
 * Used to gather statistics from a group of messages.
 */
export class Messages {
  /** 
   * Messages managed by this structure 
   */
  readonly messages: Message[];
  /** 
   * Number of messages managed by this structure 
   */
  readonly count: number;
  /** 
   * Total number of words from all messages managed by this structure 
   */
  readonly wordCount: number;
  /** 
   * An array of hours(0 - 24) and the number of messages sent that hour 
   */
  readonly messageCountPerHour: countObject<number>[];
  /** 
   * An array of years and the number of messages sent that year 
   */
  readonly messageCountPerYear: countObject<number>[];
  /**
   * @param messages Group of messages to manage
   */
  constructor(messages: Message[]) {
    this.messages = messages;
    this.count = messages.length;
    this.wordCount = getArrayWordCount(messages.map(message => message.content));
    this.messageCountPerHour = getMessageCountPerHour(messages);
    this.messageCountPerYear = getMessageCountPerYear(messages);
  }
  /**
   * An array of all words sent and how many times it was use
   */
  get wordOccurences() {
    return getArrayWordOccurences(this.messages.map(message => message.content));
  }
  /**
  * Get a new group of messages filtered by sender
  * @param name The name of sender
  */
  filterBySender(name: string) {
    return new Messages(this.messages.filter(message => message.sender == name));
  }
}