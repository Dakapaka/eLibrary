"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const issue_controller_1 = require("../controllers/issue.controller");
const issueRouter = express_1.default.Router();
issueRouter.route('/getAllIssues').get((req, res) => new issue_controller_1.IssueController().getAllIssues(req, res));
issueRouter.route('/add').post((req, res) => new issue_controller_1.IssueController().add(req, res));
issueRouter.route('/updateIssue').post((req, res) => new issue_controller_1.IssueController().updateIssue(req, res));
issueRouter.route('/updateDeadline').post((req, res) => new issue_controller_1.IssueController().updateDeadline(req, res));
exports.default = issueRouter;
//# sourceMappingURL=issue.routes.js.map