module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define("feedback", {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      message: {
        type: DataTypes.TEXT
      }
    });
  
    return Feedback;
  };
  