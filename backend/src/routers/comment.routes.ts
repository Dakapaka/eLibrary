import express, { Router } from 'express'
import { CommentController } from '../controllers/comment.controller'

const commentRouter = express.Router()

commentRouter.route('/addComment').post(
    (req, res) => new CommentController().addComment(req, res)
)

commentRouter.route('/getAllComments').get(
    (req, res)=> new CommentController().getAllComments(req, res)
)

commentRouter.route('/updateComment').post(
    (req, res) => new CommentController().updateComment(req, res)
)

export default commentRouter