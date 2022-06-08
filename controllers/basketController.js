const { Clothing, BasketClothing ,Basket} = require("../models/models")

class BasketController {
    // ------ CRUD корзины ------ //


    async addToBasket(req,res,next){
        let {userId} = req.body
        let {clothingId} = req.body
        const basket = await BasketClothing.create({basketId: userId , clothingId : clothingId})
        next()
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const basket = await BasketClothing.findAll({
            include: {model: Clothing},})
        return res.json(basket)
    }

}

module.exports = new BasketController()