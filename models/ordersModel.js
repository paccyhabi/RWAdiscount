module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        orderStatus: {
            type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'canceled'),
            allowNull: false,
            defaultValue: 'pending'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },        
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0 
            }
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

    });

    return Order;
};
