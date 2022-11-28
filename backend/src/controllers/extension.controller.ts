import express from 'express'
import ExtensionModel from '../models/extension'

export class ExtensionController{
    getAllExtensions = (req: express.Request, res: express.Response)=>{
        ExtensionModel.find({}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })
    }

    add = (req: express.Request, res: express.Response)=>{
        let ext = new ExtensionModel({
            bookID : req.body.bookID,
            id : req.body.id,
            user : req.body.user
        })

        ext.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    remove = (req: express.Request, res: express.Response)=>{
        let id = req.body.id

        ExtensionModel.deleteOne({'id' : id}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}