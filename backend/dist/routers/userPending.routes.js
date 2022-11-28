"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userPending_controller_1 = require("../controllers/userPending.controller");
const userPendingRouter = express_1.default.Router();
userPendingRouter.route('/register').post((req, res) => new userPending_controller_1.UserPendingController().register(req, res));
userPendingRouter.route('/getAllUserRequests').get((req, res) => new userPending_controller_1.UserPendingController().getAllUserRequests(req, res));
userPendingRouter.route('/delete').post((req, res) => new userPending_controller_1.UserPendingController().delete(req, res));
exports.default = userPendingRouter;
//# sourceMappingURL=userPending.routes.js.map