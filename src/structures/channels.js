const { Folder } = require('./file-system');
const { Messages } = require('./message');


// Structure for inbox
class Inbox extends Folder {

  constructor(path) {

    // Path to inbox folder
    super(path);
  }


  // Get all channels
  get channels() {

    // Declare variable to store channels
    const channels = [];

    // Loop through folders
    for(let folder of this.folders) {

      // Create channel instance from folder
      channels.push(new Channel(folder));
    }

    // Return channels
    return channels;
  }


  // Get all direct channels
  get directChannels() {
    return this.channels.filter(channel => channel.type == "Regular");
  }


  // Get all group channels
  get groupChannels() {
    return this.channels.filter(channel => channel.type == "RegularGroup");
  }


  // Get a specific channel by name
  getChannel(name) {
    return this.channels.find(channel => channel.name == name);
  }
}


// Structure for participant
class Participant {

  constructor(name, channel) {

    // Name of participant
    this.name = name;

    // All messages sent by the participant in the channel
    this.messages = channel.messages.filterSender(name);
  }
}


// Structure for channel
class Channel {

  constructor(folder) {

    // Channel folder
    this.folder = folder;
  }


  // Combine all files to a single object
  get data() {

    // First file
    const meta = this.folder.files[0]

    // Declare variable to store data
    var data = {
      name: meta.title,
      type: meta.thread_type,
      participants: meta.participants.map(participant=>participant.name),
      messages: []
    };

    // Loop through files
    for(let file of this.folder.files) {

      // Add to data
      data.messages.push(...file.messages)
    }

    // Return data
    return data;
  }


  // Get channel type
  get type() {
    return this.data.type;
  }


  // Get channel name
  get name() {
    return this.data.name;
  }


  // Get channel participants
  get participants() {
    
    // Declare variable to store data
    var participants = [];

    // Loop through participants
    for(let participant of this.data.participants) {

      // Create participant objects
      participants.push(new Participant(participant, this));
    } 

    // Return participants
    return participants;
  }


  // Get all messages
  get messages() {
    return new Messages(this.data.messages);
  }


  // Get a participant by name
  getParticipant(name) {
    return this.participants.find(participant => participant.name == name);
  }
}


module.exports = Inbox;