
import Joi, { date } from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'

//Define column collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(), // aslo ObjectId when create new
    columnId: Joi.string().required(), // aslo ObjectId when create new
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
        const validatedValue = await validateSchema(data)
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId),
            columnId: ObjectId(validatedValue.columnId)
        }
        const result = await getDB().collection(cardCollectionName).insertOne(insertValue)
        
        const ops =  await getDB().collection(cardCollectionName).findOne(result.insertedId)
        return ops
    } catch (error) {
        throw new Error(error)
    }
}

export const CardModel = {
    cardCollectionName,
    createNew
}