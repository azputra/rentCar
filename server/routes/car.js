const router = require('express').Router()
const carController = require('../controllers/car')

router.post('/', carController.createCar)
router.get('/', carController.findAll)
router.get('/:id', carController.findOne)
router.put('/:id', carController.updateCar)
router.delete('/:id', carController.removeCar)

module.exports = router