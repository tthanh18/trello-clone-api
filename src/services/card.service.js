
import { CardModel } from '*/models/card.model'
import { ColumnModel } from '*/models/column.model'

const createNew = async (data) => {
    try {
        const newCard = await CardModel.createNew(data)
        // update columnOder array in board collection
        await ColumnModel.pushCardOrder(newCard.columnId.toString(), newCard._id.toString())
        return newCard
    } catch (e) {
        throw new Error(e)
    }
}

export const CardService = {
    createNew,
}