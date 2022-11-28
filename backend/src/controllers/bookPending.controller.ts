import express from 'express'
import BookPendingModel from '../models/bookPending'

export class BookPendingController{
    add = (req: express.Request, res: express.Response)=>{
        let book = new BookPendingModel({
            user: req.body.adder,
            bookID : req.body.id,
            title : req.body.title,
            author : req.body.author,
            genre : req.body.genre,
            publisher : req.body.publisher,
            year : req.body.year,
            language : req.body.language,
            picture : req.body.picture
        })

        book.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    getAllBookRequests = (req: express.Request, res: express.Response)=>{
        BookPendingModel.find({}, (err, requests)=>{
            if(err) console.log(err)
            else res.json(requests)
        })
    }

    delete = (req: express.Request, res: express.Response)=>{
        let id = req.body.id

        BookPendingModel.deleteOne({'bookID' : id}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}