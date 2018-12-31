const patron = require('patron.js');

class NotItem extends patron.ArgumentPrecondition {
  constructor() {
    super({
      name: 'donthave'
    });
  }

  async run(command, msg, argument, args, value) {
    if (!msg.dbUser.rods[value.names[0]] || msg.dbUser.rods[value.names[0]] <= 0) {
      return patron.PreconditionResult.fromError(command, 'you don\'t have this rod.');
    }

    if (value.type === 'rod') {
      if (msg.dbUser.bait <= 0) {
        return patron.PreconditionResult.fromError(command, 'you have no bait to fish with.');
      }
    }

    return patron.PreconditionResult.fromSuccess();
  }
}

module.exports = new NotItem();
