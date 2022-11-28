import express from 'express'
import BookModel from '../models/book'

export class BookController{
    getAllBooks = (req: express.Request, res: express.Response)=>{
        BookModel.find({}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })
    }

    updateBook = (req: express.Request, res: express.Response)=>{

        let id = req.body.id
        let title = req.body.title
        let author = req.body.author
        let genre = req.body.genre
        let publisher = req.body.publisher
        let year = req.body.year
        let language = req.body.language
        let inventory = req.body.inventory
        let picture = req.body.picture

        BookModel.updateOne({'bookID' : id}, {$set : {'title' : title, 'author' : author, 'genre' : genre, 'publisher' : publisher, 'year' : year, 'language' : language, 'inventory' : inventory, 'picture' : picture}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    add = (req: express.Request, res: express.Response)=>{
        let book = new BookModel({
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

    updateRating = (req: express.Request, res: express.Response)=>{

        let id = req.body.id
        let rating = req.body.rating

        BookModel.updateOne({'bookID' : id}, {$set : {'rating' : rating}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    remove = (req: express.Request, res: express.Response)=>{
        let bookID = req.body.bookID

        BookModel.deleteOne({'bookID' : bookID}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}