
import { HttpStatusCode } from '*/utilities/constants'
import { BoardService } from '*/services/board.service'

const createNew = async (req, res) => {
    try {
        const result = await BoardService.createNew(req.body)
        console.log(result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (e) {   
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: e.message
        })
    }
}

export const BoardController = {
    createNew,
}