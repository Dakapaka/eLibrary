"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueController = void 0;
const issue_1 = __importDefault(require("../models/issue"));
class IssueController {
    constructor() {
        this.getAllIssues = (req, res) => {
            issue_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.add = (req, res) => {
            let issue = new issue_1.default({
                user: req.body.user,
                bookID: req.body.bookID,
                returned: req.body.returned,
                book: req.body.book,
                id: req.body.id,
                issueDate: req.body.issueDate,
                deadlineDate: req.body.deadlineDate,
                author: req.body.author,
                picture: req.body.picture
            });
            issue.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updateIssue = (req, res) => {
            let bookID = req.body.bookID;
            let user = req.body.user;
            let book = req.body.book;
            let returned = req.body.returned;
            let id = req.body.id;
            let returnDate = req.body.returnDate;
            issue_1.default.updateOne({ 'id': id }, { $set: { 'returned': returned, 'returnDate': returnDate } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.updateDeadline = (req, res) => {
            let id = req.body.id;
            let returned = req.body.returned;
            let deadlineDate = req.body.deadlineDate;
            issue_1.default.updateOne({ 'id': id }, { $set: { 'returned': returned, 'deadlineDate': deadlineDate } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.IssueController = IssueController;
//# sourceMappingURL=issue.controller.js.map