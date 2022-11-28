import express from 'express'
import { BookPendingController } from '../controllers/bookPending.controller'

const bookPendingRouter = express.Router()

bookPendingRouter.route('/add').post(
    (req, res) => new BookPendingController().add(req, res)
)

bookPendingRouter.route('/getAllBookRequests').get(
    (req, res) => new BookPendingController().getAllBookRequests(req, res)
)

bookPendingRouter.route('/delete').post(
    (req, res)=> new BookPendingController().delete(req, res)
)

export default bookPendingRouter