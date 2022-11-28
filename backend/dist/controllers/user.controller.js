"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.updatePassword = (req, res) => {
            let email = req.body.email;
            let oldPassword = req.body.oldPassword;
            let newPassword1 = req.body.newPassword1;
            let newPassword2 = req.body.newPassword2;
            user_1.default.updateOne({ 'email': email }, { $set: { 'password': newPassword1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Lozinka promijenjena' });
            });
        };
        this.register = (req, res) => {
            let user = new user_1.default({
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
        this.updateUser = (req, res) => {
            let emailID = req.body.emailID;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let username = req.body.username;
            let address = req.body.address;
            let phone = req.body.phone;
            let email = req.body.email;
            let picture = req.body.picture;
            user_1.default.updateOne({ 'email': emailID }, { $set: { 'firstname': firstname, 'lastname': lastname, 'username': username, 'address': address, 'phone': phone, 'email': email, 'picture': picture } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Podaci ažurirani' });
            });
        };
        this.updateAdmin = (req, res) => {
            let email = req.body.email;
            let deadline = req.body.deadline;
            user_1.default.updateOne({ 'email': email }, { $set: { 'deadline': deadline } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.updatePrivileges = (req, res) => {
            let email = req.body.email;
            let type = req.body.type;
            if (type == 0) {
                type = 1;
            }
            else {
                type = 0;
            }
            user_1.default.updateOne({ 'email': email }, { $set: { 'type': type } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Podaci ažurirani' });
            });
        };
        this.getAllUsers = (req, res) => {
            user_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.remove = (req, res) => {
            let email = req.body.email;
            user_1.default.deleteOne({ 'email': email }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.setBlocked = (req, res) => {
            let email = req.body.email;
            let blocked = req.body.blocked;
            user_1.default.updateOne({ 'email': email }, { $set: { 'blocked': blocked } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.setExtended = (req, res) => {
            let username = req.body.user;
            let extended = req.body.extended;
            user_1.default.updateOne({ 'username': username }, { $set: { 'extended': extended } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.setBookAdded = (req, res) => {
            let username = req.body.user;
            let bookAdded = req.body.bookAdded;
            user_1.default.updateOne({ 'username': username }, { $set: { 'bookAdded': bookAdded } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.updateNotifications = (req, res) => {
            let username = req.body.user;
            let notifications = req.body.notifications;
            user_1.default.updateOne({ 'username': username }, { $set: { 'notifications': notifications } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.updateBooksAdded = (req, res) => {
            let username = req.body.user;
            let booksAdded = req.body.booksAdded;
            user_1.default.updateOne({ 'username': username }, { $set: { 'booksAdded': booksAdded } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map