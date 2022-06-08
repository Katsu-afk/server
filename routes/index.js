const Router = require('express')
const router = new Router()
const clothingRouter = require('./clothingRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const basketRouter = require('./basketRouter')
const contactRouter = require('./contactRouter')


router.use('/user' , userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/basket', basketRouter)
router.use('/clothing', clothingRouter)
router.use('/contact', contactRouter)

module.exports = router