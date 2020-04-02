const router = require('express').Router()
const rentalCarController = require('../controllers/rentalCar')

router.post('/', rentalCarController.addRental)
router.get('/', rentalCarController.getAll)
router.put('/:id', rentalCarController.updateDuration)
router.delete('/:id', rentalCarController.removeRentalCar)
router.put('/checkout', rentalCarController.checkoutCars)

module.exports = router