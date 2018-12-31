const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const items = require('../../data/items.json');

class Locations extends patron.Command {
  constructor() {
    super({
      names: ['locations'],
      groupName: 'general',
      description: 'View the locations where you can go.'
    });
  }

  async run(msg, args) {
    const locations = Constants.config.locations;
    let reply = '';

    for (let i = 0; i < locations.length; i++) {
      const food = items.filter(x => x.type === 'fish' && x.location.lowerString() === locations[i].lowerString());
      
      if (food.length > 0) {
        let fish = '';

        for (let i = 0; i < food.length; i++) {
          fish += food[i].names[0].capitalizeWords() + ', ';
        }

        reply += locations[i].boldify() + ': ' + fish.substring(0, fish.length - 2) + '\n'; 
      } else {
        reply += locations[i].boldify() + ': ' + 'N/A\n';
      }
    }

    return msg.channel.createMessage(reply, { title: 'Locations'});
  }
}

module.exports = new Locations();
