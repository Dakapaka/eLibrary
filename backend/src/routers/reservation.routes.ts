import express, { Router } from 'express'
import { ReservationController } from '../controllers/reservation.controller'

const reservationRouter = express.Router()

reservationRouter.route('/getAllReservations').get(
    (req, res)=> new ReservationController().getAllReservations(req, res)
)

reservationRouter.route('/add').post(
    (req, res) => new ReservationController().add(req, res)
)

reservationRouter.route('/remove').post(
    (req, res) => new ReservationController().remove(req, res)
)

export default reservationRouter