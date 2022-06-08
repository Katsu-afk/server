const {Clothing, ClothingInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')


class ClothingController {
    async create (req, res, next){
        try{
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const clothing = await Clothing.create({name, price, brandId, typeId, img: fileName})
    
            if(info){
                info = JSON.parse(info)
                info.forEach(i =>
                    ClothingInfo.create({
                        title: i.title,
                        description: i.description,
                        clothingId: clothing.id
                    })
                    )
            }

            return res.json(clothing)
        } catch(e){
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll (req, res) {
        try {
            let {brandId, typeId, limit, page} = req.query
            page = page || 1

            limit = limit || 2

            let offset = page * limit - limit
            let clothings;
            if (!brandId && !typeId) {
                clothings = await Clothing.findAndCountAll({limit, offset})
            }
            if (brandId && !typeId) {
                clothings = await Clothing.findAndCountAll({where: {brandId}, limit, offset})
            }
            if (!brandId && typeId) {
                clothings = await Clothing.findAndCountAll({where: {typeId}, limit, offset})
            }
            if (brandId && typeId) {
                clothings = await Clothing.findAndCountAll({where: {typeId, brandId}, limit, offset})
            }
            return res.json(clothings)

        } catch (e) {
            console.log(e)
        }
    }

    async getOne (req, res){
        const {id} = req.params
        const clothing = await Clothing.findOne(
            {
                where: {id},
                include: [{model: ClothingInfo, as: 'info'}]
            }, 
            )
            return res.json(clothing)
    }
}

module.exports = new ClothingController()