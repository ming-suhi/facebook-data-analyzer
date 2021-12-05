import { Folder } from './file-system';
import { rawChannel } from './raw';
import Message from './message';
import Messages from './messages';


/**
 * Represents a channel.
 */
export class Channel {
  /** 
   * The name of the channel 
   */
  readonly name: string;
  /** 
   * The type of the channel 
   */
  readonly type: string;
  /** 
   * The messages sent in the channel 
   */
  readonly messages: Messages;
  /**
   * @param folder The folder that store the channel datas
   */
  constructor(folder: Folder) {
    const files: rawChannel[] = folder.files;
    this.name = files[0].title;
    this.type = files[0].thread_type;
    this.messages = new Messages(files.map((file: rawChannel) => file.messages.map(rawMessage => new Message(rawMessage))).flat());
  }
  /**
   * Get a participant by name
   * @param name The name of the participant
   */
  getParticipant(name: string) {
    return new Participant(name, this.messages.filterBySender(name));
  }
}


/**
 * Represents a participant in a channel.
 * A participant does not necessarily have sent messages.
 */
export class Participant {
  /** 
   * The name of the participant 
   */
  readonly name: string;
  /** 
   * The messages sent by the participant in the channel 
   */
  readonly messages: Messages;
  /**
   * @param name The name of the participant
   * @param channel The channel the participant belongs to
   */
  constructor(name: string, messages: Messages) {
    this.name = name;
    this.messages = messages;
  }
}


/**
 * Represents the inbox.
 * Used to easily navigate through channels.
 */
export class Inbox extends Folder {
  /** 
   * All the channels 
   */
  readonly channels: Channel[];
  /** 
   * All direct messages channels 
   */
  readonly directChannels: Channel[];
  /** 
   * All group channels 
   */
  readonly groupChannels: Channel[];
  /**
   * @param path The path to the folder holding the channel folders
   */
  constructor(path: string) {
    super(path);
    this.channels = this.folders.map(folder => new Channel(folder));
    this.directChannels = this.channels.filter(channel => channel.type == "Regular");
    this.groupChannels = this.channels.filter(channel => channel.type == "RegularGroup");
  }
  /**
   * Get a channel by name
   * @param name The name of the channel
   */
  getChannel(name: string) {
    return this.channels.find(channel => channel.name == name);
  }
}