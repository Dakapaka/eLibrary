import express from 'express'
import CommentModel from '../models/comment'

export class CommentController{
    getAllComments = (req: express.Request, res: express.Response)=>{
        CommentModel.find({}, (err, comments)=>{
            if(err) console.log(err)
            else res.json(comments)
        })
    }

    addComment = (req: express.Request, res: express.Response)=>{
        let comment = new CommentModel({
            user: req.body.user,
            bookID: req.body.bookID,
            text: req.body.text,
            rating: req.body.rating,
            date: req.body.date,
            id: req.body.id,
        })

        comment.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    updateComment = (req: express.Request, res: express.Response)=>{

        let id = req.body.id
        let text = req.body.text
        let rating = req.body.rating
        let updated = req.body.updated

        CommentModel.updateOne({'id' : id}, {$set : {'text' : text, 'rating' : rating, 'updated' : updated}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Podaci ažurirani'})
        })
    }
}