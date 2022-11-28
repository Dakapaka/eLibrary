import express from 'express'
import { UserPendingController } from '../controllers/userPending.controller'

const userPendingRouter = express.Router()

userPendingRouter.route('/register').post(
    (req, res) => new UserPendingController().register(req, res)
)

userPendingRouter.route('/getAllUserRequests').get(
    (req, res) => new UserPendingController().getAllUserRequests(req, res)
)

userPendingRouter.route('/delete').post(
    (req, res)=> new UserPendingController().delete(req, res)
)

export default userPendingRouter