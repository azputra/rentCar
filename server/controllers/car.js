const { Car } = require('../models')

class CarController {
    static createCar(req, res, next) {
        const { brand, carYear, rentPrice, licensePlate } = req.body
        Car.create({
            brand,
            carYear,
            rentPrice,
            licensePlate
        })
            .then((car) => {
                res.status(201).json(car)
            }).catch(next);
    }
    static findAll(req, res, next) {
        Car.findAll()
            .then((cars) => {
                res.status(200).json(cars)
            }).catch(next);
    }
    static findOne(req, res, next) {
        Car.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((car) => {
                if (car) {
                    res.status(200).json(car)
                } else {
                    throw { status: 404, message: "Not Found Car" }
                }
            }).catch(next);
    }
    static updateCar(req, res, next) {
        const { brand, carYear, rentPrice } = req.body
        Car.update({
            brand,
            carYear,
            rentPrice
        }, {
            where: {
                id: req.params.id
            }
        })
            .then((carUpdate) => {
                if (!carUpdate[0]) {
                    throw { status: 404, message: "Not Found Car" }
                } else {
                    return Car.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                }
            })
            .then((car) => {
                res.status(200).json(car)
            })
            .catch(next);
    }
    static removeCar(req, res, next) {
        let car = null
        Car.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((dataCar) => {
                car = dataCar
                if (!car) {
                    throw { status: 404, message: "Not Found Car" }
                } else {
                    return Car.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                }
            })
            .then(() => {
                res.status(200).json(car)
            })
            .catch(next);
    }
}

module.exports = CarController