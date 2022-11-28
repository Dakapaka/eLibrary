import express, { Router } from 'express'
import { IssueController } from '../controllers/issue.controller'

const issueRouter = express.Router()

issueRouter.route('/getAllIssues').get(
    (req, res)=> new IssueController().getAllIssues(req, res)
)

issueRouter.route('/add').post(
    (req, res)=> new IssueController().add(req, res)
)

issueRouter.route('/updateIssue').post(
    (req, res)=> new IssueController().updateIssue(req, res)
)

issueRouter.route('/updateDeadline').post(
    (req, res)=> new IssueController().updateDeadline(req, res)
)

export default issueRouter