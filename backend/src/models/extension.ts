import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema

let Extension = new Schema({
    id: {
        type: Number
    },
    bookID: {
        type: Number
    },
    user: {
        type: String
    }
})

export default mongoose.model('ExtenstionModel', Extension, 'extensions')