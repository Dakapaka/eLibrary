"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRouter = express_1.default.Router();
bookRouter.route('/getAllBooks').get((req, res) => new book_controller_1.BookController().getAllBooks(req, res));
bookRouter.route('/updateBook').post((req, res) => new book_controller_1.BookController().updateBook(req, res));
bookRouter.route('/add').post((req, res) => new book_controller_1.BookController().add(req, res));
bookRouter.route('/updateRating').post((req, res) => new book_controller_1.BookController().updateRating(req, res));
bookRouter.route('/remove').post((req, res) => new book_controller_1.BookController().remove(req, res));
exports.default = bookRouter;
//# sourceMappingURL=book.routes.js.map