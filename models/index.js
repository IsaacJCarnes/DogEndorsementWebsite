const User = require('./User');
const Dog = require('./Dog');

User.hasMany(Dog, {
  foreignKey: 'dog_id',
});

module.exports = {User, Dog};
