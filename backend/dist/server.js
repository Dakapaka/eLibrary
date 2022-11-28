"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const book_routes_1 = __importDefault(require("./routers/book.routes"));
const userPending_routes_1 = __importDefault(require("./routers/userPending.routes"));
const bookPending_routes_1 = __importDefault(require("./routers/bookPending.routes"));
const issue_routes_1 = __importDefault(require("./routers/issue.routes"));
const comment_routes_1 = __importDefault(require("./routers/comment.routes"));
const extension_routes_1 = __importDefault(require("./routers/extension.routes"));
const reservation_routes_1 = __importDefault(require("./routers/reservation.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
mongoose_1.default.connect('mongodb://localhost:27017/project');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/books', book_routes_1.default);
router.use('/usersPending', userPending_routes_1.default);
router.use('/booksPending', bookPending_routes_1.default);
router.use('/issues', issue_routes_1.default);
router.use('/comments', comment_routes_1.default);
router.use('/extensions', extension_routes_1.default);
router.use('/reservations', reservation_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map