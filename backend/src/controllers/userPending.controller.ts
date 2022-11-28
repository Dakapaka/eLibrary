import express from 'express'
import UserPendingModel from '../models/userPending'

export class UserPendingController{
    register = (req: express.Request, res: express.Response)=>{
        let user = new UserPendingModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            picture: req.body.picture,
            type: 0
        })

        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    getAllUserRequests = (req: express.Request, res: express.Response)=>{
        UserPendingModel.find({}, (err, requests)=>{
            if(err) console.log(err)
            else res.json(requests)
        })
    }

    delete = (req: express.Request, res: express.Response)=>{
        let email = req.body.email

        UserPendingModel.deleteOne({'email' : email}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}