import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: Number
    },
    picture: {
        type: String
    },
    deadline: {
        type: Number
    },
    blocked: {
        type: Boolean
    },
    bookAdded: {
        type: Boolean
    },
    notifications: {
        type: Array
    },
    booksAdded: {
        type: Array
    }
})

export default mongoose.model('UserModel', User, 'users')