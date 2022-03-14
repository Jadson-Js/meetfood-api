module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.INTEGER,
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Product.associate = function (models) {
        Product.belongsTo(models.User, {
            foreingkey: 'UserId',
            as: 'user'
        })
    }
    return Product;
}