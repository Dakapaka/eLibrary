"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_1 = __importDefault(require("../models/comment"));
class CommentController {
    constructor() {
        this.getAllComments = (req, res) => {
            comment_1.default.find({}, (err, comments) => {
                if (err)
                    console.log(err);
                else
                    res.json(comments);
            });
        };
        this.addComment = (req, res) => {
            let comment = new comment_1.default({
                user: req.body.user,
                bookID: req.body.bookID,
                text: req.body.text,
                rating: req.body.rating,
                date: req.body.date,
                id: req.body.id,
            });
            comment.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updateComment = (req, res) => {
            let id = req.body.id;
            let text = req.body.text;
            let rating = req.body.rating;
            let updated = req.body.updated;
            comment_1.default.updateOne({ 'id': id }, { $set: { 'text': text, 'rating': rating, 'updated': updated } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Podaci ažurirani' });
            });
        };
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map