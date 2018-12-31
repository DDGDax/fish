const Constants = require('../utility/Constants.js');
const items = require('../data/items.json');

class RankService {
  async handle(msg, dbUser) {
    let newRank = '';
    for (const key in Constants.config.ranks) {
      if (msg.dbUser.prestige >= Constants.config.ranks[key]) {
        newRank = key;
      }
    }

    return msg.client.db.userRepo.updateUser(dbUser.userId, dbUser.guildId, { $set: { 'rank': newRank }});
  }

  updatePrestige(msg, dbUser) {
    const fishKeys = Object.keys(dbUser.fish);
    let prestige = 0;

    for (let i = 0; i < fishKeys.length; i++) {
      const fish = items.find(x => x.type === 'fish' && x.names[0] === fishKeys[i]);

      for (let i = 0; i < dbUser.fish[fish.names[0]]; i++) {
        prestige += fish.prestige;
      }
    }

    prestige === undefined ? prestiged = 0 : '';

    return msg.client.db.userRepo.updateUser(dbUser.userId, dbUser.guildId, { $set: { 'prestige': prestige }});
  }
}

module.exports = new RankService();
