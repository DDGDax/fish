const patron = require('patron.js');
const items = require('../../data/items.json');
const ItemService = require('../../services/ItemService.js');

class Store extends patron.Command {
  constructor() {
    super({
      names: ['store'],
      groupName: 'general',
      description: 'Display\'s the purchasable items within the shop.'
    });
  }

  async run(msg) {
    const rods = items.filter(x => x.bait);
    let reply = '';

    for (let i = 0; i < rods.length; i++) {
      reply += '**' + ItemService.capitializeWords(rods[i].names[0]) + ':** ' + (msg.dbUser.rods[rods[i].names[0]] > 0 ? 'Purchased' : rods[i].bait + ' Bait') + '\n';
    }

    return msg.channel.createMessage(reply, { title: 'Purchasable Items' });
  }
}

module.exports = new Store();
