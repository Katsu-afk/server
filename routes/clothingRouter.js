const Router = require('express')
const router = new Router()
const ClothingController = require('../controllers/clothingController')
const checkRole = require('../middleware/checkRoleMiddleware')



router.post('/', ClothingController.create)
router.get('/', ClothingController.getAll)
router.get('/:id', ClothingController.getOne)


module.exports = router