const config = require("../config/config.database.js");
const { ContactModel } = require("./contact.model.js");
const { RefreshModel } = require("./refresh.model.js");
const { SpamModel } = require("./spam.model.js");
const { UserModel } = require("./user.model.js")

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  logging: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, Sequelize)
db.Contact = ContactModel(sequelize, Sequelize)
db.Spam = SpamModel(sequelize, Sequelize)
db.Refresh = RefreshModel(sequelize, Sequelize)

db.User.hasMany(db.Contact, { foreignKey: "userId_ref" })
db.Contact.belongsTo(db.User, { foreignKey: "userId_ref" })

db.User.hasMany(db.Spam, { foreignKey: "spammedBy_ref" })
db.Spam.belongsTo(db.User, { foreignKey: "spammedBy_ref" })

db.User.hasMany(db.Refresh, { foreignKey: "userId_ref", as: 'refreshes' })
db.Refresh.belongsTo(db.User, { foreignKey: "userId_ref", as: 'user' })

module.exports = db;