import { countObject } from "../services/statistics";
import Message from "./message";
import { getArrayWordOccurences } from "../services/string-statistics";
import { getMessageCountPerHour, getMessageCountPerYear } from "../services/message-statistics";

/**
 * Group of messages.
 * Used to gather statistics from a group of messages.
 */
export default class Messages {
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
    this.wordCount = messages.map(message => message.wordCount).reduce((a, b) => a + b, 0);
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