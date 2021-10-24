
import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'
import { CardModel } from '*/models/card.model'


const createNew = async (data) => {
    try {
        //transaction mongodb
        const newColumn = await ColumnModel.createNew(data)
        newColumn.cards = []
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
        if (updateData._id) delete updateData._id
        if (updateData.cards) delete updateData.cards
        
        const updatedColumn = await ColumnModel.update(id, updateData)

        if (updatedColumn._destroy) {
            //delete many cards
            CardModel.deleteMany(updatedColumn.cardOrder)
        }

        return updatedColumn
    } catch (e) {
        throw new Error(e)
    }
}

export const ColumnService = {
    createNew,
    update
}