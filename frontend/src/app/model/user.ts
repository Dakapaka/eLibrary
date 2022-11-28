export class User{
    username: string
    password: string
    firstname: string
    lastname: string
    address: string
    phone: string
    email: string
    type: number
    picture: string
    deadline: number
    blocked: boolean
    bookAdded: boolean
    notifications: Array<string>
    booksAdded: Array<string>
}