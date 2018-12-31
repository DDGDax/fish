const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');

class Ranks2 extends patron.Command {
  constructor() {
    super({
      names: ['ranks2'],
      groupName: 'general',
      description: 'View all ranks abilities.'
    });
  }

  async run(msg) {
    let reply = '';

    for (const key in Constants.config.rankUpgrades) {
      reply += '**' + key + ':** +' + Constants.config.rankUpgrades[key] + '% accuracy\n';
    }
    return msg.channel.createMessage(reply, { title: 'Ranks' });
  }
}

module.exports = new Ranks2();
