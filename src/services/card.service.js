
import { CardModel } from '*/models/card.model'

const createNew = async (data) => {
    try {
        const result = await CardModel.createNew(data)
        return result
    } catch (e) {
        throw new Error(e)
    }
}

export const CardService = {
    createNew,
}