import express from 'express'
import ReservationModel from '../models/reservation'

export class ReservationController{
    getAllReservations = (req: express.Request, res: express.Response)=>{
        ReservationModel.find({}, (err, reser)=>{
            if(err) console.log(err)
            else res.json(reser)
        })
    }

    add = (req: express.Request, res: express.Response)=>{
        let rese = new ReservationModel({
            bookID : req.body.bookID,
            id : req.body.id,
            user : req.body.user
        })

        rese.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    remove = (req: express.Request, res: express.Response)=>{
        let id = req.body.id

        ReservationModel.deleteOne({'id' : id}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}