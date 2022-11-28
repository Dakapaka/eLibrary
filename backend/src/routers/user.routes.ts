import express from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/updatePassword').post(
    (req, res) => new UserController().updatePassword(req, res)
)

userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/updateUser').post(
    (req, res) => new UserController().updateUser(req, res)
)

userRouter.route('/getAllUsers').get(
    (req, res) => new UserController().getAllUsers(req, res)
)

userRouter.route('/updatePrivileges').post(
    (req, res) => new UserController().updatePrivileges(req, res)
)

userRouter.route('/remove').post(
    (req, res) => new UserController().remove(req, res)
)

userRouter.route('/updateAdmin').post(
    (req, res) => new UserController().updateAdmin(req, res)
)

userRouter.route('/setBlocked').post(
    (req, res) => new UserController().setBlocked(req, res)
)

userRouter.route('/setExtended').post(
    (req, res) => new UserController().setExtended(req, res)
)

userRouter.route('/setBookAdded').post(
    (req, res) => new UserController().setBookAdded(req, res)
)

userRouter.route('/updateNotifications').post(
    (req, res) => new UserController().updateNotifications(req, res)
)

userRouter.route('/updateBooksAdded').post(
    (req, res) => new UserController().updateBooksAdded(req, res)
)

export default userRouter