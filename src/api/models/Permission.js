module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });

    Permission.associate = function (models) {
        Permission.belongsToMany(models.Role, {
           through: 'roles-permissions',
           as: 'permissions',
           foreignKey: 'PermissionId'
        })
    }
    return Permission;
}