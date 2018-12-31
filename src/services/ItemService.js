const Random = require('../utility/Random.js');
const Constants = require('../utility/Constants.js');

class ItemService {
  fish(weapon, dbUser, items) {
    const roll = Random.roll();
    const food = items.filter(x => x.type === 'fish' && x.location.lowerString() === dbUser.location.lowerString()).filter(x => x.acquire_odds).sort((a, b) => a.acquire_odds - b.acquire_odds);
    const fullFoodOdds = food.map(x => x.acquire_odds).reduce((accumulator, currentValue) => accumulator + currentValue);
    const rollOdds = Random.nextInt(1, fullFoodOdds);
    let cumulative = 0;

    if (roll <= weapon.accuracy) {
      for (let i = 0; i < food.length; i++) {
        const fish = food[i];
        cumulative += fish.acquire_odds;
        if (rollOdds <= cumulative) {
          return fish;
        }
      }
    }
  }

  rankItem(weapon, dbUser) {
    let newItem = weapon;
    let newRank = '';

    for (const key in Constants.config.ranks) {
      if (dbUser.prestige >= Constants.config.ranks[key]) {
        newRank = key;
      }
    }

    newItem.accuracy += Constants.config.rankUpgrades[newRank];

    newItem.accuracy > 100 ? newItem.accuracy = 100 : '';

    return newItem;
  }

  capitializeWords(str) {
    if (isNaN(str)) {
      return str.replace('_', ' ').replace(Constants.data.regexes.capitalize, x => x.charAt(0).toUpperCase() + x.substr(1));
    }

    return str;
  }
}

module.exports = new ItemService();
