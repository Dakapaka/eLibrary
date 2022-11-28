import express, { Router } from 'express'
import { ExtensionController } from '../controllers/extension.controller'

const extensionRouter = express.Router()

extensionRouter.route('/getAllExtensions').get(
    (req, res)=> new ExtensionController().getAllExtensions(req, res)
)

extensionRouter.route('/add').post(
    (req, res) => new ExtensionController().add(req, res)
)

extensionRouter.route('/remove').post(
    (req, res) => new ExtensionController().remove(req, res)
)

export default extensionRouter