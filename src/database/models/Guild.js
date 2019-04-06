class Guild {
  constructor(guildId) {
    this.guildId = guildId;
    this.channels = {
      ignore: []
    };
  }
}

module.exports = Guild;
