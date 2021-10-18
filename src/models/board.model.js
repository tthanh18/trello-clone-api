
import Joi, { date } from 'joi'
import { getDB } from '*/config/mongodb'

//Define board collection
const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20),
    columnOder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    //abortEarly catch when get first error
    return await boardCollectionSchema.validateAsync(data, {abortEarly: false})
} 

const createNew = async(data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(boardCollectionName).insertOne(value)
        const ops =  await getDB().collection(boardCollectionName).findOne(result.insertedId)
        return ops
    } catch (error) {
        console.log(error)
    }
}

export const BoardModel = {
    createNew
}