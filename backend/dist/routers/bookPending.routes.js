"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookPending_controller_1 = require("../controllers/bookPending.controller");
const bookPendingRouter = express_1.default.Router();
bookPendingRouter.route('/add').post((req, res) => new bookPending_controller_1.BookPendingController().add(req, res));
bookPendingRouter.route('/getAllBookRequests').get((req, res) => new bookPending_controller_1.BookPendingController().getAllBookRequests(req, res));
bookPendingRouter.route('/delete').post((req, res) => new bookPending_controller_1.BookPendingController().delete(req, res));
exports.default = bookPendingRouter;
//# sourceMappingURL=bookPending.routes.js.map