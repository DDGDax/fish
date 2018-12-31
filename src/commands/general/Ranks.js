const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');

class Ranks extends patron.Command {
  constructor() {
    super({
      names: ['ranks'],
      groupName: 'general',
      description: 'View all ranks.'
    });
  }

  async run(msg) {
    let reply = '';

    for (const key in Constants.config.ranks) {
      reply += '**' + key + ':** ' + Constants.config.ranks[key] + ' Prestige\n';
    }
    return msg.channel.createMessage(reply, { title: 'Ranks', footer: { text: 'To see ranks abilities use command ?ranks2' }});
  }
}

module.exports = new Ranks();
