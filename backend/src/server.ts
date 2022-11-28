import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routers/user.routes';
import bookRouter from './routers/book.routes';
import userPendingRouter from './routers/userPending.routes';
import bookPendingRouter from './routers/bookPending.routes';
import issueRouter from './routers/issue.routes';
import commentRouter from './routers/comment.routes';
import extensionRouter from './routers/extension.routes';
import reservationRouter from './routers/reservation.routes';

const app = express();
app.use(cors())
app.use(express.json({limit: '50mb'}))

mongoose.connect('mongodb://localhost:27017/project')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router()
router.use('/users', userRouter)
router.use('/books', bookRouter)
router.use('/usersPending', userPendingRouter)
router.use('/booksPending', bookPendingRouter)
router.use('/issues', issueRouter)
router.use('/comments', commentRouter)
router.use('/extensions', extensionRouter)
router.use('/reservations', reservationRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));