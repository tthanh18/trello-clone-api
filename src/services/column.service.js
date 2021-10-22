
import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'

const createNew = async (data) => {
    try {
        //transaction mongodb
        const newColumn = await ColumnModel.createNew(data)
        // update columnOder array in board collection
        await BoardModel.pushColumnOrder(newColumn.boardId.toString(), newColumn._id.toString())
        return newColumn
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