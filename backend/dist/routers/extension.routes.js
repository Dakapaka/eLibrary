"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const extension_controller_1 = require("../controllers/extension.controller");
const extensionRouter = express_1.default.Router();
extensionRouter.route('/getAllExtensions').get((req, res) => new extension_controller_1.ExtensionController().getAllExtensions(req, res));
extensionRouter.route('/add').post((req, res) => new extension_controller_1.ExtensionController().add(req, res));
extensionRouter.route('/remove').post((req, res) => new extension_controller_1.ExtensionController().remove(req, res));
exports.default = extensionRouter;
//# sourceMappingURL=extension.routes.js.map