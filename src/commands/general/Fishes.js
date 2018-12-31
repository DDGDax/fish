const patron = require('patron.js');
const ItemService = require('../../services/ItemService.js');

class Fishes extends patron.Command {
  constructor() {
    super({
      names: ['fishes'],
      groupName: 'general',
      description: 'See your fish.',
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

    for (const key in dbUser.fish) {
      description += dbUser.fish[key] ? ItemService.capitializeWords(key) + ': ' + dbUser.fish[key] + '\n' : '';
    }

    if (String.isNullOrWhiteSpace(description)) {
      return msg.channel.createErrorMessage(args.member.user.tag.boldify() + ' has no fish.');
    }

    return msg.channel.createMessage(description, { title: args.member.user.tag + '\'s Fish:' });
  }
}

module.exports = new Fishes();
