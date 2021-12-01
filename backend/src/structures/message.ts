/**
 * Structure to store how many times a word occurs.
 */
export type wordCountObject = {
  /** The word that occurs */
  word: string,
  /** The number the word occurs */
  count: number
};


/**
 * Structure to store how many messages are sent per hour/
 */
export type messagesPerHourObject = {
  hour: number,
  count: number
}


/**
 * Get the number of words from a string.
 * @param string A string
 * @returns The number of words from a string
 */
export const getStringWordCount = (string: string) => {
  return string.split(" ")?.length || 0;
}


/**
 * Get the total number of words from an array of strings. 
 * @param array An array of string
 * @returns The total number of words from an array of string
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
 * @returns An array of word count object in increasing count order
 */
export const getStringWordOccurences = (string: string) => {
  const occurences: wordCountObject[] = [];
  const words = string.split(" ");
  for (let word of words) {
    const reference = occurences.find(occurence => occurence.word == word);
    (!reference) ? occurences.push({word, count: 1}) : reference.count = reference.count + 1;
  }
  return occurences.sort((a, b) => b.count - a.count);
}


/**
 * Merge two arrays of word count object. Combine the counts of words present in both array.
 * It is suggested to put the bigger array as `target` and the `smaller` as selected.
 * This function loops through the selected array and finds a similar object inside target array.
 * @param target An array of word count object
 * @param selected An array of word count object
 * @returns A merged array of two word count object in increasing count order
 */
export const mergeWordOccurences = (target: wordCountObject[], selected: wordCountObject[]) => {
  for (let occurence of selected) {
    const reference = target.find(element => element.word == occurence.word)!;
    (!reference) ? target.push(occurence) : reference.count = reference.count + occurence.count;
  }
  return target.sort((a, b) => b.count - a.count);
}


/**
 * Get a list of words that occur on a string on an array and how many times it occurs.
 * @param array An array
 * @returns An array of word count object in increasing count order
 */
export const getArrayWordOccurences = (array: Array<string>) => {
  const occurences: wordCountObject[] = [];
  for (let occurence of array) {
    mergeWordOccurences(getStringWordOccurences(occurence), occurences);
  }
  return occurences.sort((a, b) => b.count - a.count);
}


/**
 * Get a list of hours(0 - 24) and the number of messages sent that hour.
 * @param messages An array of messages
 * @returns An array of messages per hour object in increasing hour order
 */
export const getMessageCountPerHour = (messages: Array<Message>) => {
  const list: messagesPerHourObject[] = [];
  for (let message of messages) {
    const reference = list.find(hourObject => hourObject.hour == message.hour);
    (!reference) ? list.push({hour: message.hour, count: 1}) : reference.count = reference.count + 1;
  }
  return list.sort((a, b) => b.hour - a.hour);
}


/**
 * Message object from json file.
 * 
 * @remarks
 * Only used elements from object is type documented.
 */
export type RawMessage = {
  /** The name of the sender */
  sender_name: string,
  /** The time the message was sent */
  timestamp_ms: number,
  /** The content of the message */
  content: string
}


/**
 * Message structure. 
 * Generated from raw message for more accessible properties.
 */
export class Message {
  /** The name of the sender */
  readonly sender: string;
  /** The date the message was sent */
  readonly date: Date;
  /** The year the message was sent */
  readonly year: number;
  /** The hour the message was sent */
  readonly hour: number;
  /** The content of the message */
  readonly content: string;
  /**
   * @param message The raw message
   */
  constructor(message: RawMessage) {
    this.sender = message.sender_name;
    this.date = new Date(message.timestamp_ms);
    this.year = this.date.getFullYear();
    this.hour = this.date.getHours();
    this.content = message.content;
  }
}


/**
 * Group of messages.
 * Used to gather statistics from a group of messages.
 */
export class Messages {
  /** Messages managed by this structure */
  readonly messages: Message[];
  /** Number of messages managed by this structure */
  readonly count: number;
  /** Total number of words from all messages managed by this structure */
  readonly wordCount: number;
  /** An array of words and their total number of occurences */
  readonly wordOccurences: wordCountObject[];
  /** An array of hours(0 - 24) and the number of messages sent that hour */
  readonly messageCountPerHour: messagesPerHourObject[];
  /**
   * @param messages Group of messages to manage
   */
  constructor(messages: Message[]) {
    this.messages = messages;
    this.count = messages.length;
    this.wordCount = getArrayWordCount(messages.map(message => message.content));
    this.wordOccurences = getArrayWordOccurences(messages.map(message => message.content));
    this.messageCountPerHour = getMessageCountPerHour(messages);
  }
  /**
   * Get a new group of messages filtered by sender
   * @param name The name of sender
   * @returns Messages
   */
  filterSender(name: string) {
    return new Messages(this.messages.filter(message => message.sender == name));
  }
}