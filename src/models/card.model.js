
import Joi, { date } from 'joi'
import { getDB } from '*/config/mongodb'

//Define column collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    //abortEarly catch when get first error
    return await cardCollectionSchema.validateAsync(data, {abortEarly: false})
} 

const createNew = async(data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(cardCollectionName).insertOne(value)
        const ops =  await getDB().collection(cardCollectionName).findOne(result.insertedId)
        return ops
    } catch (error) {
        throw new Error(error)
    }
}

export const CardModel = {
    createNew
}