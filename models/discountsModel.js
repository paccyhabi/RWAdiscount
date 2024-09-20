module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define('Discount', {
        discountValue: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
    });

    return Discount;
};
