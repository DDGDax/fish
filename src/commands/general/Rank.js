const patron = require('patron.js');
const items = require('../../data/items.json');

class Rank extends patron.Command {
  constructor() {
    super({
      names: ['rank'],
      groupName: 'general',
      description: 'View the rank of anyone.',
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
    const dbUser = msg.author.id === args.member.id ? msg.dbUser : await msg.client.db.userRepo.getUser(args.member.id, msg.guild.id);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return msg.channel.createMessage('**Rank:** ' + dbUser.rank + '\n**Bait:** ' + dbUser.bait + '\n**Prestige:** ' + dbUser.prestige + '\n**Fish:** ' + (Object.values(dbUser.fish).length > 0 ? Object.values(dbUser.fish).reduce(reducer) : '0') + '\n**Location:** ' + dbUser.location, { title: args.member.user.tag + '\'s Rank'});
  }
}

module.exports = new Rank();
