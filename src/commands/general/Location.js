const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');

class Location extends patron.Command {
  constructor() {
    super({
      names: ['location'],
      groupName: 'general',
      description: 'Go to a location.',
      args: [
        new patron.Argument({
          name: 'location',
          key: 'location',
          type: 'string',
          example: 'Stream',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const locations = Constants.config.locations;
    const location = args.location.lowerString().capitalizeWords();

    if (args.location.lowerString() === 'store') {
      args.location = 'fishing store';
    }

    if (!locations.includes(location)) {
      return msg.createErrorReply('this is not a fishing location.');
    }

    await msg.client.db.userRepo.updateUser(msg.author.id, msg.guild.id, { $set: { 'location': location } });
    return msg.createReply('you\'ve successfully gone to the ' + location);
  }
}

module.exports = new Location();
