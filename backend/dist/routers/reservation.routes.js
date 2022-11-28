"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservation_controller_1 = require("../controllers/reservation.controller");
const reservationRouter = express_1.default.Router();
reservationRouter.route('/getAllReservations').get((req, res) => new reservation_controller_1.ReservationController().getAllReservations(req, res));
reservationRouter.route('/add').post((req, res) => new reservation_controller_1.ReservationController().add(req, res));
reservationRouter.route('/remove').post((req, res) => new reservation_controller_1.ReservationController().remove(req, res));
exports.default = reservationRouter;
//# sourceMappingURL=reservation.routes.js.map