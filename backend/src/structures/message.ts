import { getStringWordCount } from "../services/string-statistics";
import { rawMessage } from "./raw";

/**
 * Message structure. 
 * Generated from raw message for more accessible properties.
 */
export default class Message {
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
   * The total number of words of the content
   */
  readonly wordCount: number;
  /**
   * @param message The raw message
   */
  constructor(message: rawMessage) {
    this.sender = message.sender_name;
    this.date = new Date(message.timestamp_ms);
    this.year = this.date.getFullYear();
    this.hour = this.date.getHours();
    this.content = message.content || "";
    this.wordCount = getStringWordCount(this.content)
  }
}