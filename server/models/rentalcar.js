'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class RentalCar extends Model { }
  RentalCar.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    CarId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {
    sequelize
  });
  RentalCar.associate = function (models) {
    RentalCar.belongsTo(models.Car)
    // associations can be defined here
  };
  return RentalCar;
};