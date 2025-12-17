module.exports = (sequelize, DataType) => {
  const user = sequelize.define("User", {
    id: {
      type: DataType.UUID,
      defaultValue,
      primaryKey: true,
    },
    username: {
      type: DataType.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  return user ; 
};

