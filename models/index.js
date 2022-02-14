const User = require('./User');
const Blog = require('./Blog');
const Comments = require('./Comments');

Blog.hasMany(Comments, {
  foreignKey: 'blog_id',
  onDelete:'CASCADE'
});

Comments.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Comments.belongsTo(User, {
  foreignKey: 'user_id'
})


module.exports = { User, Blog, Comments };
