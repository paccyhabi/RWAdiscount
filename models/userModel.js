module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      role: {
        type: DataTypes.ENUM('user', 'admin','business'),
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
    },      
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      phoneNumber: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },          
      isVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      verificationToken: {
          type: DataTypes.STRING
      }
  });

  return User;
};
