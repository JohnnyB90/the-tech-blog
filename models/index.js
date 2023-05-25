// models/index.js
const Sequelize = require('sequelize');
const User = require('./User');
const BlogPost = require('./Blogpost');
const Comments = require('./Comments');

const sequelize = new Sequelize('database', 'email', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

User.hasMany(BlogPost);
BlogPost.belongsTo(User);

User.hasMany(Comments);
Comments.belongsTo(User);
BlogPost.hasMany(Comments);
Comments.belongsTo(BlogPost);

module.exports = { User, BlogPost, Comments, sequelize };
