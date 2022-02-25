/**
 * Message object from json file.
 * 
 * @remarks
 * Only used elements from object is type documented.
 */
export type rawMessage = {
  /** 
   * The name of the sender 
   */
  sender_name: string,
  /** 
   * The time the message was sent 
   */
  timestamp_ms: number,
  /** 
   * The content of the message 
   */
  content?: string
}

/** 
 * The participant object from json file.
 */
export type rawParticipant = {
  /** 
   * The name of the participant 
   */
  name: string
}

/**
 * The channel object from json file.
 * 
 * @remarks
 * Only used elements from object is type documented.
 */
 export type rawChannel = {
  /**
   * The name of the channel
   */
  title: string,
  /**
   * The type of the channel
   */
  thread_type: "Regular" | "RegularGroup",
  /**
   * The participants of the channel
   */
  participants: rawParticipant[],
  /**
   * All messages sent in the channel
   */
  messages: rawMessage[]
}