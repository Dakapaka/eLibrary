import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema

let Book = new Schema({
    bookID:{
        type: Number
    },
    title:{
        type: String
    },
    author:{
        type: String
    },
    genre:{
        type: String
    },
    publisher:{
        type: String
    },
    year:{
        type: String
    },
    language:{
        type: String
    },
    picture:{
        type: String
    },
    inventory:{
        type: Number
    },
    rating: {
        type: Number
    }
})

export default mongoose.model('BookModel', Book, 'books')