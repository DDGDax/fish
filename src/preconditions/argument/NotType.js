const patron = require('patron.js');

class NotType extends patron.ArgumentPrecondition {
  constructor() {
    super({
      name: 'nottype'
    });
  }

  async run(command, msg, argument, args, value, options) {
    if (options.types.includes(value.type)) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'this is not a correct item.');
  }
}

module.exports = new NotType();
