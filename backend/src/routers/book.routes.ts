import express, { Router } from 'express'
import { BookController } from '../controllers/book.controller'

const bookRouter = express.Router()

bookRouter.route('/getAllBooks').get(
    (req, res)=> new BookController().getAllBooks(req, res)
)

bookRouter.route('/updateBook').post(
    (req, res) => new BookController().updateBook(req, res)
)

bookRouter.route('/add').post(
    (req, res) => new BookController().add(req, res)
)

bookRouter.route('/updateRating').post(
    (req, res) => new BookController().updateRating(req, res)
)

bookRouter.route('/remove').post(
    (req, res) => new BookController().remove(req, res)
)

export default bookRouter