const patron = require('patron.js');
const ItemService = require('../../services/ItemService.js');
const items = require('../../data/items.json');

class Fish extends patron.Command {
  constructor() {
    super({
      names: ['fish'],
      groupName: 'general',
      description: 'Go fishing.',
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: 'old rod',
          preconditionOptions: [{ types: ['rod'] }],
          preconditions: ['nottype', 'donthave'],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    if (msg.dbUser.location === 'Fishing Store') {
      return msg.createErrorReply('you cannot fish in this location.');
    } else if (items.find(x => x.type === 'fish' && x.location.lowerString() === msg.dbUser.location.lowerString()) === undefined) {
      return msg.createErrorReply('there are no fish in this location.');
    }

    const caught = await ItemService.fish(args.item, msg.dbUser, items);
    let reply = '';

    if (caught) {
      const gained = 'fish.' + caught.names[0];
      await msg.client.db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [gained]: 1 } });

      reply = 'you\'ve successfully caught a fish! You have fished up a ' + ItemService.capitializeWords(caught.names[0]) + '.';
    } else {
      reply = 'you almost had him! Your fishing line snapped and the fish got away.';
    }

    if (args.item.type === 'rod') {
      await msg.client.db.userRepo.modifyBait(msg, msg.member, -1)
    }

    return msg.createReply(reply);
  }
}

module.exports = new Fish();
