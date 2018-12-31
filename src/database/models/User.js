class User {
  constructor(userId, guildId) {
    this.userId = userId;
    this.guildId = guildId;
    this.rank = 'Beginner';
    this.bait = 0;
    this.fish = {};
    this.rods = {};
    this.treasure = {};
    this.location = 'Fishing Store';
  }
}

module.exports = User;
