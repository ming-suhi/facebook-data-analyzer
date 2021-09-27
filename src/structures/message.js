// Structure to group messages
class Messages {

  constructor(messages) {

    // Messages
    this.messages = [];

    // Loop through messages json
    for(let message of messages) {

      // Create message from json
      this.messages.push(new Message(message));
    }
  }


  // Get messages sent by unique name
  filterSender(name) {
    return new Messages(this.messages.filter(message => message.sender == name));
  }


  // Get the no of messages 
  get count() {
    return this.messages.length;
  }


  // Get the no of words
  get wordCount() {

    // Declare variable for counter
    var count = 0;

    // Loop through messages
    for(let message of this.messages) {

      // Add word
      count = count + (message.content?.split(" ")?.length || 0);
    }

    // Return count
    return count;
  }


  // Get word occurences
  get wordOccurences() {

    // Declare variable for one big message
    var combinedContent = "";

    // Loop through messages
    for(let message of this.messages) {
      
      // Add message content
      combinedContent = combinedContent + " " + message.content?.toLowerCase();
    }

    // Identify words
    const pattern = /\w+/g
    const matchedWords = combinedContent.match(pattern) || [];

    // Declare variable to store occurences
    const occurences = [];

    // Loop through matched words
    for(let word of matchedWords) {

      // Get reference from stats
      const reference = occurences.find(occurence => occurence.name == word);

      // Create object if does not exits and increment if exist
      (!reference) ? occurences.push({name: word, count: 1}) : reference.count = reference.count + 1;
    }

    // Return occurences
    return occurences.sort((a, b) => b.count - a.count);
  }
}


// Structure for messages
class Message {

  constructor(message) {

    // The name of the author
    this.sender = message.sender_name;

    // The content of the message
    this.content = message.content;
  }
}


module.exports = { Messages, Message };