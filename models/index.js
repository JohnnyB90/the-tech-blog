const Sequelize = require('sequelize');
const User = require('./User');
const BlogPost = require('./BlogPost');
const Comments = require('./Comments');

const sequelize = new Sequelize('database', 'email', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

User.hasMany(BlogPost, { foreignKey: 'user_id', as: 'posts' });
BlogPost.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Comments, { foreignKey: 'user_id', as: 'comments' });
Comments.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

BlogPost.hasMany(Comments, { foreignKey: 'blogpost_id', as: 'comments' });
Comments.belongsTo(BlogPost, { foreignKey: 'blogpost_id', as: 'post' });

module.exports = { User, BlogPost, Comments, sequelize };
