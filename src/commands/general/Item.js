const patron = require('patron.js');
const ItemService = require('../../services/ItemService.js');

class Item extends patron.Command {
  constructor() {
    super({
      names: ['item', 'weapon'],
      groupName: 'general',
      description: 'Search for an item\'s information.',
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: 'old rod',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    let description = '';

    for (const key in args.item) {
      if (args.item[key]) {
        switch (key) {
          case 'price':
            description += '**Price:** ' + args.item[key].USD() + '\n';
            break;
          case 'names':
            break;
          case 'bait':
            break;
          case 'description':
            description += '**Description:** ' + args.item[key] + '\n';
            break;
          default:
            description += '**' + key.capitalizeWords() + ':** ' + args.item[key].toString().capitalizeWords() + '\n';
        }
      }
    }

    return msg.channel.createMessage(description, { title: ItemService.capitializeWords(args.item.names[0]) });
  }
}

module.exports = new Item();
