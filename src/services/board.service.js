
import { BoardModel } from '*/models/board.model'

const createNew = async (data) => {
    try {
        const result = await BoardModel.createNew(data)
        return result
    } catch (e) {
        throw new Error(e)
    }
}
const getFullBoard = async (id) => {
    try {
        const board = await BoardModel.getFullBoard(id)

        if(!board || !board.columns) {
            throw new Error('Board not found!')
        }

        //Add card to each column
        board.columns.forEach(column =>{
            column.cards = board.cards.filter(c => c.columnId.toString() === column._id.toString())
        })
        
        //Sort column by columnOder, sort card by cardOrder, this step will add to frontEnd Dev :)))

        //Remove card data from board
        delete board.cards
        return board
    } catch (e) {
        throw new Error(e)
    }
}

export const BoardService = {
    createNew,
    getFullBoard
}