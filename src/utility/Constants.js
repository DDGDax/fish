class Constants {
  constructor() {
    this.data = {
      colors: {
        ban: [234, 12, 0],
        clear: [0, 29, 255],
        defaults: [
          [173, 216, 230]
        ],
        chill: [255, 92, 17],
        error: [255, 0, 0],
        kick: [232, 81, 31],
        mute: [255, 114, 14],
        unban: [19, 255, 25],
        unmute: [109, 237, 94],
        unchill: [91, 283, 53],
        warn: [255, 182, 32]
      },

      links: {
        botInvite: 'https://discordapp.com/oauth2/authorize?client_id=529082937904463884&scope=bot&permissions=0',
        serverInvite: 'https://discord.gg/q6jvAa9'
      },

      numbers: {
        thousand: 1000,
        million: 1000000,
        billion: 1000000000
      },

      misc: {
        clientOptions: {
          fetchAllMembers: true,
          messageCacheMaxSize: 100,
          messageCacheLifetime: 30,
          messageSweepInterval: 1800,
          disabledEvents: [
            'CHANNEL_PINS_UPDATE',
            'MESSAGE_UPDATE',
            'MESSAGE_REACTION_ADD',
            'MESSAGE_REACTION_REMOVE',
            'MESSAGE_REACTION_REMOVE_ALL',
            'VOICE_STATE_UPDATE',
            'TYPING_START',
            'VOICE_SERVER_UPDATE',
            'WEBHOOKS_UPDATE'
          ]
        },
        game: '?help',
        prefix: '?',
        botOwners: ['Luner#0059', 'Dylan™#2217'],
        ownerIds: ['226736342745219072', '231178905480855552']
      },

      regexes: {
        capitalize: /\w\S*/g,
        escape: /[-[\]{}()*+?.,\\/^$|#\s]/g,
        prefix: /^\?/
      }
    };

    this.config = {
      fish: {
        cooldown: 900000
      },

      ranks: {
        Beginner: 0,
        Novice: 21,
        Expert: 51,
        Mariner: 101,
        Master: 141
      },

      rankUpgrades: {
        Beginner: 0,
        Novice: 5,
        Expert: 10,
        Mariner: 30,
        Master: 50
      },

      locations: ['Stream', 'Lake', 'Ocean', 'Fishing Store'],

      misc: {
        baitPerMessage: 1,
        leaderboardCap: 10,
        messageCooldown: 30000,
        rateLimitMessageCooldown: 5000,
        rateLimitMessageAmount: 8,
        minCharLength: 7,
        messageMultiplier: 1
      }
    };

    this.conversions = {
      secondInMs: 1000,
      minuteInMs: 60000,
      hourInMs: 3600000,
      dayInMs: 86400000,
      weekInMs: 604800000,
      monthInMs: 2592000000,
      yearInMs: 31536000000,
      decadeInMs: 315360000000,
      centuryInMs: 3153600000000
    };
  }
}

module.exports = new Constants();
