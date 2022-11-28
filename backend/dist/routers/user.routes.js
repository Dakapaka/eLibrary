"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/updatePassword').post((req, res) => new user_controller_1.UserController().updatePassword(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/updateUser').post((req, res) => new user_controller_1.UserController().updateUser(req, res));
userRouter.route('/getAllUsers').get((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/updatePrivileges').post((req, res) => new user_controller_1.UserController().updatePrivileges(req, res));
userRouter.route('/remove').post((req, res) => new user_controller_1.UserController().remove(req, res));
userRouter.route('/updateAdmin').post((req, res) => new user_controller_1.UserController().updateAdmin(req, res));
userRouter.route('/setBlocked').post((req, res) => new user_controller_1.UserController().setBlocked(req, res));
userRouter.route('/setExtended').post((req, res) => new user_controller_1.UserController().setExtended(req, res));
userRouter.route('/setBookAdded').post((req, res) => new user_controller_1.UserController().setBookAdded(req, res));
userRouter.route('/updateNotifications').post((req, res) => new user_controller_1.UserController().updateNotifications(req, res));
userRouter.route('/updateBooksAdded').post((req, res) => new user_controller_1.UserController().updateBooksAdded(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map