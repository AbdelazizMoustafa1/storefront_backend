import express, {Request, Response} from 'express'
import {Book, book} from '../models/book'

const store = new book()

const index = async (_req: Request, res: Response) => {
    const books = await store.index()
    res.json(books)
}

const showRow = async (req: Request, res: Response) => {
    const bookToShow = await store.showRow(req.body.id)
    res.json(bookToShow)
}

const create = async (req: Request, res: Response) => {
    try {
        // const book: Book = {
        //     title: req.body.title, author: req.body.author,
        // }
        const {id, title, author, pages, summary} = req.body
        const book:Book = {id, title, author, pages, summary}

        const newBook = await store.create(book)
        res.json(newBook)
    } catch (err) {
        res.status(400).json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.deleteRow(req.body.id)
    res.json(deleted)
}

const books_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', showRow)
    app.post('/products', create)
    app.delete('/products', destroy)
}

export default books_routes