import { resolve } from 'path';
import { Inbox } from './channel';
import { countObject, mergeCountObjectArrays } from "../services/statistics";

/**
 * Client object. Represents the user account.
 * Easily navigate through the inbox.
 * Identifies the user account name to distinguish between sent and received messages.
 */
export default class Client {
  /** 
   * Name of user the account data belongs to 
   */
  readonly name: string;
  /** 
   * The inbox of the user 
   */
  readonly inbox: Inbox;
  /** 
   * The total messages; sent and received by the user 
   */
  readonly totalMessages: number;
  /** 
   * The total messages sent by the user 
   */
  readonly messagesSentCount: number;
  /** 
   * The total words sent by the user 
   */
  readonly wordsSentCount: number;
  /** 
   * The total messages sent by the user 
   */
  readonly messagesReceivedCount: number;
  /**
   * The most frequently used words by the user and how many times it was used. 
   * Returned in increasing count order.
   */
  readonly wordsOccurences: countObject<string>[];
  /** 
   * The number of messages sent by the user at a certain hour of the day(0 - 24).
   * An indicator of what time the user is most active at.
   * Returned in ascending hour order.
   */
  readonly messagesSentPerHour: countObject<number>[];
  /**
   * The number of messages sent by the user at a specific year.
   * Returned in ascending year order.
   */
  readonly messagesSentPerYear: countObject<number>[];
  /**
   * The number of messages sent by the user at each channel. 
   * Returned in increasing count order.
   */
  readonly channelsByYourSentMessages: countObject<string>[];
  /**
   * @param catalogDirectory The path to this user's data
   */
  constructor(catalogDirectory: string) {

    var profile = require(resolve(catalogDirectory, 'profile_information/profile_information.json'));
    var profile = profile[Object.keys(profile)[0]];

    this.name = profile.name.full_name;

    this.inbox = new Inbox(resolve(catalogDirectory, 'messages/inbox'));

    const sentMessages = this.inbox.channels.map(channel => channel.getParticipant(this.name).messages).flat();

    this.totalMessages = this.inbox.channels.map(channel => channel.messages.count).reduce((a, b) => a + b, 0);

    this.messagesSentCount = sentMessages.map(messages => messages.count).reduce((a, b) => a + b, 0);

    this.wordsSentCount = sentMessages.map(messages => messages.wordCount).reduce((a, b) => a + b, 0);

    this.messagesReceivedCount = this.totalMessages - this.messagesSentCount;

    this.wordsOccurences = sentMessages.map(messages => messages.wordOccurences).reduce(mergeCountObjectArrays).sort((a, b) => b.count - a.count).slice(0, 100);

    this.messagesSentPerHour = sentMessages.map(messages => messages.messageCountPerHour).reduce(mergeCountObjectArrays).sort((a, b) => a.name - b.name);

    this.messagesSentPerYear = sentMessages.map(messages => messages.messageCountPerYear).reduce(mergeCountObjectArrays).sort((a, b) => b.name - a.name);

    this.channelsByYourSentMessages = this.inbox.channels.map(channel => ({name: channel.name, count: channel.getParticipant(this.name).messages.count})).sort((a, b) => b.count - a.count);
  }
}