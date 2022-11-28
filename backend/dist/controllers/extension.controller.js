"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionController = void 0;
const extension_1 = __importDefault(require("../models/extension"));
class ExtensionController {
    constructor() {
        this.getAllExtensions = (req, res) => {
            extension_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.add = (req, res) => {
            let ext = new extension_1.default({
                bookID: req.body.bookID,
                id: req.body.id,
                user: req.body.user
            });
            ext.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.remove = (req, res) => {
            let id = req.body.id;
            extension_1.default.deleteOne({ 'id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.ExtensionController = ExtensionController;
//# sourceMappingURL=extension.controller.js.map