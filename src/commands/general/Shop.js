const patron = require('patron.js');
const NumberUtil = require('../../utility/NumberUtil.js');

class Shop extends patron.Command {
  constructor() {
    super({
      names: ['shop', 'buy'],
      groupName: 'general',
      description: 'Buy a rod.',
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: '"basic rod"',
          preconditionOptions: [{ types: ['rod'] }],
          preconditions: ['nottype'],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const item = 'rods.' + args.item.names[0];

    if (msg.dbUser.bait < args.item.bait) {
      return msg.createErrorReply('you don\'t have enough bait to buy ' + args.item.names[0] + ', it costs ' + args.item.bait + ' Bait.');
    } else if (msg.dbUser.rods[args.item.names[0]] > 0) {
      return msg.createErrorReply('you already have this rod.');
    } else if (msg.dbUser.location !== "Fishing Store") {
      return msg.createErrorReply('you must be inside the shop to buy.');
    }

    await msg.client.db.userRepo.updateUser(msg.author.id, msg.guild.id, { $set: { [item]: 1 } });
    await msg.client.db.userRepo.modifyBait(msg, msg.member, -args.item.bait);

    return msg.createReply('you have successfully purchased a ' + args.item.names[0].lowerString().capitalizeWords() + '.');
  }
}

module.exports = new Shop();
