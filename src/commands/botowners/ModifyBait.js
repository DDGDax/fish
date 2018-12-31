const patron = require('patron.js');
const NumberUtil = require('../../utility/NumberUtil.js');

class ModifyBait extends patron.Command {
  constructor() {
    super({
      names: ['modifybait', 'modbait'],
      groupName: 'botowners',
      description: 'Allows you to modify the bait of any member.',
      args: [
        new patron.Argument({
          name: 'amount',
          key: 'amount',
          type: 'quantity',
          example: '500'
        }),
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          defaultValue: patron.ArgumentDefault.Member,
          example: 'Supa Hot Fire#0911',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const newDbUser = await msg.client.db.userRepo.modifyBait(msg, args.member, args.amount);

    return msg.createReply('you have successfully modifed ' + (args.member.id === msg.author.id ? 'your' : args.member.user.tag.boldify() + '\'s') + ' bait to ' + newDbUser.bait + '.');
  }
}

module.exports = new ModifyBait();
