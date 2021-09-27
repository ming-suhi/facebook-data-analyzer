const dotenv = require('dotenv');
const { resolve } = require("path");
const Inbox = require('./structures/channels.js');

// Setup environment variables
dotenv.config();


// Main structure to interact with data
class Client {

  constructor() {

    // Get user full name to be used to filter messages
    const profile = require(resolve(process.env.CATALOG_DIRECTORY, 'profile_information/profile_information.json'));
    this.name = profile[Object.keys(profile)[0]].name.full_name;

    // Create inbox instance
    this.inbox = new Inbox(resolve(process.env.CATALOG_DIRECTORY, 'messages/inbox'));
  }


  // Get how many messages you have encountered, including ones you've sent
  get messagesEncountered() {

    // Declare variable for counter
    var count = 0;

    // Loop through channels
    for(let channel of this.inbox.channels) {

      // Add messages count to counter
      count = count + channel.messages?.count;
    }

    return count
  }

  
  // Get how many messages you have sent
  get messagesSent() {

    // Declare variable for counter
    var count = 0;

    // Loop through channels
    for(let channel of this.inbox.channels) {

      // Add messages count to counter
      count = count + (channel.getParticipant(this.name)?.messages?.count || 0);
    }

    // Return count
    return count;
  }


  // Get how many messages you have received
  get messagesReceived() {

    // Return difference of encountered messages and sent messages
    return this.messagesEncountered - this.messagesSent;
  }


  // Return channels ranked by total messages
  get channelsRankedByTotalMessages() {

    // Declare variable to store channels
    var channels = [];

    // Loop through channels
    for(let channel of this.inbox.channels) {

      // Add object to channels
      channels.push({name: channel.name, count: channel.messages.count});
    }

    // Rank channels by count
    var channelsRanked = channels.sort((a, b) => b.count - a.count);

    // Return channels
    return channelsRanked;
  }


  // Return channels ranked by your sent messages
  get channelsRankedByYourSentMessages() {

    // Declare variable to store channels
    var channels = [];

    // Loop through channels
    for(let channel of this.inbox.channels) {

      // Add object to channels
      channels.push({name: channel.name, count: channel.getParticipant(this.name)?.messages?.count || 0});
    }

    // Rank channels by count
    var channelsRanked = channels.sort((a, b) => b.count - a.count);

    // Return channels
    return channelsRanked;
  }
}

module.exports = Client;