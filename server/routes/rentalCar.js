const router = require('express').Router()
const rentalCarController = require('../controllers/rentalCar')

router.post('/', rentalCarController.addRental)
router.get('/', rentalCarController.getAll)
router.put('/checkout', rentalCarController.checkoutCars)
router.put('/:id', rentalCarController.updateDuration)
router.delete('/:id', rentalCarController.removeRentalCar)

module.exports = router