"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_1 = __importDefault(require("../models/book"));
class BookController {
    constructor() {
        this.getAllBooks = (req, res) => {
            book_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.updateBook = (req, res) => {
            let id = req.body.id;
            let title = req.body.title;
            let author = req.body.author;
            let genre = req.body.genre;
            let publisher = req.body.publisher;
            let year = req.body.year;
            let language = req.body.language;
            let inventory = req.body.inventory;
            let picture = req.body.picture;
            book_1.default.updateOne({ 'bookID': id }, { $set: { 'title': title, 'author': author, 'genre': genre, 'publisher': publisher, 'year': year, 'language': language, 'inventory': inventory, 'picture': picture } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.add = (req, res) => {
            let book = new book_1.default({
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
        this.updateRating = (req, res) => {
            let id = req.body.id;
            let rating = req.body.rating;
            book_1.default.updateOne({ 'bookID': id }, { $set: { 'rating': rating } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.remove = (req, res) => {
            let bookID = req.body.bookID;
            book_1.default.deleteOne({ 'bookID': bookID }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map