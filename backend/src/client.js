const dotenv = require('dotenv');
const { resolve } = require("path");
const Inbox = require('./structures/channels.js');
const { hoursOccurenceTemplate } = require('./structures/templates.js');

// Setup environment variables
dotenv.config();


// Main structure to interact with data
class Client {

  constructor() {

    // Get user full name to be used to filter messages
    var profile = require(resolve(process.env.CATALOG_DIRECTORY, 'profile_information/profile_information.json'));
    var profile = profile[Object.keys(profile)[0]];
    this.name = profile.name.full_name;

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
  get wordsOccurences() {

    // Declare variable for building
    var occurences = [];

    // Loop through channels
    for(let channel of this.inbox.channels) {

      // Loop through channel word occurences
      for(let element of channel.getParticipant(this.name)?.messages?.wordOccurences || []) {

        // Get reference from occurences
        const reference = occurences.find(occurence => occurence.name == element.name);

        // Create object if does not exists, increment if exist
        (!reference) ? occurences.push({name: element.name, count: 1}) : reference.count = reference.count + 1;
      }
    }

    // Return occurences
    return occurences.sort((a, b) => b.count - a.count).slice(0, 100);
  }


  get messagesSentPerHour() {

    // Declare variable for building
    const occurences = new hoursOccurenceTemplate();

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


  get messagesSentPerYear() {

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
    return occurences.sort((a, b) => b.name - a.name);
  }


  // Return channels by total messages
  get channelsByTotalMessages() {

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


  // Return channels by your sent messages
  get channelsByYourSentMessages() {

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