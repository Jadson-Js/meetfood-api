 module.exports = (sequelize, DataTypes) => {
     const Role = sequelize.define('Role', {
         name: DataTypes.STRING,
         description: DataTypes.STRING
     });
     Role.associate = function (models) {
         Role.hasMany(models.User, {
                 as: 'users'
             }),
             Role.belongsToMany(models.Permission, {
                 through: 'RolePermissions',
                 as: 'permission',
                 foreignKey: 'RoleId',
             })
     }
     return Role;
 }