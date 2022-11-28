import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema

let Comment = new Schema({
    bookID:{
        type: Number
    },
    user:{
        type: String
    },
    text:{
        type: String
    },
    rating:{
        type: Number
    },
    date:{
        type: Date
    },
    id: {
        type: Number
    },
    updated: {
        type: Boolean
    }
})

export default mongoose.model('CommentModel', Comment, 'comments')