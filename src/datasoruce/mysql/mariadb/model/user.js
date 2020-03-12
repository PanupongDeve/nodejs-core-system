const Sequelize = require('sequelize');
const sequelize = require('../../mariadb');

const Model = Sequelize.Model;
class User extends Model {}
User.init({
  // attributes
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: true 
  // options
});

module.exports = User;