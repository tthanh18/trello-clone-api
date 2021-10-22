
import { HttpStatusCode } from '*/utilities/constants'
import { ColumnService } from '*/services/column.service'

const createNew = async (req, res) => {
    try {
        const result = await ColumnService.createNew(req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (e) {   
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: e.message
        })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const result = await ColumnService.update(id, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (e) {   
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: e.message
        })
    }
}

export const ColumnController = {
    createNew,
    update
}