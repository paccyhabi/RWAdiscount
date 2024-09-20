module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5 
            }
        },
        reviewText: {
            type: DataTypes.TEXT,
            allowNull: true 
        },
    });

    return Review;
};
