const patron = require('patron.js');
const ItemService = require('../../services/ItemService.js');

class Treasure extends patron.Command {
  constructor() {
    super({
      names: ['treasure', 'display'],
      groupName: 'general',
      description: 'See your treasure.',
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          defaultValue: patron.ArgumentDefault.Member,
          example: 'Blast It Baby#6969',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const dbUser = await msg.client.db.userRepo.getUser(args.member.id, msg.guild.id);

    let description = '';

    for (const key in dbUser.treasure) {
      description += dbUser.treasure[key] ? ItemService.capitializeWords(key) + ': ' + dbUser.treasure[key] + '\n' : '';
    }

    if (String.isNullOrWhiteSpace(description)) {
      return msg.channel.createErrorMessage(args.member.user.tag.boldify() + ' has no treasure.');
    }

    return msg.channel.createMessage(description, { title: args.member.user.tag + '\'s Treasure:' });
  }
}

module.exports = new Treasure();
