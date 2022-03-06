module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });

    Permission.associate = function (models) {
        Permission.belongsToMany(models.Role, {
           through: 'Roles-Permissions',
           as: 'role',
           foreignKey: 'PermissionId'
        })
    }
    return Permission;
}