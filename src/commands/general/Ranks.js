const patron = require('patron.js');

class Ranks extends patron.Command {
  constructor() {
    super({
      names: ['ranks'],
      groupName: 'general',
      description: 'View all ranks.'
    });
  }

  async run(msg) {
    return msg.channel.createMessage('**Beginner:** 0-20 Prestige\n**Novice:** 21-50 Prestige\n**Expert:** 51-100 Prestige\n**Master:** 100+ Prestige', { title: 'Ranks' });
  }
}

module.exports = new Ranks();
