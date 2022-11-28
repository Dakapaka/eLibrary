import express from 'express'
import IssueModel from '../models/issue'

export class IssueController{
    getAllIssues = (req: express.Request, res: express.Response)=>{
        IssueModel.find({}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })
    }

    add = (req: express.Request, res: express.Response)=>{
        let issue = new IssueModel({
            user: req.body.user,
            bookID: req.body.bookID,
            returned: req.body.returned,
            book: req.body.book,
            id: req.body.id,
            issueDate: req.body.issueDate,
            deadlineDate: req.body.deadlineDate,
            author: req.body.author,
            picture: req.body.picture
        })

        issue.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    updateIssue = (req: express.Request, res: express.Response)=>{

        let bookID = req.body.bookID
        let user = req.body.user
        let book = req.body.book
        let returned = req.body.returned
        let id = req.body.id
        let returnDate = req.body.returnDate
        
        IssueModel.updateOne({'id' : id}, {$set : {'returned' : returned, 'returnDate': returnDate}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    updateDeadline = (req: express.Request, res: express.Response)=>{

        let id = req.body.id
        let returned = req.body.returned
        let deadlineDate = req.body.deadlineDate
        
        IssueModel.updateOne({'id' : id}, {$set : {'returned' : returned, 'deadlineDate': deadlineDate}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
}