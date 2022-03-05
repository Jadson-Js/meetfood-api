 module.exports = (sequelize, DataTypes) => {
     const User = sequelize.define('User', {
         name: DataTypes.STRING,
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         RoleId: DataTypes.INTEGER
     });
     User.associate = function (models) {
         User.belongsTo(models.Role, {
             foreingkey: 'RoleId',
             as: 'role'
         })
     }
     return User;
 }