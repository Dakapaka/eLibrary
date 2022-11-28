"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPendingController = void 0;
const userPending_1 = __importDefault(require("../models/userPending"));
class UserPendingController {
    constructor() {
        this.register = (req, res) => {
            let user = new userPending_1.default({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                picture: req.body.picture,
                type: 0
            });
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getAllUserRequests = (req, res) => {
            userPending_1.default.find({}, (err, requests) => {
                if (err)
                    console.log(err);
                else
                    res.json(requests);
            });
        };
        this.delete = (req, res) => {
            let email = req.body.email;
            userPending_1.default.deleteOne({ 'email': email }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.UserPendingController = UserPendingController;
//# sourceMappingURL=userPending.controller.js.map