"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookPendingController = void 0;
const bookPending_1 = __importDefault(require("../models/bookPending"));
class BookPendingController {
    constructor() {
        this.add = (req, res) => {
            let book = new bookPending_1.default({
                user: req.body.adder,
                bookID: req.body.id,
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                publisher: req.body.publisher,
                year: req.body.year,
                language: req.body.language,
                picture: req.body.picture
            });
            book.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getAllBookRequests = (req, res) => {
            bookPending_1.default.find({}, (err, requests) => {
                if (err)
                    console.log(err);
                else
                    res.json(requests);
            });
        };
        this.delete = (req, res) => {
            let id = req.body.id;
            bookPending_1.default.deleteOne({ 'bookID': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.BookPendingController = BookPendingController;
//# sourceMappingURL=bookPending.controller.js.map