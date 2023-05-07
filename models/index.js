// models/index.js
const Sequelize = require('sequelize');
const User = require('./User');
const Blogpost = require('./Blogpost');
const Comments = require('./Comments');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

User.hasMany(Blogpost);
Blogpost.belongsTo(User);

User.hasMany(Comments);
Comments.belongsTo(User);
Blogpost.hasMany(Comments);
Comments.belongsTo(Blogpost);

module.exports = { User, Blogpost, Comments, sequelize };
