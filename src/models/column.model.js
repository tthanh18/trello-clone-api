
import Joi, { date } from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'

//Define column collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
    boardId: Joi.string().required(),
    cardOder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    //abortEarly catch when get first error
    return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(columnCollectionName).insertOne(value)
        const ops = await getDB().collection(columnCollectionName).findOne(result.insertedId)
        return ops
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: data },
            { returnDocument: 'after' }
        )
        console.log(result.value)
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnModel = {
    createNew,
    update
}