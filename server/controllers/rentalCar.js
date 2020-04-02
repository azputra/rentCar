const { RentalCar, Car } = require('../models')

class RentalCarController {
    static addRental(req, res, next) {
        const { carId } = req.body
        let car;
        Car.findOne({
            where:
            {
                id: Number(carId)
            }
        })
            .then((dataCar) => {
                car = dataCar
                if (dataCar) {
                    return RentalCar.findOne({
                        where: {
                            CarId: dataCar.id
                        }
                    })
                } else {
                    throw { status: 404, message: "Car Not Found" }
                }
            })
            .then((rentData) => {
                if (rentData) {
                    throw { status: 400, message: "This Car Already In Your Cart" }
                } else {
                    return RentalCar.create({
                        CarId: Number(carId),
                        status: "in Cart",
                        duration: 1
                    })
                }
            })
            .then((rentCar) => {
                res.status(201).json({ car, rentCar })
            })
            .catch(next);
    }

    static getAll(req, res, next) {
        RentalCar.findAll({
            order: [['id', 'DESC']],
            where: {
                status: "in Cart"
            },
            include: Car
        })
            .then((cars) => {
                res.status(200).json(cars)
            }).catch(next);
    }

    static checkoutCars(req, res, next) {
        const checkout = []
        const { checkoutCart } = req.body
        checkoutCart.forEach(rent => {
            checkout.push(RentalCar.update({
                status: "on rent"
            }, {
                where: {
                    id: rent.id
                }
            }))
        });
        Promise.all(checkout)
            .then(() => {
                res.status(200).json("Success Checkout")
            }).catch(next);
    }

    static updateDuration(req, res, next) {
        let { duration } = req.body
        if (duration < 1) {
            duration = 1
            throw { status: 400, message: "Ups Minimal Rental 1 Day" }
        }
        RentalCar.update({
            duration
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.status(200).json("Success Update Duration")
            }).catch(next);
    }

    static removeRentalCar(req, res, next) {
        RentalCar.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((car) => {
                if (car) {
                    res.status(200).json("Success Delete Car")
                } else {
                    throw { status: 404, message: "Rental Car Not Found" }
                }
            }).catch(next);
    }
}

module.exports = RentalCarController