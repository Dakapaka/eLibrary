import express from 'express'
import UserModel from '../models/user'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
        let password = req.body.password

        UserModel.findOne({'username': username, 'password' : password}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user)
        })
    }

    updatePassword = (req: express.Request, res: express.Response)=>{
        let email = req.body.email
        let oldPassword = req.body.oldPassword
        let newPassword1 = req.body.newPassword1
        let newPassword2 = req.body.newPassword2

        UserModel.updateOne({'email' : email}, {$set : {'password' : newPassword1}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Lozinka promijenjena'})
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let user = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            picture: req.body.picture,
            type: 0
        })

        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    updateUser = (req: express.Request, res: express.Response)=>{

        let emailID = req.body.emailID
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let username = req.body.username
        let address = req.body.address
        let phone = req.body.phone
        let email = req.body.email
        let picture = req.body.picture

        UserModel.updateOne({'email' : emailID}, {$set : {'firstname' : firstname, 'lastname' : lastname, 'username' : username, 'address' : address, 'phone' : phone, 'email' : email, 'picture' : picture}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Podaci ažurirani'})
        })
    }

    updateAdmin = (req: express.Request, res: express.Response)=>{

        let email = req.body.email
        let deadline = req.body.deadline

        UserModel.updateOne({'email' : email}, {$set : {'deadline': deadline}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    updatePrivileges = (req: express.Request, res: express.Response)=>{

        let email = req.body.email
        let type = req.body.type

        if(type == 0){
            type = 1
        } else{
            type = 0
        }

        UserModel.updateOne({'email' : email}, {$set : {'type' : type}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Podaci ažurirani'})
        })
    }

    getAllUsers = (req: express.Request, res: express.Response)=>{
        UserModel.find({}, (err, users)=>{
            if(err) console.log(err)
            else res.json(users)
        })
    }

    remove = (req: express.Request, res: express.Response)=>{
        let email = req.body.email

        UserModel.deleteOne({'email' : email}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    setBlocked = (req: express.Request, res: express.Response)=>{

        let email = req.body.email
        let blocked = req.body.blocked

        UserModel.updateOne({'email' : email}, {$set : {'blocked': blocked}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    setExtended = (req: express.Request, res: express.Response)=>{

        let username = req.body.user
        let extended = req.body.extended

        UserModel.updateOne({'username' : username}, {$set : {'extended': extended}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    setBookAdded = (req: express.Request, res: express.Response)=>{

        let username = req.body.user
        let bookAdded = req.body.bookAdded

        UserModel.updateOne({'username' : username}, {$set : {'bookAdded': bookAdded}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    updateNotifications = (req: express.Request, res: express.Response)=>{

        let username = req.body.user
        let notifications = req.body.notifications

        UserModel.updateOne({'username' : username}, {$set : {'notifications': notifications}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    updateBooksAdded = (req: express.Request, res: express.Response)=>{

        let username = req.body.user
        let booksAdded = req.body.booksAdded

        UserModel.updateOne({'username' : username}, {$set : {'booksAdded': booksAdded}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
}