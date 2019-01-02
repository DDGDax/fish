const Random = require('../utility/Random.js');
const Constants = require('../utility/Constants.js');

class ItemService {
  fish(itemName, accuracy, dbUser, items) {
    const roll = Random.roll();
    const food = items.filter(x => x.type === 'fish' && x.location.lowerString() === dbUser.location.lowerString()).filter(x => x.acquire_odds);
    const bait = items.filter(x => x.type === 'bait').filter(x => x.acquire_odds);
    const treasure = items.filter(x => x.type === 'treasure').filter(x => x.acquire_odds);
    let allLoot = food;

    if (itemName.lowerString() !== 'net') {
      allLoot = food.concat(bait);
      allLoot = allLoot.concat(treasure);
    }

    const fullLootOdds = allLoot.map(x => x.acquire_odds).reduce((accumulator, currentValue) => accumulator + currentValue);
    const rollOdds = Random.nextInt(1, fullLootOdds);
    let cumulative = 0;

    if (roll <= accuracy) {
      for (let i = 0; i < allLoot.length; i++) {
        const fish = allLoot[i];
        cumulative += fish.acquire_odds;
        if (rollOdds <= cumulative) {
          return fish;
        }
      }
    }
  }

  rankItem(accuracy, dbUser) {
    let increase = accuracy;
    let newRank = '';

    for (const key in Constants.config.ranks) {
      if (dbUser.prestige >= Constants.config.ranks[key]) {
        newRank = key;
      }
    }

    increase += Constants.config.rankUpgrades[newRank];

    increase > 100 ? increase = 100 : '';

    return Math.round(increase);
  }

  capitializeWords(str) {
    if (isNaN(str)) {
      return str.replace('_', ' ').replace(Constants.data.regexes.capitalize, x => x.charAt(0).toUpperCase() + x.substr(1));
    }

    return str;
  }
}

module.exports = new ItemService();
