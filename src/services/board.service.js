
import { BoardModel } from '*/models/board.model'
import { cloneDeep } from 'lodash'

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
        const transformBoard = cloneDeep(board) 
        //Filter deleted columns
        transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)
        //Add card to each column
        transformBoard.columns.forEach(column =>{
            column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
        })
        //Sort column by columnOder, sort card by cardOrder, this step will add to frontEnd Dev :)))
        //Remove card data from board
        delete transformBoard.cards
        return transformBoard
    } catch (e) {
        throw new Error(e)
    }
}

export const BoardService = {
    createNew,
    getFullBoard
}