const { MongoClient } = require('mongodb');
const util = require('util');
const UserRepository = require('./repositories/UserRepository.js');
const GuildRepository = require('./repositories/GuildRepository.js');
const BlacklistRepository = require('./repositories/BlacklistRepository.js');

class Database {
  constructor() {
    this.queries = {
      Blacklist: require('./queries/BlacklistQuery.js'),
      Guild: require('./queries/GuildQuery.js'),
      Id: require('./queries/IdQuery.js'),
      User: require('./queries/UserQuery.js')
    };

    this.updates = {
      Pull: require('./updates/PullUpdate.js'),
      Push: require('./updates/PushUpdate.js'),
      Item: require('./updates/ItemUpdate.js')
    };

    this.models = {
      Blacklist: require('./models/Blacklist.js'),
      Guild: require('./models/Guild.js'),
      User: require('./models/User.js')
    };
  }

  async connect(connectionURL) {
    const promisified = util.promisify(MongoClient.connect);
    const connection = await promisified(connectionURL, { useNewUrlParser: true });
    const db = connection.db(connection.s.options.dbName);

    this.blacklistRepo = new BlacklistRepository(await db.createCollection('blacklists'));
    this.guildRepo = new GuildRepository(await db.createCollection('guilds'));
    this.userRepo = new UserRepository(await db.createCollection('users'));

    await db.collection('blacklists').createIndex('userId', { unique: true });
    await db.collection('guilds').createIndex('guildId', { unique: true });
  }
}

module.exports = Database;
