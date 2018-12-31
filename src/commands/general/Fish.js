const patron = require('patron.js');
const ItemService = require('../../services/ItemService.js');
const items = require('../../data/items.json');
const Random = require('../../utility/Random.js');

class Fish extends patron.Command {
  constructor() {
    super({
      names: ['fish'],
      groupName: 'general',
      description: 'Go fishing.',
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: 'old rod',
          preconditionOptions: [{ types: ['rod'] }],
          preconditions: ['nottype', 'donthave'],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    if (msg.dbUser.location === 'Fishing Store') {
      return msg.createErrorReply('you cannot fish in this location.');
    } else if (items.find(x => x.type === 'fish' && x.location.lowerString() === msg.dbUser.location.lowerString()) === undefined) {
      return msg.createErrorReply('there are no fish in this location.');
    }

    const rankItem = await ItemService.rankItem(args.item, msg.dbUser, items);
    let reply = '';

    if (args.item.names[0] !== 'net') {
      const caught = await ItemService.fish(rankItem, msg.dbUser, items);
  
      if (caught) {
        if (caught.type === 'fish') {
          const gained = 'fish.' + caught.names[0];
          await msg.client.db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [gained]: 1 } });
    
          reply = 'you\'ve successfully caught a fish! You have fished up a ' + ItemService.capitializeWords(caught.names[0]) + '.';
        } else if (caught.type === 'bait') {
          const baitAmount = Random.nextInt(2, 20);
          await msg.client.db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { 'bait': baitAmount }});

          reply = 'you\'ve successfully caught bait! You have fished up ' + baitAmount + ' baits';
        } else {
          const gained = 'treasure.' + caught.names[0];
          await msg.client.db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [gained]: 1 }});

          reply = 'YIKES! YOU CAUGHT SOME TREASURE MY GUY!!! YOU GAINED A ' + caught.names[0].upperString();
        }
      } else {
        reply = 'you almost had him! Your fishing line snapped and the fish got away.';
      }
    } else {
      const caught = await ItemService.fish(rankItem, msg.dbUser, items);
      const caught2 = await ItemService.fish(rankItem, msg.dbUser, items);
  
      if (caught && caught2) {
        const gained = 'fish.' + caught.names[0];
        const gained2 = 'fish.' + caught.names[0];

        await msg.client.db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [gained]: 1 } });
        await msg.client.db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [gained2]: 1 } });
  
        reply = 'you\'ve successfully caught 2 fish! You have fished up a ' + ItemService.capitializeWords(caught.names[0]) + ' and ' + ItemService.capitializeWords(caught2.names[0]) + '.';
      } else {
        reply = 'you almost had them! Your fishing net ripped and the fish got away.';
      }
    }

    if (args.item.type === 'rod') {
      await msg.client.db.userRepo.modifyBait(msg, msg.member, -1)
    }

    return msg.createReply(reply);
  }
}

module.exports = new Fish();
