const dotenv = require('dotenv');
const { resolve } = require("path");
const Inbox = require('./structures/channels.js');

// Setup environment variables
dotenv.config();


// Main structure to interact with data
class Client {

  constructor() {

    // Get user full name to be used to filter messages
    var profile = require(resolve(process.env.CATALOG_DIRECTORY, 'profile_information/profile_information.json'));
    var profile = profile[Object.keys(profile)[0]];
    this.name = profile.name.full_name;
    this.createdOn = new Date(profile.registration_timestamp).toDateString();

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


  // Get how many words you have sent
  get wordsSent() {

    // Declare variable for counter
    var count = 0;

    // Loop through channels
    for(let channel of this.inbox.channels) {
      
      // Add messages count to counter
      count = count + (channel.getParticipant(this.name)?.messages?.wordCount || 0);
    }

    // Return count
    return count;
  }


  // Get how many messages you have received
  get messagesReceived() {

    // Return difference of encountered messages and sent messages
    return this.messagesEncountered - this.messagesSent;
  }
  

  // Get word occurences
  get yourWordOccurences() {

    // Declare variable for building
    var occurences = [];

    // Loop through channels
    for(let channel of this.inbox.channels) {

      // Loop through channel word occurences
      for(let element of channel.getParticipant(this.name)?.messages?.wordOccurences || []) {

        // Get reference from occurences
      const reference = occurences.find(occurence => occurence.name == element.name);

      // Create object if does not exits and increment if exist
      (!reference) ? occurences.push({name: element.name, count: 1}) : reference.count = reference.count + 1;
      }
    }

    // Return occurences
    return occurences.sort((a, b) => b.count - a.count).slice(0, 100);
  }


  get yourFavoriteHours() {

    // Declare variable for building
    const occurences = [
      {name: 0, count: 0},
      {name: 1, count: 0},
      {name: 2, count: 0},
      {name: 3, count: 0},
      {name: 4, count: 0},
      {name: 5, count: 0},
      {name: 6, count: 0},
      {name: 7, count: 0},
      {name: 8, count: 0},
      {name: 9, count: 0},
      {name: 10, count: 0},
      {name: 11, count: 0},
      {name: 12, count: 0},
      {name: 13, count: 0},
      {name: 14, count: 0},
      {name: 15, count: 0},
      {name: 16, count: 0},
      {name: 17, count: 0},
      {name: 18, count: 0},
      {name: 19, count: 0},
      {name: 20, count: 0},
      {name: 21, count: 0},
      {name: 22, count: 0},
      {name: 23, count: 0},
    ];

    // Loop through channels
    for(let channel of this.inbox.channels) {
  
      // Loop through messages
      for(let message of channel.getParticipant(this.name)?.messages?.messages || []) {

        // Get reference from stats
        const reference = occurences.find(occurence => occurence.name == message.hour);

        // Increment reference
        reference.count = reference.count + 1;
      }
    }

    // Return occurences
    return occurences;
  }


  get yourMessagesPerYear() {

    // Declare variable for building
    var occurences = [];

    // Loop through channels
    for(let channel of this.inbox.channels) {
  
      // Loop through messages
      for(let message of channel.getParticipant(this.name)?.messages?.messages || []) {

        // Get reference from stats
        const reference = occurences.find(occurence => occurence.name == message.year);

        // Create object if does not exits and increment if exist
        (!reference) ? occurences.push({name: message.year, count: 1}) : reference.count = reference.count + 1;
      }
    }

    // Return occurences
    return occurences.sort((a, b) => b.count - a.count);
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