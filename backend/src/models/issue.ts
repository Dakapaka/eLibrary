import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema

let Issue = new Schema({
    user: {
        type: String
    },
    bookID: {
        type: Number
    },
    book: {
        type: String
    },
    returned: {
        type: Boolean
    },
    id:{
        type: Number
    },
    issueDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    deadlineDate: {
        type: Date
    },
    author: {
        type: String
    },
    picture: {
        type: String
    }
})

export default mongoose.model('IssueModel', Issue, 'issues')