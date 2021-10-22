
import { ColumnModel } from '*/models/column.model'

const createNew = async (data) => {
    try {
        const result = await ColumnModel.createNew(data)
        return result
    } catch (e) {
        throw new Error(e)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: Date.now()
        }
        const result = await ColumnModel.update(id, updateData)
        return result
    } catch (e) {
        throw new Error(e)
    }
}

export const ColumnService = {
    createNew,
    update
}