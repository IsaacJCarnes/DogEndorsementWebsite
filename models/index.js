const User = require('./User');
const Dog = require('./Dog');

User.hasMany(Dog, {
    foreignKey: 'user_id',
  });
  
  Dog.belongsTo(User, {
    foreignKey: 'user_id',
  });

module.exports = { User, Dog};