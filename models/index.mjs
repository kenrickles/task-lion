import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';
import usersModel from './users.mjs';
import taskersModel from './taskers.mjs';
import categoriesModel from './categories.mjs';
import tasksModel from './tasks.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// models are always singular
db.Users = usersModel(sequelize, Sequelize.DataTypes);
db.Tasks = tasksModel(sequelize, Sequelize.DataTypes);
db.Taskers = taskersModel(sequelize, Sequelize.DataTypes);
db.Categories = categoriesModel(sequelize, Sequelize.DataTypes);

db.Categories.hasMany(db.Tasks);
db.Tasks.belongsTo(db.Categories, { foreignKey: 'category_id' });
db.Tasks.belongsTo(db.Taskers, { foreignKey: 'tasker_id' });
db.Taskers.hasMany(db.Tasks);
db.Tasks.belongsTo(db.Users);
db.Users.hasMany(db.Tasks);

export default db;
