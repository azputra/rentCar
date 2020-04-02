'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Car extends Model { }
  Car.init({
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill brand"
        },
        notNull: {
          msg: "please enter brand"
        }
      }
    },
    carYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill car year"
        },
        notNull: {
          msg: "please enter car year"
        }
      }
    },
    rentPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill price"
        },
        notNull: {
          msg: "please enter price"
        }
      }
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill license plate"
        },
        notNull: {
          msg: "please enter license plate"
        },
        isUnique(value) {
          return Car.findOne({
            where: {
              licensePlate: value
            }
          })
            .then((result) => {
              if (result) {
                throw new Error("license plate already exist")
              }
            })
        }
      }
    }
  }, {
    sequelize
  });
  Car.associate = function (models) {
    Car.hasMany(models.RentalCar)
    // associations can be defined here
  };
  return Car;
};