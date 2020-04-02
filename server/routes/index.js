const router = require('express').Router()
const carRouter = require('./car')
const rentalCarsRouter = require('./rentalCar')

router.use('/cars', carRouter)
router.use('/rentalCars', rentalCarsRouter)

module.exports = router