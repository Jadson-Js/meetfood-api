 module.exports = (sequelize, DataTypes) => {
     const User = sequelize.define('User', {
         name: DataTypes.STRING,
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         RoleId: {
             type: DataTypes.INTEGER,
             allowNull: false,
             defaultValue: 1
         }
     });
     User.associate = function (models) {
         User.belongsTo(models.Role, {
                 foreingkey: 'RoleId',
                 as: 'role'
             }),
             User.hasMany(models.Product, {
                 as: 'products'
             })
     }
     return User;
 }