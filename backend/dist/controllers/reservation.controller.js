"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const reservation_1 = __importDefault(require("../models/reservation"));
class ReservationController {
    constructor() {
        this.getAllReservations = (req, res) => {
            reservation_1.default.find({}, (err, reser) => {
                if (err)
                    console.log(err);
                else
                    res.json(reser);
            });
        };
        this.add = (req, res) => {
            let rese = new reservation_1.default({
                bookID: req.body.bookID,
                id: req.body.id,
                user: req.body.user
            });
            rese.save((err, resp) => {
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
            reservation_1.default.deleteOne({ 'id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.ReservationController = ReservationController;
//# sourceMappingURL=reservation.controller.js.map