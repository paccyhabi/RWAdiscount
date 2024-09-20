module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        paymentMethod: {
            type: DataTypes.ENUM('credit_card', 'debit_card', 'paypal', 'bank_transfer', 'mobile'),
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0 
            }
        },
        paymentStatus: {
            type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
            allowNull: false,
            defaultValue: 'pending'
        },
        transactionDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    });
    return Payment;
};
