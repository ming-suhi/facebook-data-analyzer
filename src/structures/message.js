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